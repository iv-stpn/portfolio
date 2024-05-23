"use client";

import clsx from "clsx";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useCarouselSnaps } from "./useCarouselSnaps";

export type CarouselProps = {
    slides: React.ReactNode[];
    parentClassName?: string;
    className?: string;
    options?: EmblaOptionsType;
};
export default function Carousel({ slides, className, parentClassName, options }: Readonly<CarouselProps>) {
    const [emblaRef, emblaApi] = useEmblaCarousel(options);

    const { selectedIndex, scrollSnaps, onDotButtonClick } = useCarouselSnaps(emblaApi);

    return (
        <div className={clsx("overflow-hidden", parentClassName)} ref={emblaRef}>
            <div className={clsx("flex touch-pan-y touch-pinch-zoom -ml-4 md:-ml-6", className)}>
                {slides.map((inner, index) => (
                    <div
                        className={clsx(
                            "grow-0 shrink-0 basis-full md:basis-[50%] xl:basis-[33%] pl-4 md:pl-6",
                            index === slides.length - 1 && "mr-6"
                        )}
                        key={index}
                    >
                        {inner}
                    </div>
                ))}
            </div>
            <div className="flex items-center mx-auto w-fit mt-4">
                {scrollSnaps.map((_, index) => (
                    <button className="py-6 px-1.5" onClick={() => onDotButtonClick(index)}>
                        <div
                            key={index}
                            className={clsx(
                                "w-16 h-1",
                                index === selectedIndex
                                    ? "bg-neutral-600 dark:bg-neutral-200"
                                    : "bg-neutral-300 dark:bg-neutral-600"
                            )}
                        />
                    </button>
                ))}
            </div>
        </div>
    );
}
