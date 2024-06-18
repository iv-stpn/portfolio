import { formatRelativeTime } from "app/utils/date";
import fs from "fs";
import path from "path";

export type Metadata = {
    title: string;
    publishedAt: string;
    lastUpdatedAt?: string;
    summary: string;
    image: string;
};

export type PartialArticle = {
    metadata: Partial<Metadata>;
    slug: string;
    content: string;
};

export type Article = {
    metadata: Metadata;
    slug: string;
    content: string;
};

function parseFrontmatter(fileContent: string) {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);
    const frontMatterBlock = match![1];
    const content = fileContent.replace(frontmatterRegex, "").trim();
    const frontMatterLines = frontMatterBlock.trim().split("\n");
    const metadata: Partial<Metadata> = {};

    frontMatterLines.forEach((line) => {
        const [key, ...valueArr] = line.split(": ");
        const value = valueArr
            .join(": ")
            .trim()
            .replace(/^['"](.*)['"]$/, "$1"); // Remove quotes
        metadata[key.trim() as keyof Metadata] = value;
    });

    return { metadata, content };
}

function getMDXFiles(dir: fs.PathLike) {
    return fs.readdirSync(dir).filter((file) => path.extname(file) === ".mdx");
}

function readMDXFile(filePath: fs.PathLike) {
    const rawContent = fs.readFileSync(filePath, "utf-8");
    return parseFrontmatter(rawContent);
}

function isMetadataComplete(article: PartialArticle): article is Article {
    const metadata = article.metadata;
    return !!(metadata.title && metadata.publishedAt && metadata.summary && metadata.image);
}

function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir);
    return mdxFiles
        .map((file) => {
            const { metadata, content } = readMDXFile(path.join(dir, file));
            const slug = path.basename(file, path.extname(file));

            return { metadata, slug, content };
        })
        .filter(isMetadataComplete);
}

export function getBlogPosts() {
    return getMDXData(path.join(process.cwd(), "posts"));
}

export function dateSort(date1: string | Date, date2: string | Date) {
    return new Date(date2).getTime() - new Date(date1).getTime();
}

export function formatDate(locale: string, date: string, includeRelative = false) {
    const targetDate = new Date(date);
    const fullDate = targetDate.toLocaleString(locale, { month: "long", day: "numeric", year: "numeric" });

    if (!includeRelative) return fullDate;
    return `${fullDate} (${formatRelativeTime(locale, targetDate, "short")})`;
}
