import React from "react";
import type { Metadata } from "next";
import BoxedBreathinSimulator from "../components/BoxedBreathinSimulator";

export const metadata: Metadata = {
	title: "Box Breathing Timer (4-4-4-4) | Boxed Breathing Timer",
	description:
		"Follow a guided box-breathing timer with visual pacing and optional calming sounds to pause, focus, and reset.",
};

const page = () => {
	return (
		<div className="flex justify-center items-center mt-12">
			<div>
				<BoxedBreathinSimulator />
			</div>
		</div>
	);
};

export default page;
