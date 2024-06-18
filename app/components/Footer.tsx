import { RiArrowRightUpLine } from "@remixicon/react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import ExternalLink from "./common/ExternalLink";
import UnderlineLink from "./common/UnderlineLink";

export default function Footer() {
    const locale = useLocale();
    const t = useTranslations("Links");

    return (
        <footer className="pt-16 pb-40 mmd:pb-12 bg-gray-100 dark:bg-neutral-900 transition-[background-color] duration-[300ms] text-xl leading-relaxed">
            <div className="contained pad-screen flex items-center gap-6 mb-16">
                <div className="flex relative">
                    <Image
                        src="/img/iv-stpn.png"
                        alt="Photo de profil"
                        width={200}
                        height={200}
                        className="brightness-125 z-10 shrink-0 rounded-full w-12 h-12"
                    />
                    <div className="absolute bg-primary rounded-full w-12 h-12" />
                </div>
                <h1 className="title">Ivan Stepanian</h1>
            </div>
            {/* <div className="contained pad-screen mb-10">
                <h2 className="opacity-65">Ma mission</h2>
                <p></p>
            </div> */}
            <div className="contained pad-screen flex flex-col md:flex-row gap-16 lg:gap-24 mb-16">
                <div>
                    <h2 className="opacity-65 mb-2">{t("social")}</h2>
                    <ul>
                        <li>
                            <UnderlineLink href={t("linkedin")} external>
                                LinkedIn
                            </UnderlineLink>
                        </li>
                        <li>
                            <UnderlineLink href={t("github")} external>
                                GitHub
                            </UnderlineLink>
                        </li>
                        <li>
                            <UnderlineLink href={t("malt")} external>
                                Malt
                            </UnderlineLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="opacity-65 mb-2">{t("contact")}</h2>
                    <ul>
                        <li>
                            <UnderlineLink href={t("mailto")} external>
                                {t("email")}
                            </UnderlineLink>
                        </li>
                        <li>
                            <UnderlineLink href={t("tel")} external>
                                {t("telephone")}
                            </UnderlineLink>
                        </li>
                        <li>
                            <UnderlineLink href={`/${locale}/contact`}>{t("get-a-quote")}</UnderlineLink>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="opacity-65 mb-2">{t("legal")}</h2>
                    <ul>
                        <li>
                            {t("company")} {t("company-vat")}
                        </li>
                        <li>
                            {t("company-street")}, {t("company-city")}
                        </li>
                        <li>
                            {t("company-number")} — {t("company-register")}
                        </li>
                    </ul>
                </div>
            </div>
            <div className="contained pad-screen">
                <h2 className="opacity-65">{t("creator")}</h2>
                <div>
                    {t.rich("license", {
                        repository: (children) => <ExternalLink href={t("repository")}>{children}</ExternalLink>,
                    })}
                    <RiArrowRightUpLine className="w-5 h-5 inline mb-1 ml-1" />
                </div>
            </div>
        </footer>
    );
}
