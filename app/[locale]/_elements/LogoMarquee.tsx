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

const logos = [
    ApacheSparkLogo,
    KubernetesLogo,
    NextJSLogo,
    NestJSLogo,
    PandasLogo,
    ScalaLogo,
    TypeScriptLogo,
    AzureLogo,
    HadoopLogo,
];

export type LogoMarqueeProps = { className?: string };
export default function LogoMarquee({ className }: Readonly<LogoMarqueeProps>) {
    return (
        <div className={className}>
            <Marquee direction="left" gradient speed={40} gradientWidth={48}>
                {logos.map((Svg, idx) => (
                    <Svg key={idx} className="h-10 px-2 mx-6" />
                ))}
            </Marquee>
        </div>
    );
}
