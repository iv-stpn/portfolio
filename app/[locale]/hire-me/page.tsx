import { useLocale } from "next-intl";
import { redirect } from "next/navigation";

export default function Page() {
    const locale = useLocale();
    if (locale === "en") return redirect("https://www.malt.com/profile/ivanstepanian");
    return redirect("https://www.malt.fr/profile/ivanstepanian");
}
