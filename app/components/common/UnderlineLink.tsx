import clsx from "clsx";

export type UnderlineLinkProps = { href: string; children: React.ReactNode; external?: boolean; className?: string };
export default function UnderlineLink({ href, children, external, className }: Readonly<UnderlineLinkProps>) {
    return (
        <a
            href={href}
            target={external ? "_blank" : "_self"}
            className={clsx("hover:underline underline-offset-4", className)}
        >
            {children}
        </a>
    );
}
