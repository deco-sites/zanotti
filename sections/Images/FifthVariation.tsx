import { FifthVariationProps } from "./components/types/types.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import { useId } from "../../sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { useDevice } from "@deco/deco/hooks";
const FifthVariation = ({ slide, title }: FifthVariationProps) => {
  const device = useDevice();
  const id = useId();
  return (
    <>
      {device === "desktop" && (
        <div class="overflow-x-hidden container px-5">
          {title &&
            (
              <div>
                <p class="text-base font-semibold">{title}</p>
              </div>
            )}
          {slide &&
            (
              <div id={id} class="grid grid-rows-1">
                <div class="col-start-1 col-span-3 row-start-1 row-span-1">
                  <Slider class="carousel carousel-center w-full gap-6 leading-[1]">
                    {slide?.map((item, index) => (
                      <Slider.Item
                        index={index}
                        class="carousel-item w-full justify-center"
                        key={index}
                      >
                        <a href={item.Link} class="flex w-full">
                          <Image
                            src={item.desktop?.Image
                              ? item.desktop?.Image
                              : `https://placehold.co/${item.desktop?.Width}x${item.desktop?.Height}`}
                            alt={item.Alt ||
                              "esse é um banner de uma marca tradicional"}
                            width={item.desktop?.Width}
                            height={item.desktop?.Height}
                            fetchPriority="low"
                            class="object-cover lg:rounded-[40px] rounded-[20px] w-full"
                          />
                        </a>
                      </Slider.Item>
                    ))}
                  </Slider>
                </div>
                <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center">
                  <Slider.PrevButton class="hidden sm:flex disabled:opacity-50">
                    <Icon id="chevron-right" class="rotate-180" />
                  </Slider.PrevButton>
                </div>
                <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center">
                  <Slider.NextButton class="hidden sm:flex disabled:opacity-50">
                    <Icon id="chevron-right" />
                  </Slider.NextButton>
                </div>
              </div>
            )}
          <Slider.JS rootId={id} />
        </div>
      )}
      {device === "mobile" && (
        <div>
          <div id={id} class="grid grid-rows-1">
            <div class="col-start-1 col-span-3 row-start-1 row-span-1">
              <Slider class="carousel carousel-center w-full gap-2 sm:gap-6 leading-[1]">
                {slide?.map((item, index) => (
                  <Slider.Item
                    index={index}
                    class="carousel-item justify-center first:pl-5 last:pr-5"
                    key={index}
                  >
                    <a href={item.Link} class="flex ">
                      <Image
                        src={item.mobile?.Image
                          ? item.mobile?.Image
                          : `https://placehold.co/${item.mobile?.Width}x${item.mobile?.Height}`}
                        alt={item.Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={item.mobile?.Width}
                        height={item.mobile?.Height}
                        fetchPriority="low"
                        class="object-cover rounded-[20px] "
                      />
                    </a>
                  </Slider.Item>
                ))}
              </Slider>
            </div>
            {
              /* <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center">
                          <Slider.PrevButton class="hidden disabled:opacity-50">
                              <Icon id="chevron-right" class="rotate-180" />
                          </Slider.PrevButton>
                      </div>
                      <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center">
                          <Slider.NextButton class="hidden disabled:opacity-50">
                              <Icon id="chevron-right" />
                          </Slider.NextButton>
                      </div> */
            }
          </div>
          <Slider.JS rootId={id} />
        </div>
      )}
    </>
  );
};
export default FifthVariation;
