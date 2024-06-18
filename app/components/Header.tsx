import {
    RiFileTextFill,
    RiFileTextLine,
    RiMailFill,
    RiMailLine,
    RiMegaphoneFill,
    RiMegaphoneLine,
    RiUserSmileFill,
    RiUserSmileLine,
} from "@remixicon/react";
import DarkModeToggle from "app/[locale]/_elements/DarkModeToggle";
import { firaCode } from "app/[locale]/fonts";
import { resumeLink } from "app/utils/constants";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import LanguageSwitch from "./LanguageSwitch";
import TabContainer from "./tabs/TabContainer";

const itemsClass = "flex items-center gap-6";

export default async function Header() {
    const t = await getTranslations("Header");
    const locale = useLocale();

    const tabs = [
        { icon: <RiUserSmileLine />, iconFilled: <RiUserSmileFill />, label: t("tabs.about-me"), link: `/${locale}` },
        {
            icon: <RiFileTextLine />,
            iconFilled: <RiFileTextFill />,
            label: t("tabs.resume"),
            link: resumeLink,
            external: true,
        },
        { icon: <RiMegaphoneLine />, iconFilled: <RiMegaphoneFill />, label: t("tabs.blog"), link: `/${locale}/blog` },
        // { icon: <RiBriefcaseLine />, iconFilled: <RiBriefcaseFill />, label: "Projets", link: "/projects" },
        { icon: <RiMailLine />, iconFilled: <RiMailFill />, label: t("tabs.contact"), link: `/${locale}/contact` },
    ];

    return (
        <>
            <nav className="fixed top-0 w-full text-lg md:text-base pt-2 z-30">
                <div className="flex items-center justify-between pad-screen h-14">
                    <h4 className={itemsClass}>
                        <Link href={`/${locale}/`} className="flex gap-1.5 items-center">
                            <span className="font-medium">{t("name")}</span>
                            <span className={clsx(firaCode.className, "hidden md:inline text-xs font-medium")}>
                                &lt;{t("nickname")}/&gt;
                            </span>
                        </Link>
                    </h4>
                    <div className={itemsClass}>
                        <DarkModeToggle />
                        <LanguageSwitch />
                    </div>
                </div>
            </nav>

            {/* Fixed positioned gradient */}
            <div className="fixed z-20 top-0 inset-x-0 h-28 gradient-top-transition" />
            <TabContainer tabs={tabs} />
        </>
    );
}
