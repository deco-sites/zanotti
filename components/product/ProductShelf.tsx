import ProductSlider from "./ProductSlider.tsx";
import Section, { Props as SectionHeaderProps } from "../ui/Section.tsx";

import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import type { Product } from "apps/commerce/types.ts";
import type { AppContext } from "../../apps/site.ts";
import type { SectionProps } from "@deco/deco";

export interface Props extends SectionHeaderProps {
  products: Product[] | null;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  const { pixDiscount = 0, productFlags = [] } = ctx;
  return { ...props, pixDiscount, productFlags };
};

export default function ProductShelf({
  pixDiscount,
  products,
  title,
  productFlags,
}: SectionProps<typeof loader>) {
  const id = useId();
  if (!products || products.length === 0) {
    return null;
  }

  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        item_list_name: title,
        items: products.map((product, index) =>
          mapProductToAnalyticsItem({
            index,
            product,
            ...(useOffer(product.offers)),
          })
        ),
      },
    },
  });

  return (
    <div id={id}>
      <div
        class="lg:container"
        {...viewItemListEvent}
      >
        <div class="px-5 lg:px-0 mb-3">
          <Section.Header title={title} />
        </div>
        <ProductSlider
          productFlags={productFlags}
          products={products}
          pixDiscount={pixDiscount}
          itemListName={title}
        />
      </div>
    </div>
  );
}
