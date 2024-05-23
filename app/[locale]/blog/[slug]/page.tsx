import { formatDate, getBlogPosts } from "app/[locale]/blog/utils";
import { CustomMDX } from "app/components/MDX";
import { baseUrl } from "app/utils/constants";
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

export default function BlogPage({ params }: Readonly<BlogProps>) {
    const locale = params.locale;
    const post = getBlogPosts().find((post) => post.slug === params.slug);

    if (!post) notFound();

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
                        image: post.metadata.image
                            ? `${baseUrl}${post.metadata.image}`
                            : `/og?title=${encodeURIComponent(post.metadata.title)}`,
                        url: `${baseUrl}/blog/${post.slug}`,
                        author: {
                            "@type": "Person",
                            name: "Ivan Stepanian",
                        },
                    }),
                }}
            />
            <div className="bg-gray-100 dark:bg-neutral-800 transition-[background-color] duration-300 max-w-4xl mx-auto pad-screen pt-24 mb-24 pb-24">
                <h1 className="title">{post.metadata.title}</h1>
                <div className="flex justify-between items-center mt-2 mb-8 text-xl">
                    <p>{formatDate(locale, post.metadata.publishedAt, true)}</p>
                </div>
                <article className="prose dark:prose-invert">
                    <CustomMDX source={post.content} />
                </article>
            </div>
        </section>
    );
}
