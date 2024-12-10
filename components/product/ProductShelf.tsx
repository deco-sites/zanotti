import ProductSlider from "./ProductSlider.tsx";
import Section, { Props as SectionHeaderProps } from "../ui/Section.tsx";

import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";

import type { Product } from "apps/commerce/types.ts";

export interface Props extends SectionHeaderProps {
  products: Product[] | null;
}

export default function ProductShelf({
  products,
  title,
}: Props) {
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
          products={products}
          itemListName={title}
        />
      </div>
    </div>
  );
}
