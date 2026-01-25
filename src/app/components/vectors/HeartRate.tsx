import React from "react";

const HeartRate = (props: React.SVGProps<SVGSVGElement>) => {
	return (
		<svg
			viewBox="0 0 56 50"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M3.28711 12.6298C5.83552 2.96269 17.1305 -3.85853 27.8869 9.34578C40.0261 -5.54676 52.8405 5.03277 53.0093 16.4403C53.0093 33.4231 32.6903 47.3629 27.8869 47.3629C25.0129 47.3629 16.5919 42.3787 10.2852 34.7375"
				stroke="#00AED5"
				strokeWidth={4.01958}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M37.9368 22.679H31.9074L25.878 30.7182L17.8389 16.6497L11.8095 24.6888H2.00977"
				stroke="#00AED5"
				strokeWidth={4.01958}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export default HeartRate;
