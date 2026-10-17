/* global self, CONFIG */
/* PWA_BUILD_CONFIG */

const PREFIX = "boxed-breathing-";
const APP_CACHE = `${PREFIX}app-${CONFIG.version}`;
const AUDIO_CACHE = `${PREFIX}audio-${CONFIG.audioVersion}`;
const APP_URLS = [...CONFIG.pages, ...CONFIG.assets];
const APP_PATHS = new Set(APP_URLS);
let soundsDownload;
const soundListeners = new Set();

self.addEventListener("install", (event) => {
	event.waitUntil((async () => {
		if (!CONFIG.development) {
			const cache = await caches.open(APP_CACHE);
			// All required resources must succeed before this version can become active.
			await cache.addAll(APP_URLS.map((url) => new Request(url, { cache: "reload" })));
		}
		if (CONFIG.development || !self.registration.active) await self.skipWaiting();
	})());
});

self.addEventListener("activate", (event) => {
	event.waitUntil((async () => {
		const names = await caches.keys();
		if (CONFIG.development) {
			await self.clients.claim();
			return;
		}
		const previousApps = names.filter((name) => name.startsWith(`${PREFIX}app-`) && name !== APP_CACHE);
		let previousApp;
		for (const name of previousApps.reverse()) {
			// A failed install may leave an empty cache; retain a complete previous build.
			if (await (await caches.open(name)).match("/home")) {
				previousApp = name;
				break;
			}
		}
		await Promise.all(names
			.filter((name) => name.startsWith(PREFIX) && name !== APP_CACHE && name !== previousApp && name !== AUDIO_CACHE)
			.map((name) => caches.delete(name)));
		await self.clients.claim();
	})());
});

async function audioResponse(request, pathname) {
	const cache = await caches.open(AUDIO_CACHE);
	const cached = await cache.match(pathname);
	if (!cached) return fetch(request);
	const range = request.headers.get("range");
	if (!range) return cached;

	// Safari and other media players request portions of an audio file, even offline.
	const bytes = await cached.arrayBuffer();
	const size = bytes.byteLength;
	const match = /^bytes=(\d*)-(\d*)$/.exec(range);
	let start = 0;
	let end = size - 1;
	if (match && (match[1] || match[2])) {
		if (!match[1]) start = Math.max(0, size - Number(match[2]));
		else {
			start = Number(match[1]);
			if (match[2]) end = Math.min(end, Number(match[2]));
		}
	} else start = size;
	if (start > end || start >= size || !Number.isSafeInteger(start) || !Number.isSafeInteger(end)) {
		return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${size}` } });
	}
	const headers = new Headers(cached.headers);
	headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
	headers.set("Content-Length", String(end - start + 1));
	headers.set("Accept-Ranges", "bytes");
	return new Response(bytes.slice(start, end + 1), { status: 206, headers });
}

async function pageResponse(request, pathname) {
	const cache = await caches.open(APP_CACHE);
	const cached = await cache.match(pathname);
	// App Router requests contain route-specific RSC headers. Never cache them as HTML.
	if (request.headers.get("RSC") === "1") {
		try {
			return await fetch(request);
		} catch {
			// Next.js treats HTML as a full-page navigation, which the offline cache serves.
			if (cached) return cached;
			throw new Error("Page unavailable offline");
		}
	}
	// Keep HTML and its hashed assets on the same build until the user accepts an update.
	return cached || fetch(request);
}

self.addEventListener("fetch", (event) => {
	const { request } = event;
	const url = new URL(request.url);
	if (request.method !== "GET" || url.origin !== self.location.origin) return;
	const pathname = url.pathname === "/" ? "/home" : url.pathname;
	if (CONFIG.sounds.includes(pathname)) {
		event.respondWith(audioResponse(request, pathname));
	} else if (!CONFIG.development && CONFIG.pages.includes(pathname)) {
		event.respondWith(pageResponse(request, pathname));
	} else if (!CONFIG.development && (APP_PATHS.has(pathname) || pathname.startsWith("/_next/static/"))) {
		event.respondWith((async () => {
			const cache = await caches.open(APP_CACHE);
			const cached = await cache.match(pathname);
			if (cached) return cached;
			// Another open window may still be using the previous build's lazy chunks.
			if (pathname.startsWith("/_next/static/")) {
				for (const name of await caches.keys()) {
					if (name.startsWith(`${PREFIX}app-`) && name !== APP_CACHE) {
						const previous = await (await caches.open(name)).match(pathname);
						if (previous) return previous;
					}
				}
			}
			return fetch(request);
		})());
	}
});

async function getStatus() {
	const [app, audio] = await Promise.all([caches.open(APP_CACHE), caches.open(AUDIO_CACHE)]);
	const pages = await Promise.all(APP_URLS.map((url) => app.match(url)));
	const sounds = await Promise.all(CONFIG.sounds.map((url) => audio.match(url)));
	return { type: "STATUS", offlineReady: !CONFIG.development && pages.every(Boolean), soundsReady: sounds.every(Boolean), preview: Boolean(CONFIG.development) };
}

function broadcastSounds(message) {
	for (const port of soundListeners) port.postMessage(message);
}

async function downloadSounds() {
	const cache = await caches.open(AUDIO_CACHE);
	for (const [index, url] of CONFIG.sounds.entries()) {
		if (!(await cache.match(url))) {
			const response = await fetch(new Request(url, { cache: "reload" }));
			if (response.status !== 200) throw new Error("Sound download failed");
			await cache.put(url, response);
		}
		broadcastSounds({ type: "SOUNDS_PROGRESS", completed: index + 1, total: CONFIG.sounds.length });
	}
	broadcastSounds({ type: "SOUNDS_READY" });
}

self.addEventListener("message", (event) => {
	const port = event.ports?.[0];
	if (event.data?.type === "SKIP_WAITING") {
		event.waitUntil(self.skipWaiting());
	} else if (event.data?.type === "GET_STATUS" && port) {
		event.waitUntil(getStatus().then((status) => port.postMessage(status))
			.catch(() => port.postMessage({ type: "STATUS", offlineReady: false, soundsReady: false })));
	} else if (event.data?.type === "DOWNLOAD_SOUNDS" && port) {
		soundListeners.add(port);
		if (!soundsDownload) {
			soundsDownload = downloadSounds()
				.catch(() => broadcastSounds({ type: "SOUNDS_ERROR" }))
				.finally(() => {
					soundListeners.clear();
					soundsDownload = undefined;
				});
		}
		event.waitUntil(soundsDownload);
	}
});
