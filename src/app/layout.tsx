import type { Metadata } from "next";
import Link from "next/link";
import { Poppins } from "next/font/google";
import DarkModeSwitchButton from "./components/DarkModeSwitchButton";
import JsonLd from "./components/JsonLd";
import NavigationActiveIndicator from "./components/NavigationActiveIndicator";
import { RxHamburgerMenu } from "react-icons/rx";
import { Analytics } from "@vercel/analytics/next";
import { websiteStructuredData } from "./structured-data";

import "./globals.css"

const poppins = Poppins({
	weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
	metadataBase: new URL(process.env.URL_SELF as string),
	alternates: {
		canonical: "./",
	},
	title: "Boxed Breathing Timer",
	description: "An aid to the boxed breathing exercise",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<JsonLd data={websiteStructuredData} />
				<script
					dangerouslySetInnerHTML={{
						__html: `
						const theme = localStorage.getItem('theme');
						if(theme === 'dark') {
							document.documentElement.classList.add('dark');
						}
            			`,
					}}
				/>
			</head>
			<body
				className={`${poppins.className} antialiased bg-surface text-onSurface relative`}
			>
				<header className="flex items-center relative h-18">
					<DarkModeSwitchButton />
					<NavigationActiveIndicator />

					<nav className="flex flex-col top-15 min-[940px]:top-auto right-12 min-[530px]:right-65 invisible has-[:checked]:flex has-[:checked]:visible min-[940px]:visible max-[940px]:has-[:checked]:[&_a]:px-4 max-[940px]:[&>ul]:py-3 min-[940px]:bg-transparent min-[940px]:p-0 min-[940px]:flex-row gap-x-6 min-[1020px]:gap-x-12 grow absolute min-[940px]:left-1/2 min-[940px]:-translate-x-1/2 [&_a]:text-title text-[13.5px] [&_a]:font-medium dark:[&_a]:font-medium [&_a]:uppercase [&_a]:tracking-wider min-[940px]:right-auto max-[940px]:has-[:checked]:[&>ul]:bg-[#acdbe4] dark:max-[940px]:has-[:checked]:[&>ul]:bg-[#3e5357] max-[940px]:has-[:checked]:[&>ul]:hover:bg-[#cee8ea] dark:max-[940px]:has-[:checked]:[&>ul]:hover:bg-[#003c45] has-[:checked]:[&_a]:w-full has-[:checked]:[&_a]:block [&_li]:w-full z-50">
						<input
							id="toggle"
							type="checkbox"
							className="hidden"
						/>
						<ul className="flex gap-x-8">
							<li>
								<Link
									href="/home"
									data-primary-nav-link
									className="relative group"
								>
									Home
									<span className="absolute block left-0 -bottom-0.5 w-0 h-0.5 bg-outline group-hover:w-full transition-[width] delay-50 duration-150 ease-in-out"></span>
								</Link>
							</li>
						</ul>
						<ul className="flex gap-x-5">
							<li>
								<Link
									href="/the-science"
									data-primary-nav-link
									className="group relative"
								>
									The science
									<span className="absolute block left-0 -bottom-0.5 w-0 h-0.5 bg-outline group-hover:w-full transition-[width] delay-50 duration-150 ease-in-out"></span>
								</Link>
							</li>
						</ul>
						<ul className="flex gap-x-5">
							<li>
								<Link
									href="/alternatives"
									data-primary-nav-link
									className="group relative"
								>
									Alternatives
									<span className="absolute block left-0 -bottom-0.5 w-0 h-0.5 bg-outline group-hover:w-full transition-[width] delay-50 duration-150 ease-in-out"></span>
								</Link>
							</li>
						</ul>
						<ul className="flex gap-x-5">
							<li>
								<a
									href="https://paypal.me/mehdicharife"
									target="_blank"
									rel="noopener noreferrer"
									className="group relative"
								>
									Support us
									<span className="absolute block left-0 -bottom-0.5 w-0 h-0.5 bg-outline group-hover:w-full transition-[width] delay-50 duration-300 ease-in-out"></span>
								</a>
							</li>
						</ul>

						<label
							htmlFor="toggle"
							className="visible absolute -right-0 -top-8 hover:cursor-pointer min-[940px]:hidden"
						>
							<RxHamburgerMenu />
						</label>
					</nav>
					<p className="hidden min-[530px]:block font-medium absolute right-10 text-title">
						Boxed Breathing Timer
					</p>
				</header>

				<main>{children}</main>

				<footer className="bg-footer text-onFooter min-h-32 w-full -bottom-32 absolute flex justify-between px-10 py-5 items-center gap-x-12">
					<div>
						<Link
							href="/home"
							className="font-medium block mb-1"
						>
							Boxed Breathing Timer
						</Link>
						<p className="text-xs">Copyright @ 2026</p>
					</div>
					<nav className="flex flex-wrap justify-between gap-y-4 gap-x-8 text-[13px]">
						<ul className="flex gap-x-8">
							<li>
								<Link href="/home">Home</Link>
							</li>
						</ul>
						<ul className="flex gap-x-5">
							<li>
								<Link href="/the-science">The science</Link>
							</li>
						</ul>
						<ul className="flex gap-x-5">
							<li>
								<Link href="/alternatives">Alternatives</Link>
							</li>
						</ul>
						<ul className="flex gap-x-5">
							<li>
								<a
									href="https://paypal.me/mehdicharife"
									target="_blank"
									rel="noopener noreferrer"
								>
									Support us
								</a>
							</li>
						</ul>
					</nav>
				</footer>

				<Analytics />
			</body>
		</html>
	);
}
