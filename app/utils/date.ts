export const cutoffs = [60, 3600, 86_400, 86_400 * 7, 86_400 * 30, 86_400 * 365, Number.POSITIVE_INFINITY];
export const units: Intl.RelativeTimeFormatUnit[] = ["second", "minute", "hour", "day", "week", "month", "year"];

export function formatRelativeTime(locale: string, date: Date | number, style: "short" | "long" = "short") {
    const formatter = new Intl.RelativeTimeFormat(locale, { numeric: "auto", style });

    const timeMs = typeof date === "number" ? date : date.getTime();
    const deltaSeconds = Math.round((timeMs - Date.now()) / 1000);
    const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(deltaSeconds));
    const divisor = unitIndex ? cutoffs[unitIndex - 1] : 1;
    return formatter.format(Math.ceil(deltaSeconds / divisor), units[unitIndex]);
}
