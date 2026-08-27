import type { MetadataRoute } from "next";

const siteUrl = new URL(process.env.URL_SELF as string);

export default function sitemap(): MetadataRoute.Sitemap {
	return ["/home", "/the-science", "/alternatives"].map((pathname) => ({
		url: new URL(pathname, siteUrl).toString(),
	}));
}
