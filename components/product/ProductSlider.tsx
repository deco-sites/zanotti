import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { Product } from "apps/commerce/types.ts";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import ProductCard from "./ProductCard.tsx";
import { ProductFlag } from "../../apps/site.ts";

interface Props {
  productFlags: ProductFlag[];
  products: Product[];
  pixDiscount?: number;
  itemListName?: string;
}

function ProductSlider({ products, itemListName, pixDiscount, productFlags }: Props) {
  const id = useId();
  return (
    <>
      <div
        id={id}
        class="grid grid-rows-1"
        style={{
          gridTemplateColumns: "min-content 1fr min-content",
        }}
      >
        <div class="col-start-1 col-span-3 row-start-1 row-span-1 leading-[1]">
          <Slider class="carousel carousel-center sm:carousel-end gap-2 w-full justify-start">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={clx(
                  "carousel-item first:ml-5 last:mr-5 lg:!m-0",
                )}
              >
                <ProductCard
                  productFlags={productFlags}
                  index={index}
                  product={product}
                  pixDiscount={pixDiscount}
                  itemListName={itemListName}
                  class="w-[287px] sm:w-[300px]"
                />
              </Slider.Item>
            ))}
          </Slider>
        </div>

        <div class="col-start-1 col-span-1 row-start-1 row-span-1 z-10 self-center">
          <Slider.PrevButton class="hidden sm:flex bg-white btn-sm btn-circle no-animation relative -left-7 p-2 box-content border border-light-gray items-center justify-center disabled:hidden">
            <Icon id="chevron-right" class="rotate-180" />
          </Slider.PrevButton>
        </div>

        <div class="col-start-3 col-span-1 row-start-1 row-span-1 z-10 self-center">
          <Slider.NextButton class="hidden sm:flex bg-white btn-sm btn-circle no-animation relative -right-7 p-2 box-content border border-light-gray items-center justify-center disabled:hidden">
            <Icon id="chevron-right" />
          </Slider.NextButton>
        </div>
      </div>
      <Slider.JS rootId={id} />
    </>
  );
}
export default ProductSlider;
