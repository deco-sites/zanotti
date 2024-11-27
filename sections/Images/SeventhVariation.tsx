import Image from "apps/website/components/Image.tsx";
import { SeventhVariationProps } from "./components/types/types.ts";
import { useDevice } from "@deco/deco/hooks";
const SeventhVariation = ({ title, items }: SeventhVariationProps) => {
  const device = useDevice();
  if (!items || items.length > 5) {
    return null;
  }
  return (
    <>
      {device === "desktop" && (
        <div class="container px-5">
          {title &&
            (
              <div class="mb-5">
                <p class="text-2xl sm:text-3xl font-semibold">{title}</p>
              </div>
            )}
          <div class="grid grid-cols-10 justify-center gap-4">
            <div class="col-span-4">
              <a href={items[0].Link} class="flex max-w-[650px] h-full">
                <Image
                  src={items[0].desktop?.Image ||
                    `https://placehold.co/${items[0].desktop?.Width}x${
                      items[0].desktop?.Height
                    }`}
                  alt={items[0].Alt || "Image"}
                  width={items[0].desktop?.Width}
                  height={items[0].desktop?.Height}
                  fetchPriority="low"
                  class="object-cover lg:rounded-[40px] rounded-[20px] h-full"
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
                          `https://placehold.co/${items[1].desktop?.Width}x${
                            items[1].desktop?.Height
                          }`}
                        alt={items[1].Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={items[1].desktop?.Width}
                        height={items[1].desktop?.Height}
                        fetchPriority="low"
                        class="object-cover lg:rounded-[40px] rounded-[20px] w-full"
                      />
                    </a>
                    <a href={items[2].Link} class="flex ">
                      <Image
                        src={items[2].desktop?.Image ||
                          `https://placehold.co/${items[2].desktop?.Width}x${
                            items[2].desktop?.Height
                          }`}
                        alt={items[2].Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={items[2].desktop?.Width}
                        height={items[2].desktop?.Height}
                        fetchPriority="low"
                        class="object-cover lg:rounded-[40px] rounded-[20px] w-full"
                      />
                    </a>
                    <a href={items[3].Link} class="flex ">
                      <Image
                        src={items[3].desktop?.Image ||
                          `https://placehold.co/${items[3].desktop?.Width}x${
                            items[3].desktop?.Height
                          }`}
                        alt={items[3].Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={items[3].desktop?.Width}
                        height={items[3].desktop?.Height}
                        fetchPriority="low"
                        class="object-cover lg:rounded-[40px] rounded-[20px] w-full"
                      />
                    </a>
                    <a href={items[4].Link} class="flex ">
                      <Image
                        src={items[4].desktop?.Image ||
                          `https://placehold.co/${items[4].desktop?.Width}x${
                            items[4].desktop?.Height
                          }`}
                        alt={items[4].Alt ||
                          "esse é um banner de uma marca tradicional"}
                        width={items[4].desktop?.Width}
                        height={items[4].desktop?.Height}
                        fetchPriority="low"
                        class="object-cover lg:rounded-[40px] rounded-[20px] w-full"
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
                <p class="text-2xl sm:text-3xl font-semibold">{title}</p>
              </div>
            )}
          <div class="grid grid-cols-1 gap-2 sm:gap-4 justify-center md:grid-cols-2">
            <div class="col-span-1">
              <a href={items[0].Link} class="flex justify-center  sm:h-[100%]">
                <Image
                  src={items[0].mobile?.Image ||
                    `https://placehold.co/${items[0].mobile?.Width}x${
                      items[0].mobile?.Height
                    }`}
                  alt={items[0].Alt || "Image"}
                  width={items[0].mobile?.Width}
                  height={items[0].mobile?.Height}
                  fetchPriority="low"
                  class="object-cover lg:rounded-[40px] rounded-[20px] sm:h-[100%]"
                />
              </a>
            </div>
            <div class="col-span-1 grid grid-cols-2 gap-2 sm:gap-4">
              {items.slice(1, 5).map((item, index) => (
                <a href={item.Link} class="flex justify-center" key={index}>
                  <Image
                    src={item.mobile?.Image ||
                      `https://placehold.co/${item.mobile?.Width}x${item.mobile?.Height}`}
                    alt={item.Alt ||
                      "esse é um banner de uma marca tradicional"}
                    width={item.mobile?.Width}
                    height={item.mobile?.Height}
                    fetchPriority="low"
                    class="object-cover lg:rounded-[40px] rounded-[20px]"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default SeventhVariation;
