import clsx from "clsx";

export type TagProps = {
    content: string;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    uppercase?: boolean;
    link?: string;
    linkInNewTab?: boolean;
    className?: string;
    full?: boolean;
    hoverable?: boolean;
};
export default function Tag({
    content,
    prefix,
    suffix,
    uppercase,
    link,
    linkInNewTab,
    className,
    full,
    hoverable,
}: Readonly<TagProps>) {
    const tagClass = clsx(
        "gap-1.5 tag md:text-sm font-medium w-fit whitespace-nowrap",
        uppercase && "uppercase",
        hoverable && "tag-hover",
        full ? "rounded-full" : "rounded-md",
        className
    );

    return link ? (
        <a href={link} className={tagClass} target={linkInNewTab ? "_blank" : "_self"}>
            {prefix}
            {content}
            {suffix}
        </a>
    ) : (
        <div className={tagClass}>
            {prefix}
            {content}
            {suffix}
        </div>
    );
}
