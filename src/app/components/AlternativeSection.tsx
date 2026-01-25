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
				<h1 className="text-2xl text-title font-bold mb-5">
					{alternative.name}
				</h1>
				<p className="mb-4">{alternative.description.p1}</p>
				<p>{alternative.description.p2}</p>
			</div>
		</section>
	);
};

export default AlternativeSection;
