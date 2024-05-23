import { RiSendPlaneLine } from "@remixicon/react";
import ScrollToTop from "app/components/utils/ScrollToTop";
import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import prisma from "prisma/prisma";

const br = () => <br />;

type SuccessPageProps = { params: { locale: string }; searchParams: { contact: string } };
export default async function SuccessPage({ params, searchParams }: Readonly<SuccessPageProps>) {
    const t = await getTranslations("Links");
    const tContact = await getTranslations("Contact");

    const serviceTags = {
        etl: tContact("serviceTags.etl"),
        data: tContact("serviceTags.data"),
        scraping: tContact("serviceTags.scraping"),
        mobile: tContact("serviceTags.mobile"),
        frontend: tContact("serviceTags.frontend"),
        backend: tContact("serviceTags.backend"),
        leads: tContact("serviceTags.leads"),
        consulting: tContact("serviceTags.consulting"),
        other: tContact("serviceTags.other"),
    };

    const contact = searchParams.contact;
    const data = contact ? await prisma.contact.findUnique({ where: { id: contact } }) : null;

    if (!data) return redirect(`/${params.locale}/contact`);

    return (
        <section className="contained pad-screen mt-24 pb-24">
            <ScrollToTop />
            <h1 className="title !leading-relaxed">{tContact.rich("success", { name: data.name, br })}</h1>
            <div className="mt-16 text-xl flex flex-col gap-6 leading-relaxed">
                <div>
                    <h3 className="opacity-50 mb-1">{tContact("email")}</h3>
                    <p>{data.email}</p>
                </div>
                {data.tags.length > 0 && (
                    <div>
                        <h3 className="opacity-50 mb-1">{tContact("services")}</h3>
                        <p>{data.tags.map((tag) => serviceTags[tag]).join(", ")}</p>
                    </div>
                )}
                {data.message && (
                    <div>
                        <h3 className="opacity-50 mb-1">{tContact("message")}</h3>
                        <p>{data.message}</p>
                    </div>
                )}
                <div className="mt-6 flex flex-col gap-3">
                    {tContact("additional")}
                    <Link
                        className="whitespace-nowrap py-1.5 px-3 rounded-lg border w-fit text-dark dark:text-white border-dark dark:border-white hover:bg-dark dark:hover:bg-white hover:text-white dark:hover:text-dark transition-[background-color,border-color,color] duration-300"
                        href={t("mailto")}
                    >
                        {tContact("send-email")} <RiSendPlaneLine className="h-5 w-5 inline" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
