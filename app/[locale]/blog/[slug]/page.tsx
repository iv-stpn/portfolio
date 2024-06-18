import { RiArrowLeftLine } from "@remixicon/react";
import { formatDate, getBlogPosts } from "app/[locale]/blog/utils";
import { CustomMDX } from "app/components/CustomMDX";
import ArticleCard from "app/components/blog/ArticleCard";
import { baseUrl } from "app/utils/constants";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";

// export async function generateStaticParams() {
//     const posts = getBlogPosts();
//     return posts.map((post) => ({ slug: post.slug }));
// }

type BlogProps = { params: { slug: string; locale: string } };
export function generateMetadata({ params }: BlogProps) {
    const post = getBlogPosts().find((post) => post.slug === params.slug);
    if (!post) return;

    const { title, publishedAt: publishedTime, summary: description, image } = post.metadata;
    const ogImage = image ? image : `${baseUrl}/og?title=${encodeURIComponent(title)}`;
    const url = `${baseUrl}/${params.locale}/blog/${post.slug}`;

    return {
        title,
        description,
        openGraph: { title, description, type: "article", publishedTime, url, images: [{ url: ogImage }] },
        twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    };
}

export default async function BlogPage({ params }: Readonly<BlogProps>) {
    const locale = params.locale;
    const posts = getBlogPosts();
    const post = posts.find((post) => post.slug === params.slug);

    if (!post) notFound();

    const recentPosts = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
    const image = post.metadata.image
        ? `${baseUrl}${post.metadata.image}`
        : `/og?title=${encodeURIComponent(post.metadata.title)}`;

    const t = await getTranslations("BlogPage");

    return (
        <section className="contained w-full">
            <script
                type="application/ld+json"
                suppressHydrationWarning
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "BlogPosting",
                        headline: post.metadata.title,
                        datePublished: post.metadata.publishedAt,
                        dateModified: post.metadata.publishedAt,
                        description: post.metadata.summary,
                        image,
                        url: `${baseUrl}/blog/${post.slug}`,
                        author: {
                            "@type": "Person",
                            name: "Ivan Stepanian",
                        },
                    }),
                }}
            />
            <div className="transition-[background-color] duration-300 max-w-[55rem] mx-auto pad-screen pt-24 mb-24 pb-6">
                <a href={`/${locale}/blog`} className="flex items-center gap-2 mb-2 opacity-65 hover:opacity-100">
                    <RiArrowLeftLine className="w-4 h-4" />
                    <h4>{t("back")}</h4>
                </a>
                <h1 className="text-[2.5rem] font-bold md:pr-20 leading-snug mb-4">{post.metadata.title}</h1>
                <p className="mb-8">{post.metadata.summary}</p>
                <img
                    src={image}
                    alt={post.metadata.title}
                    className="w-full object-cover rounded-xl mb-8 border border-gray-300 dark:border-gray-700 transition-[border-color] duration-[300ms]"
                />
                <div className="flex items-center justify-between mt-2 mb-8 gap-6">
                    <span className="flex items-center gap-4">
                        <Image
                            src="/img/iv-stpn-bg.png"
                            alt="Ivan Stepanian: Photo"
                            width={48}
                            height={48}
                            className="brightness-110 z-10 shrink-0 rounded-full h-12 w-12"
                        />
                        <h4 className="font-semibold">Ivan Stepanian</h4>
                    </span>
                    <span className="flex items-center gap-6 tracking-[0.005rem]">
                        <h4>
                            {t("published")}{" "}
                            <b className="font-semibold">{formatDate(locale, post.metadata.publishedAt, true)}</b>
                        </h4>
                        {post.metadata.lastUpdatedAt && (
                            <>
                                |
                                <h4>
                                    {t("lastUpdated")}{" "}
                                    <b className="font-semibold">
                                        {formatDate(locale, post.metadata.lastUpdatedAt, true)}
                                    </b>
                                </h4>
                            </>
                        )}
                    </span>
                </div>
                <article className="prose dark:prose-invert">
                    <CustomMDX source={post.content} />
                </article>
            </div>
            <div className="mb-12 pad-screen">
                <h2 className="title mb-8">{t("recentPosts")}</h2>
                <div className="grid gap-8 xss:grid-cols-2 lg:grid-cols-3">
                    {recentPosts.map((post, idx) => (
                        <div className={idx === recentPosts.length - 1 ? "xss:hidden lg:block" : ""}>
                            <ArticleCard key={post.slug} article={post} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
