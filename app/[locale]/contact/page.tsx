import { RiArrowRightDownLine, RiArrowRightUpLine, RiSendPlaneLine } from "@remixicon/react";
import UnderlineLink from "app/components/common/UnderlineLink";
import ScrollToTop from "app/components/utils/ScrollToTop";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import prisma from "prisma/prisma";
import { z } from "zod";

type LocaleProps = { params: { locale: string } };
export async function generateMetadata({ params: { locale } }: LocaleProps) {
    const t = await getTranslations({ locale, namespace: "ContactMeta" });
    return {
        title: t("title"),
        description: t("description"),
    };
}

type FieldProps = { label: string; type: string; placeholder: string; name: string; required?: boolean };
function Field({ label, type, placeholder, name, required }: Readonly<FieldProps>) {
    return (
        <div className="flex flex-col">
            <hr className="border-neutral-300 dark:border-neutral-600 transition-[border-color] duration-[300ms]" />
            <div className="flex flex-col-reverse">
                <label className="h-10 cursor-text" htmlFor={label} />
                {type === "textarea" ? (
                    <textarea
                        required={required}
                        name={name}
                        id={label}
                        placeholder={placeholder}
                        className="h-32 bg-transparent resize-none"
                    />
                ) : (
                    <input
                        required={required}
                        name={name}
                        type={type}
                        id={label}
                        placeholder={placeholder}
                        className="bg-transparent"
                    />
                )}
                <label
                    className="[textarea:placeholder-shown+&]:opacity-100 [input:placeholder-shown+&]:opacity-100 opacity-50 cursor-text transition-[opacity] duration-[300ms] pt-10 pb-6"
                    htmlFor={label}
                >
                    {label}
                </label>
            </div>
        </div>
    );
}

type TagProps = { name: string; tag: string; label: string };
function Tag({ name, tag, label }: Readonly<TagProps>) {
    return (
        <>
            <input id={tag} type="checkbox" name={name} value={tag} className="peer hidden" />
            <label
                htmlFor={tag}
                className="text-lg cursor-pointer flex items-center gap-2 rounded-xl py-2 px-3 border border-dark dark:border-gray-400 [input:checked+&]:bg-primary dark:[input:checked+&]:bg-transparent dark:[input:checked+&]:text-primary dark:[input:checked+&]:border-primary"
            >
                {label}
            </label>
        </>
    );
}

type TagsFieldProps = { tags: Record<string, string>; name: string; label: string };
function TagsField({ tags, name, label }: Readonly<TagsFieldProps>) {
    return (
        <div className="flex flex-col mb-10">
            <hr className="border-neutral-300 dark:border-neutral-600 transition-[border-color] duration-[300ms] mb-10" />
            <div className="relative pt-[3.5rem] flex flex-wrap gap-4">
                {Object.entries(tags).map(([key, value]) => (
                    <Tag key={key} name={name} tag={key} label={value} />
                ))}
                <p className="absolute opacity-100 top-0 peer-checked:opacity-50 transition-[opacity] duration-[300ms]">
                    {label}
                </p>
            </div>
        </div>
    );
}

const contactFormSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    tags: z.array(z.string()),
    survey: z.array(z.string()),
    message: z.string().optional(),
});

type ContactProps = { params: { locale: string } };
export default async function ContactPage({ params }: Readonly<ContactProps>) {
    async function create(formData: FormData) {
        "use server";
        const name = formData.get("name");
        const email = formData.get("email");
        const tags = formData.getAll("tags[]");
        const survey = formData.getAll("survey[]");
        const message = formData.get("message");

        const data = { name, email, tags, survey, message };
        const contact = await prisma.contact.create({ data: contactFormSchema.parse(data) });

        redirect(`/${params.locale}/contact/success?contact=${contact.id}`);
    }

    const tLinks = await getTranslations("Links");
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

    const surveyTags = {
        webSearch: tContact("surveyTags.webSearch"),
        meet: tContact("surveyTags.meet"),
        linkedin: tContact("surveyTags.linkedin"),
        socialMedia: tContact("surveyTags.socialMedia"),
        wordOfMouth: tContact("surveyTags.wordOfMouth"),
        otherMeans: tContact("surveyTags.otherMeans"),
    };

    return (
        <section className="contained pad-screen mt-12 md:mt-24 pb-24">
            <ScrollToTop />
            <h1 className="title">{tContact("title")}</h1>
            <div className="text-2xl flex gap-3 items-center mt-12 md:mt-20">
                <RiArrowRightDownLine className="w-8 h-8" />
            </div>
            <div className="flex flex-col md:flex-row mt-10 md:-ml-20">
                {/* Form */}
                <div className="md:ml-20 md:basis-[75%] text-xl">
                    <form className="flex flex-col" action={create}>
                        <Field
                            label={tContact("name")}
                            type="text"
                            placeholder={`${tContact("name-placeholder")} *`}
                            name="name"
                            required
                        />
                        <Field
                            label={tContact("email")}
                            type="email"
                            placeholder={`${tContact("email-placeholder")} *`}
                            name="email"
                            required
                        />
                        <TagsField tags={serviceTags} name="tags[]" label={tContact("services")} />
                        <TagsField tags={surveyTags} name="survey[]" label={tContact("survey")} />
                        <Field
                            label={tContact("message")}
                            type="textarea"
                            placeholder={tContact("message-placeholder")}
                            name="message"
                        />
                        <hr className="border-neutral-300 dark:border-neutral-600 transition-[border-color] duration-[300ms] mb-10" />
                        <button
                            type="submit"
                            className="flex items-center gap-2.5 rounded-full text-xl py-3 px-6 border border-dark dark:border-white w-fit bg-dark text-white dark:bg-white dark:text-dark hover:bg-white hover:text-dark dark:hover:bg-dark dark:hover:text-white transition-[background-color,text-color] duration-[300ms]"
                        >
                            {tContact("submit")}
                            <RiSendPlaneLine className="w-5 h-5" />
                        </button>
                    </form>
                </div>
                {/* Contact information */}
                <div className="hidden md:flex flex-col gap-6 md:gap-12 leading-relaxed md:ml-20 md:basis-[25%]">
                    <div>
                        <h2 className="opacity-50 mb-2">{tLinks("contact")}</h2>
                        <ul>
                            <li>
                                <UnderlineLink href={tLinks("mailto")} external className="flex items-center gap-1">
                                    {tLinks("email")}
                                    <RiArrowRightUpLine className="w-4 h-4" />
                                </UnderlineLink>
                            </li>
                            <li>
                                <UnderlineLink href={tLinks("tel")} external className="flex items-center gap-1">
                                    {tLinks("telephone")}
                                    <RiArrowRightUpLine className="w-4 h-4" />
                                </UnderlineLink>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="opacity-50 mb-2">{tLinks("address")}</h2>
                        <ul>
                            <li>{tLinks("company")}</li>
                            <li>{tLinks("company-street")}</li>
                            <li>{tLinks("company-city")}</li>
                            <li>{tLinks("company-vat")}</li>
                        </ul>
                    </div>
                    <div>
                        <h2 className="opacity-50 mb-2">{tLinks("social")}</h2>
                        <ul>
                            <li>
                                <UnderlineLink href={tLinks("linkedin")} external className="flex items-center gap-1">
                                    LinkedIn
                                    <RiArrowRightUpLine className="w-4 h-4" />
                                </UnderlineLink>
                            </li>
                            <li>
                                <UnderlineLink href={tLinks("github")} external className="flex items-center gap-1">
                                    GitHub
                                    <RiArrowRightUpLine className="w-4 h-4" />
                                </UnderlineLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
