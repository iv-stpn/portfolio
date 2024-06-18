"use client";

import clsx from "clsx";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type TabProps = {
    icon: React.ReactNode;
    iconFilled: React.ReactNode;
    label: string;
    link: string;
    external?: boolean;
};

export function Tab({ icon, iconFilled, label, link, external }: Readonly<TabProps>) {
    const pathname = usePathname();
    const locale = useLocale();
    const isActive = link === `/${locale}` ? pathname === `/${locale}` : pathname.startsWith(link);

    const inner = (
        <>
            <div className="mmd:hidden">{isActive ? iconFilled : icon}</div>
            <span className="whitespace-nowrap mmd:text-base font-medium">{label}</span>
        </>
    );

    const className = clsx(
        "flex flex-col items-center gap-1.5 px-4 py-2 mmd:py-1.5 mmd:rounded-full w-[5.5rem] mmd:w-auto shrink-0 grow-0 transition-[color,background-color] duration-300 text-dark dark:text-white",
        isActive && "bg-primary dark:!text-primary dark:bg-transparent rounded-2xl"
    );

    return (
        <h4>
            {external ? (
                <a href={link} className={className} target="_blank" rel="noopener noreferrer">
                    {inner}
                </a>
            ) : (
                <Link href={link} className={className}>
                    {inner}
                </Link>
            )}
        </h4>
    );
}
