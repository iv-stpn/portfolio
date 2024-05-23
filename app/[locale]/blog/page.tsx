import { RiArrowRightUpLine } from "@remixicon/react";
import ScrollToTop from "app/components/utils/ScrollToTop";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/link";
import { dateSort, formatDate, getBlogPosts } from "./utils";

type LocaleProps = { params: { locale: string } };
export async function generateMetadata({ params: { locale } }: LocaleProps) {
    const t = await getTranslations({ locale, namespace: "Blog" });
    return {
        title: t("meta.title"),
        description: t("meta.description"),
    };
}

export default async function Page() {
    const locale = await getLocale();
    const t = await getTranslations("Blog");
    const allBlogs = getBlogPosts();

    return (
        <section className="mt-12 md:mt-24 pb-24">
            <ScrollToTop />
            <h1 className="title contained pad-screen">{t("title")}</h1>
            <div className="mt-12 md:mt-16 text-xl">
                {allBlogs
                    .sort((blog1, blog2) => dateSort(blog1.metadata.publishedAt, blog2.metadata.publishedAt))
                    .map((post) => (
                        <>
                            <hr className="border-neutral-300 dark:border-neutral-600 transition-[border-color] duration-[300ms]" />
                            <Link
                                key={post.slug}
                                className="px-[calc(max(calc(50%-var(--max-width)/2),0px)+var(--pad-screen))] flex flex-col gap-1 py-6 hover:bg-primary/65 focus:bg-primary/65"
                                href={`/${locale}/blog/${post.slug}`}
                            >
                                <div className="w-full flex flex-col md:flex-row space-x-0 md:gap-2">
                                    <p className="w-52 opacity-50 tabular-nums">
                                        {formatDate(locale, post.metadata.publishedAt, false)}
                                    </p>
                                    <p className="tracking-tight underline underline-offset-4 opacity-95">
                                        {post.metadata.title}
                                        <RiArrowRightUpLine className="w-6 h-6 inline ml-1.5" />
                                    </p>
                                </div>
                            </Link>
                        </>
                    ))}
                <hr className="border-neutral-300 dark:border-neutral-600 transition-[border-color] duration-[300ms]" />
            </div>
        </section>
    );
}
