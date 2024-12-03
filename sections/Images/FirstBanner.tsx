import Image from "apps/website/components/Image.tsx";
import { SeventhVariationProps, ThirdVariationProps } from "./components/types/types.ts";
import { useDevice } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "../../components/ui/Icon.tsx";

const SeventhVariation = ({ title, items }: SeventhVariationProps) => {
    const device = useDevice();
    const id = useId();
    if (!items || items.length > 5) {
        return null;
    }
    return (
        <>
            {device === "desktop" && (
                <div class="container px-5 lg:px-0">
                    {title &&
                        (
                            <div class="mb-5">
                                <p class="text-2xl sm:text-3xl font-semibold">
                                    {title}
                                </p>
                            </div>
                        )}
                    <div class="grid grid-cols-10 justify-center gap-4">
                        <div class="col-span-4">
                            <a href={items[0].Link} class="flex w-full h-full">
                                <Image
                                    src={items[0].desktop?.Image ||
                                        `https://placehold.co/${
                                            items[0].desktop?.Width
                                        }x${items[0].desktop?.Height}`}
                                    alt={items[0].Alt || "Image"}
                                    width={items[0].desktop?.Width}
                                    height={items[0].desktop?.Height}
                                    fetchPriority="low"
                                    class="object-cover rounded-xl h-full"
                                />
                            </a>
                        </div>
                        <div class="col-span-6 grid grid-rows-2 grid-cols-2 gap-4">
                            {items &&
                                (
                                    <>
                                        <a href={items[1].Link} class="flex ">
                                            <Image
                                                src={items[1].desktop?.Image ||
                                                    `https://placehold.co/${
                                                        items[1].desktop?.Width
                                                    }x${
                                                        items[1].desktop?.Height
                                                    }`}
                                                alt={items[1].Alt ||
                                                    "esse é um banner de uma marca tradicional"}
                                                width={items[1].desktop?.Width}
                                                height={items[1].desktop
                                                    ?.Height}
                                                fetchPriority="low"
                                                class="object-contain rounded-xl w-full"
                                            />
                                        </a>
                                        <a href={items[2].Link} class="flex ">
                                            <Image
                                                src={items[2].desktop?.Image ||
                                                    `https://placehold.co/${
                                                        items[2].desktop?.Width
                                                    }x${
                                                        items[2].desktop?.Height
                                                    }`}
                                                alt={items[2].Alt ||
                                                    "esse é um banner de uma marca tradicional"}
                                                width={items[2].desktop?.Width}
                                                height={items[2].desktop
                                                    ?.Height}
                                                fetchPriority="low"
                                                class="object-contain rounded-xl w-full"
                                            />
                                        </a>
                                        <a href={items[3].Link} class="flex ">
                                            <Image
                                                src={items[3].desktop?.Image ||
                                                    `https://placehold.co/${
                                                        items[3].desktop?.Width
                                                    }x${
                                                        items[3].desktop?.Height
                                                    }`}
                                                alt={items[3].Alt ||
                                                    "esse é um banner de uma marca tradicional"}
                                                width={items[3].desktop?.Width}
                                                height={items[3].desktop
                                                    ?.Height}
                                                fetchPriority="low"
                                                class="object-contain rounded-xl w-full"
                                            />
                                        </a>
                                        <a href={items[4].Link} class="flex ">
                                            <Image
                                                src={items[4].desktop?.Image ||
                                                    `https://placehold.co/${
                                                        items[4].desktop?.Width
                                                    }x${
                                                        items[4].desktop?.Height
                                                    }`}
                                                alt={items[4].Alt ||
                                                    "esse é um banner de uma marca tradicional"}
                                                width={items[4].desktop?.Width}
                                                height={items[4].desktop
                                                    ?.Height}
                                                fetchPriority="low"
                                                class="object-contain rounded-xl w-full"
                                            />
                                        </a>
                                    </>
                                )}
                        </div>
                    </div>
                </div>
            )}
            {device === "mobile" && (
                <div class="container px-5">
                    {title &&
                        (
                            <div class="mb-5">
                                <p class="text-2xl sm:text-3xl font-semibold">
                                    {title}
                                </p>
                            </div>
                        )}
                    {items &&
                        (
                            <div class="my-6">
                                <div class="overflow-x-hidden">
                                    <div id={id} class="grid grid-rows-1">
                                        <div class="col-start-1 col-span-3 row-start-1 row-span-1">
                                            <Slider class="carousel carousel-center w-full gap-[0.5rem] px-5 leading-[1] pl-0">
                                                {items.map((item, index) => (
                                                    <Slider.Item
                                                        index={index}
                                                        class="carousel-item justify-start"
                                                        key={index}
                                                    >
                                                        <a
                                                            href={item.Link}
                                                            class="flex"
                                                        >
                                                            <Image
                                                                src={item.mobile
                                                                        ?.Image
                                                                    ? item
                                                                        .mobile
                                                                        ?.Image
                                                                    : `https://placehold.co/${item.mobile?.Width}x${item.mobile?.Height}`}
                                                                alt={item.Alt ||
                                                                    "esse é um banner de uma marca tradicional"}
                                                                width={item
                                                                    .mobile
                                                                    ?.Width}
                                                                height={item
                                                                    .mobile
                                                                    ?.Height}
                                                                fetchPriority="low"
                                                                class="object-cover rounded-[20px]"
                                                            />
                                                        </a>
                                                    </Slider.Item>
                                                ))}
                                            </Slider>
                                        </div>
                                        <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center">
                                            <Slider.PrevButton class="hidden sm:flex disabled:opacity-50">
                                                <Icon
                                                    id="chevron-right"
                                                    class="rotate-180"
                                                />
                                            </Slider.PrevButton>
                                        </div>
                                        <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center">
                                            <Slider.NextButton class="hidden sm:flex disabled:opacity-50">
                                                <Icon id="chevron-right" />
                                            </Slider.NextButton>
                                        </div>
                                    </div>
                                    <Slider.JS rootId={id} />
                                </div>
                            </div>
                        )}
                </div>
            )}
        </>
    );
};
export default SeventhVariation;
