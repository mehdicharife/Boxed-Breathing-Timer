import type { Metadata } from "next";

export const openGraphBase: NonNullable<Metadata["openGraph"]> = {
	siteName: "Boxed Breathing Timer",
	type: "website",
	locale: "en_US",
	images: [
		{
			url: "/og-card.jpg",
			width: 1424,
			height: 752,
			alt: "Boxed Breathing Timer",
		},
	],
};

export const twitterBase: NonNullable<Metadata["twitter"]> = {
	card: "summary_large_image",
	images: ["/og-card.jpg"],
};

type PageMetadataOptions = {
	title: string;
	description: string;
	pathname: string;
};

export function createPageMetadata({
	title,
	description,
	pathname,
}: PageMetadataOptions): Metadata {
	return {
		title,
		description,
		openGraph: {
			...openGraphBase,
			title,
			description,
			url: pathname,
		},
		twitter: {
			...twitterBase,
			title,
			description,
		},
	};
}
