export type InstallBrowser = "chrome" | "edge" | "safari" | "firefox" | "other";
export type InstallEnvironment = {
	browser: InstallBrowser;
	platform: "ios" | "android" | "mac" | "windows" | "desktop";
};
export type InstallGuide = { title: string; steps: string[]; note?: string };

export const browserNames: Record<InstallBrowser, string> = {
	chrome: "Google Chrome", edge: "Microsoft Edge", safari: "Safari", firefox: "Firefox", other: "Another browser",
};

export function detectInstallEnvironment({ userAgent, maxTouchPoints = 0, brands = [] }: {
	userAgent: string;
	maxTouchPoints?: number;
	brands?: ReadonlyArray<{ brand: string }>;
}): InstallEnvironment {
	const platform = /iPhone|iPad|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && maxTouchPoints > 1)
		? "ios" : /Android/i.test(userAgent) ? "android" : /Macintosh|Mac OS X/i.test(userAgent) ? "mac" : /Windows/i.test(userAgent) ? "windows" : "desktop";
	let browser: InstallBrowser = "other";
	// Edge also identifies as Chrome. Check its explicit token and client hints first.
	if (/Edg(?:A|iOS)?\/|Edge\//i.test(userAgent) || brands.some(({ brand }) => /Microsoft Edge/i.test(brand))) browser = "edge";
	else if (/Firefox\/|FxiOS\//i.test(userAgent)) browser = "firefox";
	else if (/SamsungBrowser|OPR\/|OPiOS|Opera|Vivaldi|YaBrowser/i.test(userAgent) || brands.some(({ brand }) => /Brave|Opera|Vivaldi/i.test(brand))) browser = "other";
	else if (/Chrome\/|CriOS\//i.test(userAgent) || brands.some(({ brand }) => /Google Chrome/i.test(brand))) browser = "chrome";
	else if (/Safari\//i.test(userAgent)) browser = "safari";
	return { browser, platform };
}

// Menu paths checked against the browser vendors' installation support guides.
export function getInstallGuide({ browser, platform }: InstallEnvironment): InstallGuide {
	if (platform === "ios") return {
		title: browser === "safari" ? "Add to your Home Screen" : "Install using Safari",
		steps: [
			...(browser === "safari" ? [] : ["Open this timer’s web address in Safari."]),
			"Tap Share — the square with an upward arrow. It may be inside the … menu.",
			"Scroll through the sharing options and tap Add to Home Screen.",
			"If Open as Web App is shown, turn it on. Tap Add to finish.",
		],
	};
	if (platform === "android") {
		if (browser === "chrome") return {
			title: "Install with Google Chrome",
			steps: ["Tap ⋮ beside Chrome’s address bar.", "Tap Install and create shortcut, then Install.", "Confirm the installation when Chrome asks."],
			note: "On older versions, the menu option may be called Add to Home screen or Install app.",
		};
		return {
			title: `Install on Android${browser !== "other" ? ` with ${browserNames[browser]}` : ""}`,
			steps: ["Open your browser’s … or ⋮ menu.", "Choose Install app or Add to home screen, if available.", "Confirm the installation or home screen shortcut."],
			note: "If neither option appears, open this timer in Chrome and use its installation menu.",
		};
	}
	if (browser === "edge") return {
		title: "Install with Microsoft Edge",
		steps: ["Click … in Edge’s upper-right corner.", "Open More tools, then Apps.", "Select Install this site as an app.", "Click Install in the window that opens."],
		note: "If Apps appears directly in your menu, open it there.",
	};
	if (browser === "chrome") return {
		title: "Install with Google Chrome",
		steps: ["Click ⋮ in Chrome’s upper-right corner.", "Open Cast, save, and share.", "Select Install page as app….", "Click Install in the window that opens."],
	};
	if (browser === "safari" && platform === "mac") return {
		title: "Add to your Mac’s Dock",
		steps: ["Click File in the menu bar at the top of your screen.", "Choose Add to Dock….", "Click Add. The timer will appear in your Dock."],
		note: "Requires macOS Sonoma 14 or later.",
	};
	if (browser === "firefox" && platform === "windows") return {
		title: "Install with Firefox on Windows",
		steps: ["Find the web apps button at the right end of Firefox’s address bar.", "Click it to open the timer as a web app.", "If Firefox offers to pin it to your taskbar, choose Yes."],
		note: "Requires a recent Firefox for Windows. If the button is missing, update Firefox or open this timer in Chrome.",
	};
	return {
		title: "Keep this timer handy",
		steps: ["Open this timer’s web address in Google Chrome.", "Choose Google Chrome below to see its installation steps."],
		note: "You can also bookmark this page in your current browser.",
	};
}
