"use client";

import { useEffect, useId, useState } from "react";
import { FiArrowUpRight, FiBookmark, FiHeart } from "react-icons/fi";

const SessionFooter = () => {
	const [showInstructions, setShowInstructions] = useState(false);
	const instructionsId = useId();
	const [instruction, setInstruction] = useState(
		"Use your browser’s bookmark menu to save this timer.",
	);
	const [shortcut, setShortcut] = useState<"⌘" | "Ctrl" | null>(null);

	useEffect(() => {
		const userAgent = navigator.userAgent;
		const isIOS =
			/iPhone|iPad|iPod/i.test(userAgent) ||
			(/Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1);
		const isMobile = isIOS || /Android|Mobi/i.test(userAgent);
		const isSafari =
			/Safari/i.test(userAgent) &&
			!/CriOS|FxiOS|EdgiOS|OPiOS/i.test(userAgent);

		if (isIOS && isSafari) {
			setInstruction("In Safari, open the Share menu and choose Add Bookmark.");
		} else if (isMobile) {
			setInstruction(
				"Open your browser’s menu or Share menu and look for Bookmark or Add to bookmarks.",
			);
		} else if (/Macintosh|Mac OS X/i.test(userAgent)) {
			setShortcut("⌘");
		} else if (/Windows|Linux|CrOS/i.test(userAgent)) {
			setShortcut("Ctrl");
		}
	}, []);

	return (
		<footer
			aria-label="Save or support this timer"
			className="border-t border-outline/15 bg-[#f3f8f8] dark:bg-white/3"
		>
			<div className="grid grid-cols-2 items-start gap-1 px-3 py-2">
				<button
					type="button"
					aria-expanded={showInstructions}
					aria-controls={instructionsId}
					onClick={() => setShowInstructions((visible) => !visible)}
					className="flex min-h-11 cursor-pointer items-center justify-center gap-1.5 rounded-md px-1 py-2 text-[11px] leading-5 text-paragraph transition-colors hover:bg-primary/5 hover:text-title focus-visible:outline-2 focus-visible:outline-arrow min-[400px]:text-xs dark:hover:bg-white/5"
				>
					<FiBookmark size={14} aria-hidden="true" className="shrink-0" />
					<span>Save this timer</span>
				</button>
				<a
					href="https://paypal.me/mehdicharife"
					target="_blank"
					rel="noopener noreferrer"
					className="flex min-h-11 items-center justify-center gap-1 rounded-md px-1 py-2 text-[11px] leading-5 text-paragraph transition-colors hover:bg-primary/5 hover:text-title focus-visible:outline-2 focus-visible:outline-arrow min-[400px]:text-xs dark:hover:bg-white/5"
				>
					<FiHeart size={14} aria-hidden="true" className="shrink-0" />
					<span>Support this timer</span>
					<FiArrowUpRight size={11} aria-hidden="true" className="shrink-0" />
					<span className="sr-only">(PayPal, opens in a new tab)</span>
				</a>
			</div>
			<div
				id={instructionsId}
				hidden={!showInstructions}
				className="border-t border-outline/10 px-6 pb-5 pt-4"
			>
				<p className="text-sm leading-5 text-title">
					Bookmark this timer for your next breathing break.
				</p>
				<p className="mt-2 text-xs leading-5 text-paragraph">
					{shortcut ? (
						<>
							Press{" "}
							<kbd
								aria-label={`${shortcut === "⌘" ? "Command" : "Control"} plus D`}
								className="mx-0.5 inline-flex items-center gap-1.5 rounded-md border border-[#005b70]/20 border-b-2 bg-white px-2 py-0.5 font-sans text-[11px] font-medium leading-4 text-[#005b70] dark:border-[#7ea8b2]/30 dark:bg-[#002628]/60 dark:text-[#c0e1e9]"
							>
								<span>{shortcut}</span>
								<span aria-hidden="true">+</span>
								<span>D</span>
							</kbd>{" "}
							to bookmark.
						</>
					) : (
						instruction
					)}
				</p>
			</div>
		</footer>
	);
};

export default SessionFooter;
