// deno-lint-ignore-file
import type { Product } from "apps/commerce/types.ts";
import type { AppContext } from "../../apps/site.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";
import _ProductAd from "./ProductAd.tsx";
import { usePartialSection } from "@deco/deco/hooks";
import { type SectionProps } from "@deco/deco";
export interface Props {
  products: Product[] | null;
  /**
   * @ignore
   */
  activeIndex: number;
  message: string;
  image: ImageWidget;
}
export async function loader(props: Props, req: Request, ctx: AppContext) {
  const { products = [] } = props;
  if (!products || products.length === 0) {
    return { ...props };
  }
  return { ...props };
}
export default function ProductAds({
  products,
  activeIndex = 0,
  message =
    "Lorem ipsum dolor sit amet consectetur adipiscing elit sed euismod tincidunt dapibus",
  image =
    "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
  likes,
}: SectionProps<typeof loader>) {
  const currentProductLikes = likes[activeIndex] || {};
  if (!products || products.length === 0) {
    return null;
  }
  return (
    <>
      <div class="container px-3 sm:px-0 flex align-start gap-3">
        <div class="flex flex-col items-center justify-start gap-2">
          <div class="avatar">
            <div class="w-24 rounded-full">
              <img src={image} />
            </div>
          </div>
          <button
            class="flex bg-sky-500 text-white grow-0 rounded hover:bg-sky-400 text-nowrap px-3 py-2 h-auto"
            {...usePartialSection<typeof ProductAds>({
              props: {
                activeIndex: activeIndex + 1 >= products.length
                  ? 0
                  : activeIndex + 1,
              },
            })}
          >
            Next
          </button>
        </div>
        <div class="bg-gray-100 p-3 rounded">{message}</div>
      </div>
    </>
  );
}
