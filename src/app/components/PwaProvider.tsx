"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { FiDownload, FiRefreshCw, FiX } from "react-icons/fi";
import { browserNames, detectInstallEnvironment, getInstallGuide, type InstallBrowser, type InstallEnvironment } from "@/utils/install-guide";

interface InstallPromptEvent extends Event {
	prompt(): Promise<void>;
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

type WorkerReply = {
	type: string;
	offlineReady?: boolean;
	soundsReady?: boolean;
	preview?: boolean;
	completed?: number;
	total?: number;
};

function messageWorker(
	worker: ServiceWorker,
	type: string,
	onProgress?: (reply: WorkerReply) => void,
): Promise<WorkerReply> {
	return new Promise((resolve, reject) => {
		const channel = new MessageChannel();
		let timeout: ReturnType<typeof setTimeout>;
		const finish = (reply?: WorkerReply) => {
			clearTimeout(timeout);
			channel.port1.close();
			if (reply && reply.type !== "SOUNDS_ERROR") resolve(reply);
			else reject(new Error("Offline storage could not be updated"));
		};
		const resetTimeout = () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => finish(), type === "DOWNLOAD_SOUNDS" ? 120_000 : 10_000);
		};
		channel.port1.onmessage = (event: MessageEvent<WorkerReply>) => {
			if (event.data.type === "SOUNDS_PROGRESS") {
				onProgress?.(event.data);
				resetTimeout();
			} else finish(event.data);
		};
		resetTimeout();
		try {
			worker.postMessage({ type }, [channel.port2]);
		} catch {
			finish();
		}
	});
}

const PwaContext = createContext<{
	openSettings: () => void;
	isInstalled: boolean;
} | null>(null);

export function usePwa() {
	const context = useContext(PwaContext);
	if (!context) throw new Error("PWA controls need PwaProvider");
	return context;
}

export function InstallTimerButton() {
	const { openSettings, isInstalled } = usePwa();
	return (
		<button
			type="button"
			onClick={openSettings}
			aria-haspopup="dialog"
			className="inline-flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md px-2 text-xs text-paragraph underline decoration-outline/30 underline-offset-4 hover:text-title focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arrow"
		>
			<FiDownload size={13} aria-hidden="true" />
			{isInstalled ? "Offline settings" : "Install timer"}
		</button>
	);
}

export default function PwaProvider({ children }: { children: React.ReactNode }) {
	const [installPrompt, setInstallPrompt] = useState<InstallPromptEvent | null>(null);
	const [isInstalled, setIsInstalled] = useState(false);
	const [installing, setInstalling] = useState(false);
	const [installError, setInstallError] = useState(false);
	const [installEnvironment, setInstallEnvironment] = useState<InstallEnvironment>({ browser: "other", platform: "desktop" });
	const [offlineState, setOfflineState] = useState<"preparing" | "ready" | "preview" | "unavailable">("preparing");
	const [workerReady, setWorkerReady] = useState(false);
	const [setupAttempt, setSetupAttempt] = useState(0);
	const [soundsReady, setSoundsReady] = useState(false);
	const [downloadState, setDownloadState] = useState<"idle" | "downloading" | "error">("idle");
	const [progress, setProgress] = useState(0);
	const [online, setOnline] = useState(true);
	const [updateWorker, setUpdateWorker] = useState<ServiceWorker | null>(null);
	const [refreshAvailable, setRefreshAvailable] = useState(false);
	const [updateDismissed, setUpdateDismissed] = useState(false);
	const [updating, setUpdating] = useState(false);
	const [updateError, setUpdateError] = useState(false);
	const registrationRef = useRef<ServiceWorkerRegistration | null>(null);
	const reloadRequested = useRef(false);
	const dialogRef = useRef<HTMLDialogElement>(null);
	const triggerRef = useRef<HTMLElement | null>(null);

	const refreshStatus = useCallback(async () => {
		const worker = navigator.serviceWorker?.controller || registrationRef.current?.active;
		if (!worker) return;
		try {
			const status = await messageWorker(worker, "GET_STATUS");
			setWorkerReady(true);
			setOfflineState(status.preview ? "preview" : status.offlineReady ? "ready" : "unavailable");
			setSoundsReady(Boolean(status.soundsReady));
		} catch {
			setOfflineState("unavailable");
		}
	}, []);

	useEffect(() => {
		const displayMode = window.matchMedia("(display-mode: standalone)");
		const syncInstalled = () => setIsInstalled(displayMode.matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
		const capturePrompt = (event: Event) => {
			event.preventDefault();
			setInstallPrompt(event as InstallPromptEvent);
		};
		const markInstalled = () => {
			setIsInstalled(true);
			setInstallPrompt(null);
		};
		syncInstalled();
		displayMode.addEventListener("change", syncInstalled);
		window.addEventListener("beforeinstallprompt", capturePrompt);
		window.addEventListener("appinstalled", markInstalled);

		setInstallEnvironment(detectInstallEnvironment({
			userAgent: navigator.userAgent,
			maxTouchPoints: navigator.maxTouchPoints,
			brands: (navigator as Navigator & { userAgentData?: { brands?: Array<{ brand: string }> } }).userAgentData?.brands,
		}));
		return () => {
			displayMode.removeEventListener("change", syncInstalled);
			window.removeEventListener("beforeinstallprompt", capturePrompt);
			window.removeEventListener("appinstalled", markInstalled);
		};
	}, []);

	useEffect(() => {
		let disposed = false;
		setWorkerReady(false);
		setOfflineState("preparing");
		if (process.env.NODE_ENV !== "production") {
			setUpdateWorker(null);
			setRefreshAvailable(false);
		}
		const cleanups: Array<() => void> = [];
		let lastUpdateCheck = 0;
		const checkUpdate = () => {
			if (navigator.onLine && Date.now() - lastUpdateCheck > 60_000) {
				lastUpdateCheck = Date.now();
				void registrationRef.current?.update().catch(() => {});
			}
		};
		const connectivityChanged = () => {
			setOnline(navigator.onLine);
			if (navigator.onLine) checkUpdate();
			void refreshStatus();
		};
		const visibilityChanged = () => {
			if (document.visibilityState === "visible") {
				checkUpdate();
				void refreshStatus();
			}
		};
		setOnline(navigator.onLine);
		window.addEventListener("online", connectivityChanged);
		window.addEventListener("offline", connectivityChanged);
		document.addEventListener("visibilitychange", visibilityChanged);
		const setupTimeout = setTimeout(() => setOfflineState((state) => state === "preparing" ? "unavailable" : state), 45_000);

		if ("serviceWorker" in navigator && window.isSecureContext) {
			let hadController = Boolean(navigator.serviceWorker.controller);
			const controllerChanged = () => {
				if (reloadRequested.current) window.location.reload();
				else {
					if (hadController && process.env.NODE_ENV === "production") {
						setRefreshAvailable(true);
						setUpdateWorker(null);
						setUpdateDismissed(false);
					}
					void refreshStatus();
				}
				hadController = true;
			};
			navigator.serviceWorker.addEventListener("controllerchange", controllerChanged);
			cleanups.push(() => navigator.serviceWorker.removeEventListener("controllerchange", controllerChanged));
			void (async () => {
				try {
					const workerUrl = process.env.NODE_ENV === "production" ? "/sw.js" : "/sw-dev.js";
					const registration = await navigator.serviceWorker.register(workerUrl, { scope: "/", updateViaCache: "none" });
					if (disposed) return;
					registrationRef.current = registration;
					const waiting = () => {
						if (process.env.NODE_ENV === "production" && registration.waiting && !disposed) {
							setUpdateWorker(registration.waiting);
							setUpdateDismissed(false);
						}
					};
					const watchInstalling = () => {
						const worker = registration.installing;
						if (!worker) return;
						const changed = () => {
							if (disposed) return;
							if (worker.state === "installed") waiting();
							if (worker.state === "redundant" && !registration.active) setOfflineState("unavailable");
						};
						worker.addEventListener("statechange", changed);
						cleanups.push(() => worker.removeEventListener("statechange", changed));
					};
					waiting();
					watchInstalling();
					registration.addEventListener("updatefound", watchInstalling);
					cleanups.push(() => registration.removeEventListener("updatefound", watchInstalling));
					checkUpdate();
					await navigator.serviceWorker.ready;
					if (!disposed) {
						clearTimeout(setupTimeout);
						await refreshStatus();
					}
				} catch {
					if (!disposed) setOfflineState("unavailable");
				}
			})();
		} else setOfflineState("unavailable");

		return () => {
			disposed = true;
			clearTimeout(setupTimeout);
			cleanups.forEach((cleanup) => cleanup());
			window.removeEventListener("online", connectivityChanged);
			window.removeEventListener("offline", connectivityChanged);
			document.removeEventListener("visibilitychange", visibilityChanged);
		};
	}, [refreshStatus, setupAttempt]);

	function openSettings() {
		triggerRef.current = document.activeElement as HTMLElement | null;
		dialogRef.current?.showModal();
		void refreshStatus();
	}

	async function install() {
		if (!installPrompt || installing) return;
		setInstalling(true);
		setInstallError(false);
		try {
			await installPrompt.prompt();
			await installPrompt.userChoice;
		} catch {
			setInstallError(true);
		} finally {
			setInstallPrompt(null);
			setInstalling(false);
		}
	}

	async function downloadSounds() {
		const worker = navigator.serviceWorker?.controller || registrationRef.current?.active;
		if (downloadState === "downloading") return;
		if (!worker) {
			setDownloadState("error");
			return;
		}
		setDownloadState("downloading");
		setProgress(0);
		try {
			await messageWorker(worker, "DOWNLOAD_SOUNDS", (reply) => setProgress(reply.completed || 0));
			setSoundsReady(true);
			setDownloadState("idle");
		} catch {
			setDownloadState("error");
		}
	}

	function applyUpdate() {
		if (!updateWorker || updateWorker.state === "activated") {
			window.location.reload();
			return;
		}
		setUpdating(true);
		setUpdateError(false);
		reloadRequested.current = true;
		updateWorker.postMessage({ type: "SKIP_WAITING" });
		setTimeout(() => {
			reloadRequested.current = false;
			setUpdating(false);
			setUpdateError(true);
		}, 15_000);
	}

	const actionClass = "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-onPrimary hover:bg-primary-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-arrow disabled:cursor-default disabled:opacity-60";
	const guide = getInstallGuide(installEnvironment);
	const guideContent = (
		<div className="space-y-3">
			<h3 className="font-medium text-title">{guide.title}</h3>
			<ol className="list-decimal space-y-2 pl-5 marker:font-medium marker:text-title">
				{guide.steps.map((step) => <li key={step} className="pl-1">{step}</li>)}
			</ol>
			{guide.note && <p className="text-xs leading-5">{guide.note}</p>}
			<details className="text-xs">
				<summary className="cursor-pointer rounded-sm underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-arrow">Using a different browser?</summary>
				<label className="mt-3 block" htmlFor="install-browser">Show instructions for</label>
				<select
					id="install-browser"
					value={installEnvironment.browser}
					onChange={(event) => setInstallEnvironment((current) => ({ ...current, browser: event.target.value as InstallBrowser }))}
					className="mt-1 min-h-11 w-full rounded-lg border border-outline/30 bg-surface px-3 text-sm text-title focus-visible:outline-2 focus-visible:outline-arrow"
				>
					{Object.entries(browserNames).filter(([browser]) => browser !== "safari" || installEnvironment.platform === "ios" || installEnvironment.platform === "mac").map(([browser, name]) => <option key={browser} value={browser}>{name}</option>)}
				</select>
			</details>
		</div>
	);

	return (
		<PwaContext.Provider value={{ openSettings, isInstalled }}>
			{children}
			<dialog
				ref={dialogRef}
				aria-labelledby="install-timer-title"
				onClose={() => triggerRef.current?.focus()}
				onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}
				className="fixed inset-0 m-auto max-h-[85dvh] w-[90vw] max-w-md overflow-y-auto rounded-2xl border border-outline/20 bg-surface p-6 text-paragraph shadow-xl backdrop:bg-[#022932]/50"
			>
				<div className="flex items-start justify-between gap-3">
					<h2 id="install-timer-title" className="text-xl font-medium text-title">Your timer, close at hand</h2>
					<button type="button" onClick={() => dialogRef.current?.close()} aria-label="Close timer settings" className="-mr-2 -mt-2 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg hover:bg-primary/5 focus-visible:outline-2 focus-visible:outline-arrow">
						<FiX size={20} aria-hidden="true" />
					</button>
				</div>
				<section className="mt-4 space-y-3 text-sm leading-6">
					{isInstalled ? <p>The timer is installed. Open it from your home screen, Dock, or app launcher.</p> : <>
						<p>Keep a breathing break on your home screen or desktop.</p>
						{installPrompt ? <>
							<p className="text-xs leading-5">Select Install timer below, then confirm Install in your browser’s window.</p>
							<button type="button" onClick={() => void install()} disabled={installing} className={actionClass}><FiDownload aria-hidden="true" />{installing ? "Opening installer…" : "Install timer"}</button>
							<details>
								<summary className="min-h-10 cursor-pointer rounded-sm py-2 text-xs underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-arrow">Or install from the browser menu</summary>
								{guideContent}
							</details>
						</> : guideContent}
						{installError && <p role="status">Installation couldn’t open. Follow the numbered steps above to install from your browser’s menu.</p>}
					</>}
				</section>
				<section className="mt-6 space-y-3 border-t border-outline/20 pt-5 text-sm leading-6" aria-labelledby="offline-timer-title">
					<h3 id="offline-timer-title" className="font-medium text-title">Use it offline</h3>
					<p role="status">{offlineState === "ready" ? "The timer and guides are saved for offline use." : offlineState === "preview" ? "You can save sounds in this preview. Offline page loading is available on the published site." : offlineState === "preparing" ? "Preparing offline downloads…" : "Offline setup couldn’t finish. Check your connection and try again."}</p>
					{offlineState === "unavailable" && <button type="button" onClick={() => setSetupAttempt((attempt) => attempt + 1)} className={actionClass}>Retry offline setup</button>}
					{soundsReady ? <p role="status">All five sounds are ready offline.</p> : <>
						<p>Add all five calming sounds for offline use. This downloads about 20 MB.</p>
						<button type="button" onClick={() => void downloadSounds()} disabled={!online || !workerReady || downloadState === "downloading"} className={actionClass}>
							<FiDownload aria-hidden="true" />
							{downloadState === "downloading" ? `Downloading sounds (${progress}/5)…` : !workerReady && offlineState === "preparing" ? "Preparing downloads…" : downloadState === "error" ? "Retry sound download" : "Download sounds"}
						</button>
						{downloadState === "downloading" && <progress aria-label="Sounds saved offline" value={progress} max={5} className="block w-full accent-primary" />}
						{downloadState === "error" && <p role="status">The download couldn’t finish. Check your connection and available storage, then retry.</p>}
						{!online && <p role="status">You’re offline. Connect to download sounds.</p>}
					</>}
				</section>
			</dialog>
			{process.env.NODE_ENV === "production" && (updateWorker || refreshAvailable) && !updateDismissed && <aside aria-label="Timer update" className="fixed bottom-4 left-1/2 z-[60] w-[92vw] max-w-md -translate-x-1/2 rounded-xl border border-outline/20 bg-surface p-4 text-sm text-paragraph shadow-lg">
				<p role="status">{updateError ? "The update couldn’t finish. Reopen the timer to try again." : "A new version is ready. Refresh when you’ve finished your session."}</p>
				<div className="mt-3 flex items-center gap-3">
					<button type="button" disabled={updating} onClick={applyUpdate} className={actionClass}><FiRefreshCw aria-hidden="true" />{updating ? "Updating…" : "Update now"}</button>
					<button type="button" disabled={updating} onClick={() => setUpdateDismissed(true)} className="min-h-11 cursor-pointer rounded-md px-3 hover:text-title focus-visible:outline-2 focus-visible:outline-arrow">Later</button>
				</div>
			</aside>}
		</PwaContext.Provider>
	);
}
