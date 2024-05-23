export type TitleListProps = {
    items: { title: React.ReactNode; content: React.ReactNode; suffix?: React.ReactNode; prefix?: React.ReactNode }[];
};

export default function TitleList({ items }: Readonly<TitleListProps>) {
    return (
        <div className="flex flex-col mmd:flex-row mmd:flex-wrap mmd:-ml-12 gap-16 mmd:gap-0">
            {items.map((item, index) => (
                <div key={index} className="flex flex-col gap-1 grow-0 shrink-0 basis-full mmd:basis-[33%] mmd:pl-12">
                    {item.prefix}
                    <hr className="border-neutral-300 dark:border-neutral-600 transition-[border-color] duration-[300ms] mb-16 mmd:mb-8" />
                    <h2 className="text-3xl mb-8">{item.title}</h2>
                    <p className="text-lg mmd:text-base !leading-relaxed">{item.content}</p>
                    {item.suffix && <div className="mt-6">{item.suffix}</div>}
                </div>
            ))}
        </div>
    );
}
