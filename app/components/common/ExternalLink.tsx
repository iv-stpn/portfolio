import clsx from "clsx";

export type ExternalLinkProps = { href: string; children: React.ReactNode; className?: string };

export default function ExternalLink({ href, children, className }: Readonly<ExternalLinkProps>) {
    return (
        <a
            href={href}
            target="_blank"
            className={clsx(
                className,
                "border-b border-black dark:border-white border-dotted underline-offset-2 hover:bg-primary dark:hover:bg-transparent dark:hover:text-primary dark:hover:border-solid dark:hover:border-primary"
            )}
        >
            {children}
        </a>
    );
}
