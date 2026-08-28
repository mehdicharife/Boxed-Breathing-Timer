import React from "react";
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
		<div className="flex justify-center items-center mt-12">
			<JsonLd data={webApplicationStructuredData} />
			<h1 className="sr-only">Box Breathing Timer</h1>
			<div>
				<BoxedBreathinSimulator />
			</div>
		</div>
	);
};

export default page;
