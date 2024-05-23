import { dateSort, getBlogPosts } from "app/[locale]/blog/utils";
import { baseUrl } from "app/utils/constants";
import { getTranslations } from "next-intl/server";

export async function GET() {
    const locale = "en";
    const t = await getTranslations({ locale, namespace: "Metadata" });
    const tBlog = await getTranslations({ locale, namespace: "Blog" });

    const allBlogs = getBlogPosts();

    const itemsXml = allBlogs
        .sort((blog1, blog2) => dateSort(blog1.metadata.publishedAt, blog2.metadata.publishedAt))
        .map(
            (post) =>
                `<item>
          <title>${post.metadata.title}</title>
          <link>${baseUrl}/en/blog/${post.slug}</link>
          <description>${post.metadata.summary || ""}</description>
          <pubDate>${new Date(post.metadata.publishedAt).toUTCString()}</pubDate>
        </item>`
        )
        .join("\n");

    const rssFeed = `<?xml version="1.0" encoding="UTF-8" ?>
  <rss version="2.0">
    <channel>
        <title>${t("title")}</title>
        <link>${baseUrl}</link>
        <description>${tBlog("meta.description")}</description>
        ${itemsXml}
    </channel>
  </rss>`;

    return new Response(rssFeed, { headers: { "Content-Type": "text/xml" } });
}
