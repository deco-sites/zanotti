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

export const loader = (
  props: Props,
  req: Request,
  ctx: AppContext,
) => {
  const {
    newsFlag = "",
    promoFlag = "",
    internationalFlag = "",
  } = ctx;

  return { ...props, internationalFlag, promoFlag, newsFlag };
};

export default function ProductShelf({
  internationalFlag,
  promoFlag,
  newsFlag,
  products,
  title,
  cta,
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
      <Section.Container
        {...viewItemListEvent}
      >
        <div class="flex flex-wrap items-center gap-x-10 gap-y-[0.5rem] px-[18px] lg:px-[25px]">
          <Section.Header title={title} />
        </div>
        <ProductSlider
          flags={[internationalFlag, promoFlag, newsFlag]}
          products={products}
          itemListName={title}
        />
      </Section.Container>
    </div>
  );
}
