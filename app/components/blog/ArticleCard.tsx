import { Article } from "app/[locale]/blog/utils";
import { useLocale } from "next-intl";
import Link from "next/link";

export type ArticleCardProps = { article: Article };
export default async function ArticleCard({ article }: Readonly<ArticleCardProps>) {
    const locale = useLocale();
    return (
        <Link href={`${locale}/blog/${article.slug}`}>
            <article className="flex flex-col gap-6 shrink-0 border border-dark/15 dark:border-white/15 p-6 h-full cursor-pointer">
                <img src={article.metadata.image} alt={article.metadata.title} />
                <div className="flex flex-col gap-2 pr-4">
                    <h2 className="mt-4 text-3xl lg:text-xll">{article.metadata.title}</h2>
                    <p className="mt-2 text-xl lg:text-base !leading-normal">{article.metadata.summary}</p>
                    {/* <p className="text-sm text-gray-500 dark:text-gray-400">{article.metadata.publishedAt}</p>
                    <p className="text-lg">{article.metadata.summary}</p> */}
                </div>
            </article>
        </Link>
    );
}
