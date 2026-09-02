import React from "react";
import { Alternative } from "./AlternativeCard";

const AlternativeSection = ({
	alternative,
	dir,
}: {
	alternative: Alternative;
	dir: "lr" | "rl";
}) => {
	return (
		<section
			className={`flex flex-col ${ dir === 'lr' ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-y-8 justify-between mb-16 w-[90%] max-w-[1000px] m-[0_auto]`}
			id={alternative.sectionId}
		>
			<div className="shrink-0 w-[280px] md:w-[33%]">
				<alternative.icon
					width="full"
					height="full"
					className="shrink-0"
				/>
			</div>

			<div className="max-w-[45ch] [&>p]:text-sm">
				<h2 className="text-2xl text-title font-bold mb-5">
					{alternative.name}
				</h2>
				<p className="mb-4">{alternative.description.p1}</p>
				<p>{alternative.description.p2}</p>
				<div className="mt-5 border-t border-outline/30 pt-3 text-xs">
					<h3 className="font-medium text-title">Sources</h3>
					<ul className="mt-2 space-y-1">
						{alternative.sources.map((source) => (
							<li key={source.href}>
								<a
									href={source.href}
									target="_blank"
									rel="noopener noreferrer"
									className="underline underline-offset-2 hover:text-outline"
								>
									{source.label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</section>
	);
};

export default AlternativeSection;
