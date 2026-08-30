import type { MetadataRoute } from "next";
import { siteUrl } from "./site-url";

export default function sitemap(): MetadataRoute.Sitemap {
	return ["/home", "/the-science", "/alternatives"].map((pathname) => ({
		url: new URL(pathname, siteUrl).toString(),
	}));
}
