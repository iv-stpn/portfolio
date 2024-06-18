"use client";

import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";

export default function DarkModeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    const t = useTranslations("DarkModeToggle");
    const label = t("label");

    return (
        <label className="flex items-center gap-2.5 cursor-pointer" htmlFor="dark-mode-toggle">
            <input
                id="dark-mode-toggle"
                type="checkbox"
                checked={isDark}
                className="relative cursor-pointer appearance-none h-5 w-10 bg-black dark:bg-white before:w-4 before:h-4 before:transition-[transform_400ms,color_200ms] before:absolute before:top-0.5 before:left-0.5 before:border before:border-dark before:rounded-full dark:before:translate-x-5 before:bg-white before:dark:bg-dark rounded-full"
                onChange={() => setTheme(isDark ? "light" : "dark")}
            />
            <h4 className="whitespace-nowrap font-medium">{label}</h4>
        </label>
    );
}
