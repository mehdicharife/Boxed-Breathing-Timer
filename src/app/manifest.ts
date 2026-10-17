import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
	return {
		id: "/",
		name: "Boxed Breathing Timer",
		short_name: "Breathe",
		description: "A quiet breathing break, with guided pacing and calming sounds.",
		lang: "en",
		start_url: "/home",
		scope: "/",
		display: "standalone",
		background_color: "#ffffff",
		theme_color: "#022932",
		categories: ["health", "lifestyle"],
		icons: [
			{ src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
			{ src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
			{ src: "/icons/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
		],
	};
}
