const DEFAULT_SITE_URL = "https://www.boxedbreathing.net";

function resolveSiteUrl(): URL {
	const configuredUrl = process.env.URL_SELF ?? DEFAULT_SITE_URL;

	try {
		const url = new URL(configuredUrl);

		if (url.protocol !== "http:" && url.protocol !== "https:") {
			throw new Error("URL_SELF must use the http or https protocol.");
		}

		return new URL(url.origin);
	} catch (error) {
		const message =
			error instanceof Error ? error.message : "Invalid URL_SELF value.";

		throw new Error(
			`Invalid URL_SELF value. Set it to an absolute public origin, for example ${DEFAULT_SITE_URL}. ${message}`,
		);
	}
}

export const siteUrl = resolveSiteUrl();
export const siteUrlString = siteUrl.origin;
