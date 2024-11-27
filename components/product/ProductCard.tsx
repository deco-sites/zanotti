import Image from "apps/website/components/Image.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";

import { clx } from "../../sdk/clx.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { Product, PropertyValue } from "apps/commerce/types.ts";
import MinicartAdd from "./MinicartAdd.tsx";
import Price from "./Price.tsx";

interface Props {
  flags?: [internationalFlag: string, promoFlag: string, newsFlag: string];
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
  hiddenFlags?: boolean;
  productGroupID?: string;
  hiddenAddToCartButton?: boolean;
}

const WIDTH = 270;
const HEIGHT = 225;

export const getFlagCluster = (
  flag: string,
  additionalProperty?: PropertyValue[],
) => {
  return additionalProperty?.find((prop) => {
    if (prop.name === "cluster") {
      return prop.propertyID === flag;
    }
  });
};

function ProductCard({
  flags,
  product,
  preload,
  itemListName,
  index,
  class: _class,
  hiddenFlags = false,
  hiddenAddToCartButton = true,
}: Props) {
  const [
    internationalFlag = "",
    promoFlag = "",
    newsFlag = "",
  ] = flags ?? [];

  const { url, image: images, offers, isVariantOf, brand, additionalProperty } =
    product;

  const productGroupID = isVariantOf?.productGroupID ?? "";
  const title = isVariantOf?.name ?? product.name;
  const [front] = images ?? [];

  const { listPrice = 0, price = 0, seller = "1", availability } = useOffer(
    offers,
  );
  const inStock = availability === "https://schema.org/InStock";
  const relativeUrl = relative(url);
  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  const hasInternationalFlag = getFlagCluster(
    internationalFlag,
    additionalProperty,
  );
  const hasPromoFlag = getFlagCluster(promoFlag, additionalProperty);
  const hasNewsFlag = getFlagCluster(newsFlag, additionalProperty);

  return (
    <div
      {...event}
      class={clx(
        "card flex flex-col justify-start card-compact group text-sm bg-white p-0",
        _class,
      )}
    >
      <div class="flex items-start justify-between">
        <div class="flex flex-wrap gap-[5px]">
          {percent > 1 && inStock && !hiddenFlags
            ? (
              <span class="text-xs font-semibold text-white uppercase bg-primary text-center text-white px-2 py-1 rounded-[6px]">
                {percent}% off
              </span>
            )
            : null}
          {hasNewsFlag && !hiddenFlags && (
            <span
              class={clx(
                "text-xs font-semibold text-white uppercase bg-[#FFA318] text-center text-white px-2 py-1 rounded-[6px]",
              )}
            >
              Novidade
            </span>
          )}
          {hasPromoFlag && !hiddenFlags && (
            <span
              class={clx(
                "text-xs font-semibold text-white uppercase bg-[#F22E2E] text-center text-white px-2 py-1 rounded-[6px]",
              )}
            >
              Promoção
            </span>
          )}
        </div>
        <WishlistButton item={item} variant="icon" />
      </div>
      <figure
        class="relative overflow-hidden rounded-none"
        style={{ aspectRatio: `${WIDTH} / ${HEIGHT}` }}
      >
        <a
          href={relativeUrl}
          aria-label="view product"
        >
          <Image
            src={front.url!}
            alt={front.alternateName}
            width={WIDTH}
            height={HEIGHT}
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
        </a>
      </figure>
      <div>
        <a href={relativeUrl} class="flex flex-col gap-2">
          <div class="flex flex-col gap-1">
            {hasInternationalFlag && (
              <p class="px-1 sm:px-6 py-1 flex items-center justify-center bg-black text-white font-semibold text-[10px] sm:text-xs">
                Compra Internacional
              </p>
            )}
          </div>
          {brand?.name && inStock && (
            <p class="text-sm text-middle-gray capitalize">{brand?.name}</p>
          )}
          <p class="font-normal text-sm text-ellipsis font-bold line-clamp-2 h-10">
            {title}
          </p>
          <Price type="shelf" product={product} />
        </a>
        <div
          class="mt-2"
          data-trustvox-product-code={productGroupID}
        />
        {!hiddenAddToCartButton && inStock &&
          (
            <MinicartAdd
              product={product}
              seller={seller}
              class="flex items-center justify-center gap-3 mt-2 bg-primary border-0 text-white py-2 text-center font-semibold rounded-full"
              item={item}
            />
          )}
      </div>
    </div>
  );
}

export default ProductCard;
