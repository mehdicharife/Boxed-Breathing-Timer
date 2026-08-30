import React from "react";
import Link from "next/link";
import BoxedBreathinSimulator from "../components/BoxedBreathinSimulator";
import JsonLd from "../components/JsonLd";
import { createPageMetadata } from "../social-metadata";
import { webApplicationStructuredData } from "../structured-data";

export const metadata = createPageMetadata({
	title: "Box Breathing Timer (4-4-4-4) | Boxed Breathing Timer",
	description:
		"Follow a guided box-breathing timer with visual pacing and optional calming sounds to pause, focus, and reset.",
	pathname: "/home",
});

const page = () => {
	return (
		<main className="mx-auto mt-7 w-[88vw] max-w-2xl">
			<JsonLd data={webApplicationStructuredData} />
			<header className="mx-auto max-w-[380px] text-center">
				<h1 className="text-2xl font-medium text-title">
					Box Breathing Timer
				</h1>
				<p className="mt-2 text-sm leading-6 text-paragraph">
					Follow a guided 4-4-4-4 box-breathing pattern.
				</p>
			</header>

			<div className="mt-7 flex justify-center">
				<BoxedBreathinSimulator />
			</div>

			<div className="mx-auto mt-16 max-w-xl space-y-8 border-t border-outline/30 pt-9 text-paragraph">
				<section aria-labelledby="how-to-use">
					<h2
						id="how-to-use"
						className="text-lg font-medium text-title"
					>
						How to use this timer
					</h2>
					<p className="mt-2 leading-6 text-[.9rem]">
						Press Start and follow each on-screen cue. The
						timer guides four counts for every phase, and you
						can choose an optional sound before you begin.
					</p>
					<ol className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
						{[
							"Breathe in",
							"Hold",
							"Breathe out",
							"Hold",
						].map((step, index) => (
								<li
									key={step + index}
									className="rounded-sm border border-outline/30 px-3 py-3 text-center text-sm transition duration-200 hover:-translate-y-1 hover:border-secondary/60 hover:bg-secondary/5 hover:shadow-md motion-reduce:transition-none dark:hover:border-[#7ea8b2] dark:hover:bg-[#044f60]/40"
								>
									<span className="block text-xs font-medium uppercase tracking-wide text-secondary dark:text-[#bffaff]">
									{index + 1}
								</span>
								<span className="mt-1 block font-medium">
									{step}
								</span>
							</li>
						))}
					</ol>
				</section>

				<section aria-labelledby="what-is-box-breathing">
					<h2
						id="what-is-box-breathing"
						className="text-lg font-medium text-title"
					>
						What is box breathing?
					</h2>
					<p className="mt-2 leading-6 text-[.9rem]">
						Box breathing, also called square breathing, is a
						paced exercise with four equal parts: inhale,
						hold, exhale, and hold.{" "}
						<Link
							href="/the-science"
							className="font-medium text-secondary underline decoration-secondary/50 underline-offset-4 hover:text-primary dark:text-[#c0e1e9] dark:decoration-[#c0e1e9]/60 dark:hover:text-[#bffaff]"
						>
							Learn how box breathing works
						</Link>{" "}
						in more detail.
					</p>
				</section>

				<section aria-labelledby="comfortable-way-to-begin">
					<h2
						id="comfortable-way-to-begin"
						className="text-lg font-medium text-title"
					>
						A comfortable way to begin
					</h2>
					<p className="mt-2 leading-6 text-[.9rem]">
						Breathe gently and reduce or skip the holds if
						they do not feel comfortable. Stop if you feel
						unwell or light-headed, and{" "}
						<Link
							href="/alternatives"
							className="font-medium text-secondary underline decoration-secondary/50 underline-offset-4 hover:text-primary dark:text-[#c0e1e9] dark:decoration-[#c0e1e9]/60 dark:hover:text-[#bffaff]"
						>
							explore other calming techniques
						</Link>{" "}
						if you would prefer a different approach.
					</p>
				</section>
			</div>
		</main>
	);
};

export default page;
