import type { MetadataRoute } from "next";

const siteUrl = new URL(process.env.URL_SELF as string);

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
		},
		sitemap: new URL("/sitemap.xml", siteUrl).toString(),
	};
}
