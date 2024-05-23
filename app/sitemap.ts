import { getBlogPosts } from "app/[locale]/blog/utils";
import { baseUrl, resumeLink } from "./utils/constants";

export default async function sitemap() {
    const blogs = getBlogPosts().map((post) => ({
        url: `${baseUrl}/blog/${post.slug}`,
        lastModified: post.metadata.publishedAt,
    }));

    const routes = ["", "/blog", resumeLink, "/contact", "/hire-me", ""].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date().toISOString().split("T")[0],
    }));

    return [...routes, ...blogs];
}
