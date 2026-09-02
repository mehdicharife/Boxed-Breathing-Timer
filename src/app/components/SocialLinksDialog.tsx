"use client";

import { useEffect, useRef, useState } from "react";
import {
	FaFacebookF,
	FaGithub,
	FaInstagram,
	FaLinkedinIn,
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";

const socialLinks = [
	{
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/mehdi-charife/",
		icon: FaLinkedinIn,
	},
	{
		label: "GitHub",
		href: "https://github.com/mehdicharife",
		icon: FaGithub,
	},
	{
		label: "Instagram",
		href: "https://www.instagram.com/mehdi___________i/",
		icon: FaInstagram,
	},
	{
		label: "Facebook",
		href: "https://www.facebook.com/share/14ngqN7VLWj/",
		icon: FaFacebookF,
	},
];

export default function SocialLinksDialog() {
	const [isOpen, setIsOpen] = useState(false);
	const triggerRef = useRef<HTMLButtonElement>(null);
	const dialogRef = useRef<HTMLElement>(null);

	useEffect(() => {
		const closeOnEscape = (event: KeyboardEvent) => {
			if (event.key === "Escape") setIsOpen(false);
		};

		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, []);

	useEffect(() => {
		if (!isOpen || !dialogRef.current) return;

		const dialog = dialogRef.current;
		const trigger = triggerRef.current;
		const focusableElements = Array.from(
			dialog.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled])',
			),
		);
		const firstFocusableElement = focusableElements[0];
		const lastFocusableElement =
			focusableElements[focusableElements.length - 1];

		firstFocusableElement?.focus();

		const trapFocus = (event: KeyboardEvent) => {
			if (event.key !== "Tab" || !firstFocusableElement || !lastFocusableElement) {
				return;
			}

			if (event.shiftKey && document.activeElement === firstFocusableElement) {
				event.preventDefault();
				lastFocusableElement.focus();
			} else if (!event.shiftKey && document.activeElement === lastFocusableElement) {
				event.preventDefault();
				firstFocusableElement.focus();
			}
		};

		document.addEventListener("keydown", trapFocus);
		return () => {
			document.removeEventListener("keydown", trapFocus);
			trigger?.focus();
		};
	}, [isOpen]);

	return (
		<>
			<button
				ref={triggerRef}
				type="button"
				onClick={() => setIsOpen(true)}
				className="cursor-pointer"
				aria-haspopup="dialog"
				aria-expanded={isOpen}
			>
				Connect
			</button>

			{isOpen && (
				<div
					className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 px-5"
					onMouseDown={() => setIsOpen(false)}
				>
					<section
						ref={dialogRef}
						role="dialog"
						aria-modal="true"
						aria-labelledby="connect-dialog-title"
						className="w-full max-w-sm rounded-sm bg-surface p-6 text-onSurface shadow-xl"
						onMouseDown={(event) => event.stopPropagation()}
					>
						<div className="flex items-start justify-between gap-x-6">
							<div>
								<h2
									id="connect-dialog-title"
									className="text-lg font-medium text-title"
								>
									Connect
								</h2>
								<p className="mt-1 text-sm text-paragraph">
									Feel free to say hello — you can find me here.
								</p>
							</div>
							<button
									type="button"
									onClick={() => setIsOpen(false)}
									className="flex size-8 items-center justify-center rounded-full text-paragraph transition-colors hover:bg-secondary/10 hover:text-title"
									aria-label="Close connect dialog"
									title="Close"
								>
									<RxCross2 aria-hidden="true" />
								</button>
						</div>

						<nav
							className="mt-6 grid grid-cols-2 gap-3"
							aria-label="Social media profiles"
						>
							{socialLinks.map(({ label, href, icon: Icon }) => (
								<a
									key={label}
									href={href}
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-x-3 rounded-sm border border-outline/30 px-3 py-3 text-sm font-medium text-title transition hover:border-secondary/60 hover:bg-secondary/5"
								>
									<Icon aria-hidden="true" />
									{label}
								</a>
							))}
						</nav>
					</section>
				</div>
			)}
		</>
	);
}
