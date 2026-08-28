const siteUrl = process.env.URL_SELF ?? "https://www.boxedbreathing.net";
const websiteId = `${siteUrl}/#website`;

export const websiteStructuredData = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	"@id": websiteId,
	name: "Boxed Breathing Timer",
	url: siteUrl,
	description:
		"A guided box-breathing timer with visual pacing and optional calming sounds.",
	inLanguage: "en",
};

export const webApplicationStructuredData = {
	"@context": "https://schema.org",
	"@type": "WebApplication",
	"@id": `${siteUrl}/home#webapplication`,
	name: "Box Breathing Timer",
	url: `${siteUrl}/home`,
	description:
		"Follow a guided box-breathing timer with visual pacing and optional calming sounds to pause, focus, and reset.",
	applicationCategory: "LifestyleApplication",
	operatingSystem: "Web browser",
	browserRequirements: "Requires a modern web browser with JavaScript enabled.",
	isAccessibleForFree: true,
	featureList: [
		"Guided 4-4-4-4 box-breathing exercise",
		"Visual breathing pace indicator",
		"Optional calming sounds",
	],
	image: `${siteUrl}/og-card.jpg`,
	inLanguage: "en",
	isPartOf: {
		"@id": websiteId,
	},
};
