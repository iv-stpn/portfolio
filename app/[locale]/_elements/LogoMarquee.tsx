"use client";

import Marquee from "react-fast-marquee";
import ApacheSparkLogo from "../../../public/logos/apache-spark.svg";
import AzureLogo from "../../../public/logos/azure.svg";
import HadoopLogo from "../../../public/logos/hadoop.svg";
import KubernetesLogo from "../../../public/logos/kubernetes.svg";
import NestJSLogo from "../../../public/logos/nestjs.svg";
import NextJSLogo from "../../../public/logos/nextjs.svg";
import PandasLogo from "../../../public/logos/pandas.svg";
import ScalaLogo from "../../../public/logos/scala.svg";
import TypeScriptLogo from "../../../public/logos/typescript.svg";

export type LogoMarqueeProps = { className?: string };
export default function LogoMarquee({ className }: Readonly<LogoMarqueeProps>) {
    return (
        <div className={className}>
            <Marquee direction="left" gradient speed={40} gradientWidth={48}>
                <ApacheSparkLogo className="h-10 px-2 mx-6" />
                <KubernetesLogo className="h-10 px-2 mx-6" />
                <NextJSLogo className="h-10 px-2 mx-6" />
                <NestJSLogo className="h-10 px-2 mx-6" />
                <PandasLogo className="h-10 px-2 mx-6" />
                <ScalaLogo className="h-10 px-2 mx-6" />
                <TypeScriptLogo className="h-10 px-2 mx-6" />
                <AzureLogo className="h-10 px-2 mx-6" />
                <HadoopLogo className="h-10 px-2 mx-6" />
            </Marquee>
        </div>
    );
}
