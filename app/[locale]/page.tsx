import { RiGithubFill, RiLinkedinBoxFill, RiSendPlaneLine, RiStarFill, RiStarLine } from "@remixicon/react";
import ArticleCard from "app/components/blog/ArticleCard";
import Carousel from "app/components/carousel/Carousel";
import ExternalLink from "app/components/common/ExternalLink";
import Tag from "app/components/common/Tag";
import TitleList from "app/components/list/TitleList";
import { resumeLink } from "app/utils/constants";
import clsx from "clsx";
import { useLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import MaltLogo from "../../public/logos/brand/malt.svg";
import LogoMarquee from "./_elements/LogoMarquee";
import { getBlogPosts } from "./blog/utils";

const expandingArrow = (
    <div className="w-10 group-hover:w-14 transition-[color,width] duration-[300ms] text-dark dark:text-white dark:group-hover:text-primary overflow-hidden whitespace-nowrap text-right">
        <span className="float-right">
            <span className="-mr-1">&lt;---</span>
            <span className="-ml-1">--&gt;</span>
        </span>
    </div>
);

type LinkBlockProps = { href: string; label: string; external?: boolean; className?: string };
function LinkBlock({ href, label, external, className }: Readonly<LinkBlockProps>) {
    return (
        <a className={clsx("flex group pt-4", className)} href={href} target={external ? "_blank" : "_self"}>
            <span className="transition-[color,background-color] text-dark dark:text-white duration-[300ms] group-hover:bg-primary dark:group-hover:text-primary dark:group-hover:bg-transparent flex items-center gap-3 p-2">
                {expandingArrow}
                {label}
            </span>
        </a>
    );
}

const br = () => <br />;
export default async function IndexPage() {
    const locale = useLocale();
    const posts = getBlogPosts();
    const tLinks = await getTranslations("Links");
    const tIndex = await getTranslations("Index");

    const linkKeys = ["pandas", "scala", "spark", "azure", "react", "nextjs", "nestjs", "kubernetes"];
    const linkRichFormat = Object.fromEntries(
        linkKeys.map((key) => [
            key,
            (children: React.ReactNode) => <ExternalLink href={tIndex(`links.${key}`)}>{children}</ExternalLink>,
        ])
    );

    const tagList = (
        <div className="flex flex-wrap gap-2">
            <Tag content={tIndex("freelancing.tags.experience")} uppercase full />
            <Tag content={tIndex("freelancing.tags.projects")} uppercase full />
        </div>
    );

    const emailTag = (
        <Tag
            className="text-base"
            link={tLinks("mailto")}
            linkInNewTab
            content={tLinks("email")}
            suffix={<RiSendPlaneLine className="w-4 h-4" />}
            hoverable
        />
    );

    const links = (
        <nav className="flex gap-2 mt-4 items-center">
            <Tag
                link={tLinks("github")}
                linkInNewTab
                content="GitHub"
                prefix={<RiGithubFill className="w-4 h-4" />}
                hoverable
            />
            <Tag
                className="text-[#0077b5] border-[#0077b5] dark:text-[#90d8ff] dark:border-[#90d8ff] hover:border-transparent"
                link={tLinks("linkedin")}
                linkInNewTab
                content="LinkedIn"
                prefix={<RiLinkedinBoxFill className="w-4 h-4" />}
                hoverable
            />
            <Tag
                className="text-[#fc5757] border-[#fc5757] dark:text-[#ff8c8c] dark:border-[#ff8c8c] hover:border-transparent"
                link={tLinks("malt")}
                linkInNewTab
                content="Malt"
                prefix={<MaltLogo className="w-4 h-4" />}
                hoverable
            />
            <div className="gap-1 pl-12 items-center hidden llg:flex">
                <span className="font-semibold text-lg nums">{tIndex("freelancing.rating")}</span>
                <span className="relative w-5 h-5">
                    <RiStarLine className="absolute top-0 w-5 h-5 z-10 dark:text-primary" />
                    <RiStarFill className="absolute top-0 w-5 h-5 text-primary" />
                </span>
                <span className="pl-1 flex items-center gap-1">
                    {tIndex("freelancing.platform")}
                    <MaltLogo className="w-4 h-4" />
                </span>
            </div>
        </nav>
    );

    return (
        <>
            <div className="contained w-full">
                <section className="pad-screen mt-12 md:mt-24">
                    <div className="flex flex-col-reverse gap-6 xss:flex-row justify-between sm:items-center">
                        <div>
                            <h1 className="title !text-[2.85rem]">{tIndex.rich("titles.home", { br })}</h1>
                            <div className="ssm:hidden mt-6">{tagList}</div>
                            <div className="mt-6 hidden ssm:block">{links}</div>
                        </div>
                        <div className="relative flex shrink-0 gap-4">
                            <Image
                                src="/img/iv-stpn.png"
                                alt="Ivan Stepanian: Photo"
                                width={200}
                                height={200}
                                className="brightness-125 z-10 shrink-0 rounded-full w-28 h-28 xss:w-36 xss:h-36 ssm:rounded-2xl md:pl-0.5 lg:w-44 lg:h-44"
                            />
                            <div className="absolute bg-primary w-28 h-28 xss:w-36 xss:h-36 rounded-full ssm:rounded-2xl md:pl-0.5 lg:w-44 lg:h-44" />
                            <div className="hidden ssm:flex max-w-48 flex-col justify-between my-2">
                                {tagList}
                                {emailTag}
                            </div>
                        </div>
                    </div>
                </section>
                <section className="pad-screen mt-20">
                    <div className="flex flex-col mmd:flex-row justify-between gap-12 pr-8 mmd:pr-0">
                        <div className="text-xl llg:text-2xl leading-relaxed mmd:max-w-[25rem] llg:max-w-[32rem]">
                            {tIndex("subtitle")}
                        </div>
                        <div className="text-xl mmd:text-sm mmd:max-w-[22rem] lg:max-w-96 shrink-0 grow-0 flex flex-col gap-12 mmd:gap-4">
                            <p className="leading-relaxed">{tIndex.rich("details", linkRichFormat)}</p>
                            <span className="flex items-center gap-3 mmd:hidden">
                                {tIndex("work-together")}
                                <div className="block ssm:hidden">{emailTag}</div>
                            </span>
                        </div>
                    </div>
                </section>
            </div>
            <section>
                <LogoMarquee className="py-8 px-2 mt-20 bg-white" />
            </section>
            <section className="mt-20 mb-24">
                <h1 className="title pad-screen contained">{tIndex("titles.articles")}</h1>
                <Carousel
                    parentClassName="mt-12"
                    className="pad-screen"
                    options={{ skipSnaps: true }}
                    slides={posts.map((post) => (
                        <ArticleCard key={post.slug} article={post} />
                    ))}
                />
            </section>
            <section className="py-28 bg-gray-100 dark:bg-neutral-900 transition-[background-color] duration-[300ms]">
                <h1 className="title pad-screen contained">{tIndex("titles.services")}</h1>
                <div className="mt-20 pad-screen contained">
                    <TitleList
                        items={[
                            { title: tIndex("services.data.title"), content: tIndex("services.data.content") },
                            { title: tIndex("services.web.title"), content: tIndex("services.web.content") },
                            { title: tIndex("services.scraping.title"), content: tIndex("services.scraping.content") },
                        ]}
                    />
                </div>
            </section>
            <section className="pad-screen mt-20 pb-16 contained text-xl md:text-2xl">
                <h1 className="title mb-6">{tIndex("titles.contact")}</h1>
                <div className="flex flex-col md:flex-row flex-wrap">
                    <div className="md:basis-[50%] mt-12">
                        <div>{tIndex("contact.first-contact")}</div>
                        <LinkBlock href={tLinks("mailto")} label={tLinks("email")} />
                    </div>
                    <div className="md:basis-[50%] mt-12">
                        <div>{tIndex("contact.quote")}</div>
                        <LinkBlock href={`/${locale}/contact`} label={tLinks("get-a-quote")} />
                    </div>
                </div>
                <div className="w-full mt-16">
                    <div>{tIndex("contact.know-more")}</div>
                    <div className="flex flex-col md:flex-row">
                        <LinkBlock
                            href={resumeLink}
                            label={tIndex("contact.resume")}
                            className="md:basis-[50%]"
                            external
                        />
                        <LinkBlock
                            href={tLinks("malt")}
                            label={tIndex("contact.freelancing")}
                            className="md:basis-[50%]"
                            external
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
