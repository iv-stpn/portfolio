import { Article } from "app/[locale]/blog/utils";
import { useLocale } from "next-intl";
import Link from "next/link";

export type ArticleCardProps = { article: Article };
export default async function ArticleCard({ article }: Readonly<ArticleCardProps>) {
    const locale = useLocale();
    return (
        <Link href={`/${locale}/blog/${article.slug}`}>
            <article className="flex flex-col shrink-0 border border-dark/15 dark:border-white/15 h-full cursor-pointer rounded-2xl overflow-hidden">
                <img src={article.metadata.image} alt={article.metadata.title} />
                <div className="flex flex-col gap-2 p-8 lg:p-6">
                    <h2 className="mb-3 text-2xl lg:text-xl font-semibold !leading-snug">{article.metadata.title}</h2>
                    <p className="text-lg lg:text-base !leading-normal line-clamp-3">{article.metadata.summary}</p>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">{article.metadata.publishedAt}</p>
                    <p className="text-lg">{article.metadata.summary}</p> */}
                </div>
            </article>
        </Link>
    );
}
