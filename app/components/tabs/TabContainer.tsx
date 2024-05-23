import { Tab, TabProps } from "./Tab";

export type TabContainerProps = { tabs: TabProps[] };

export default function TabContainer({ tabs }: Readonly<TabContainerProps>) {
    return (
        <nav className="fixed transition-[background-color] duration-[300ms] bottom-0 z-30 inset-x-0 mmd:top-2.5 mmd:bottom-auto mmd:inset-x-auto justify-around mmd:w-fit mmd:place-self-center flex items-center gap-2 mmd:gap-4 py-3 mmd:p-1 bg-white dark:bg-dark mmd:border mmd:rounded-full border-dark/15 dark:border-white/15">
            {tabs.map((tab) => (
                <Tab key={tab.label} {...tab} />
            ))}
        </nav>
    );
}
