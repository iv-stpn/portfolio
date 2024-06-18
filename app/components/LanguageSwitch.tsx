"use client";

import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const locales = {
    en: "EN",
    fr: "FR",
};

export default function LanguageSwitch() {
    const locale = useLocale();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (
        <div className="flex items-center gap-3">
            {Object.entries(locales).map(([key, value]) => {
                const url = pathname.replace(new RegExp(`^/${locale}`), `/${key}`);
                const href = searchParams ? `${url}?${searchParams}` : url;
                return (
                    <h4>
                        <Link className="relative font-medium" key={key} href={href} locale={false}>
                            {value}
                            {locale === key && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />}
                        </Link>
                    </h4>
                );
            })}
        </div>
    );
}
