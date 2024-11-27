import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { Product } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";

interface Props {
  flags?: [internationalFlag: string, promoFlag: string, newsFlag: string];
  products: Product[];
  itemListName?: string;
}

function ProductSlider({ flags, products, itemListName }: Props) {
  const id = useId();
  return (
    <>
      <div
        id={id}
        class="grid grid-rows-1 px-0 sm:px-5"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1 leading-[1]">
          <Slider class="carousel carousel-center sm:carousel-end gap-[0.5rem] lg:gap-5 w-full">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
                  "first:pl-5 first:sm:pl-0",
                  "last:pr-5 last:sm:pr-0",
                )}
              >
                <ProductCard
                  flags={flags}
                  index={index}
                  product={product}
                  itemListName={itemListName}
                  class="w-[287px] sm:w-[300px]"
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center">
          <Slider.PrevButton class="hidden sm:flex disabled:hidden btn btn-neutral btn-sm btn-circle no-animation relative -left-4">
            <Icon id="chevron-right" class="rotate-180" />
          </Slider.PrevButton>
        </div>

        <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center">
          <Slider.NextButton class="hidden sm:flex disabled:hidden btn btn-neutral btn-sm btn-circle no-animation relative -right-4">
            <Icon id="chevron-right" />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={id} />
    </>
  );
}
export default ProductSlider;
