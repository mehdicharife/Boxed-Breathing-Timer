"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NavigationActiveIndicator() {
	const pathname = usePathname();

	useEffect(() => {
		document.querySelectorAll<HTMLElement>("[data-primary-nav-link]").forEach((link) => {
			const underline = link.querySelector<HTMLElement>("span");
			if (underline) {
				underline.style.width = link.getAttribute("href") === pathname ? "100%" : "";
			}
		});
	}, [pathname]);

	return null;
}
