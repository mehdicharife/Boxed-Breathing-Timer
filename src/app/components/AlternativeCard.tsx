import React from "react";

export type Alternative = {
	name: string;
	icon: React.FC<React.SVGProps<SVGSVGElement>>;
	description: {
		p1: string;
		p2: string;
	};
	sources: {
		label: string;
		href: string;
	}[];
	cardWidth: string;
	cardHeight: string;
    sectionId: string;
};

const AlternativeCard = ({alternative} : {alternative: Alternative}) => {
	return (
		<a
			className="w-[88vw] min-[450px]:w-[190px] h-[170px] border-2 border-outline rounded-sm p-2 pt-3 flex flex-col items-center hover:cursor-pointer hover:border-none group"
			href={`#${alternative.sectionId}`}
		>
			<p className="text-sm text-title font-bold dark:font-medium text-center mb-2 ">
				{alternative.name}
			</p>
			<alternative.icon width={alternative.cardWidth} height={alternative.cardHeight} />
		</a>
	);
};

export default AlternativeCard;
