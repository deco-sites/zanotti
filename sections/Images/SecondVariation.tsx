import Image from "apps/website/components/Image.tsx";
import { SecondVariationProps } from "./components/types/types.ts";
import { useDevice } from "@deco/deco/hooks";
const SecondVariation = ({ title, items }: SecondVariationProps) => {
  const device = useDevice();
  return (
    <div>
      <>
        {device === "desktop" && (
          <div class="container px-5">
            <div>
              {title && <p class="text-3xl font-semibold">{title}</p>}
            </div>
            <div class="flex flex-wrap md:grid grid-cols-12 gap-[0.5rem] lg:gap-4">
              {items?.map((item, index) => (
                <a
                  href={item.Link}
                  class={`flex col-span-${12 / items.length}`}
                  key={index}
                >
                  <Image
                    src={item.desktop?.Image
                      ? item.desktop?.Image
                      : `https://placehold.co/${item?.desktop?.Width}x${item?.desktop?.Height}`}
                    alt={item?.Alt ||
                      "esse é um banner de uma marca tradicional"}
                    width={item?.desktop?.Width}
                    height={item?.desktop?.Height}
                    fetchPriority="low"
                    class="object-cover rounded-[40px] w-full"
                  />
                </a>
              ))}
            </div>
          </div>
        )}
        {device === "mobile" && (
          <div class="container px-5">
            {title &&
              (
                <div>
                  <p class="text-base font-semibold">{title}</p>
                </div>
              )}
            {items &&
              (
                <div class={`flex gap-2 justify-center flex-wrap`}>
                  {items.map((item, index) => (
                    <a href={item.Link} class={`flex w-full`} key={index}>
                      <Image
                        src={item.mobile?.Image
                          ? item.mobile?.Image
                          : `https://placehold.co/${item.mobile?.Width}x${item.mobile?.Height}`}
                        alt={item.Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={item.mobile?.Width}
                        height={item.mobile?.Height}
                        fetchPriority="low"
                        class="object-cover rounded-[20px] w-full"
                      />
                    </a>
                  ))}
                </div>
              )}
          </div>
        )}
      </>
    </div>
  );
};
export default SecondVariation;
