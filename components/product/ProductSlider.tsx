import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { Product } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";

interface Props {
  flags?: [internationalFlag: string, promoFlag: string, newsFlag: string, HidePriceCollection:string];
  products: Product[];
  itemListName?: string;
}

function ProductSlider({ flags, products, itemListName }: Props) {
  const id = useId();
  return (
    <>
      <div
        id={id}
        class="grid grid-rows-1 px-5 lg:px-0"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1 leading-[1]">
          <Slider class="carousel carousel-center sm:carousel-end gap-2 w-full justify-between">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item",
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
          <Slider.PrevButton class="hidden sm:flex bg-white btn-sm btn-circle no-animation relative -left-8 p-2 box-content border border-secondary items-center justify-center">
            <Icon id="chevron-right" class="rotate-180" />
          </Slider.PrevButton>
        </div>

        <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center">
          <Slider.NextButton class="hidden sm:flex bg-white btn-sm btn-circle no-animation relative -right-8 p-2 box-content border border-secondary items-center justify-center">
            <Icon id="chevron-right" />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={id} />
    </>
  );
}
export default ProductSlider;
