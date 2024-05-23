import { EmblaCarouselType } from "embla-carousel";
import { useCallback, useEffect, useState } from "react";

type UseCarouselSnaps = {
    selectedIndex: number;
    scrollSnaps: number[];
    onDotButtonClick: (index: number) => void;
};

export const useCarouselSnaps = (emblaApi: EmblaCarouselType | undefined): UseCarouselSnaps => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

    const onDotButtonClick = useCallback(
        (index: number) => {
            if (!emblaApi) return;
            emblaApi.scrollTo(index);
        },
        [emblaApi]
    );

    const onInit = useCallback((emblaApi: EmblaCarouselType) => {
        setScrollSnaps(emblaApi.scrollSnapList());
    }, []);

    const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, []);

    useEffect(() => {
        if (!emblaApi) return;

        onInit(emblaApi);
        onSelect(emblaApi);
        emblaApi.on("reInit", onInit);
        emblaApi.on("reInit", onSelect);
        emblaApi.on("select", onSelect);
    }, [emblaApi, onInit, onSelect]);

    return { selectedIndex, scrollSnaps, onDotButtonClick };
};
