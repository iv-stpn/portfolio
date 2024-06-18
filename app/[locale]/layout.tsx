import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Footer from "app/components/Footer";
import Header from "app/components/Header";
import { baseUrl } from "app/utils/constants";
import clsx from "clsx";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import "../global.css";
import { figtree, firaCode, inter } from "./fonts";

export type LocaleProps = { params: { locale: string } };
export async function generateMetadata({ params: { locale } }: LocaleProps) {
    const t = await getTranslations({ locale, namespace: "Metadata" });

    return {
        metadataBase: new URL(baseUrl),
        title: { default: t("title"), template: t("template") },
        description: t("description"),
        openGraph: {
            title: t("title"),
            description: t("description"),
            url: baseUrl,
            siteName: "ivanstepanian.com",
            locale: t("locale"),
            type: "website",
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

type RootLayoutProps = { children: React.ReactNode };
export default async function RootLayout({ children }: Readonly<RootLayoutProps>) {
    const messages = await getMessages();
    const locale = await getLocale();

    return (
        <html
            lang={locale}
            suppressHydrationWarning
            className={clsx(
                inter.className,
                firaCode.variable,
                figtree.variable,
                "font-sans !scroll-smooth text-dark bg-white dark:text-white dark:bg-dark text-[12px] sm:text-[13px] md:text-[14px] mmd:text-[15px] llg:text-[15px] xl:text-[18px] transition-[color,background-color] duration-[300ms]"
            )}
        >
            <body className="antialiased tracking-tight">
                <ThemeProvider attribute="class" storageKey="THEME">
                    <NextIntlClientProvider messages={messages}>
                        <main className="flex-auto pt-12 min-w-0 flex flex-col">
                            <Header />
                            {children}
                            <Footer />
                            <Analytics />
                            <SpeedInsights />
                        </main>
                    </NextIntlClientProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
