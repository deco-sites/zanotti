import Image from "apps/website/components/Image.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";

import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { Product, PropertyValue } from "apps/commerce/types.ts";
import MinicartAdd from "./MinicartAdd.tsx";
import Price from "./Price.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;

  /** @description used for analytics event */
  itemListName?: string;

  /** @description index of the product card in the list */
  index?: number;

  class?: string;
  superPromo?: number;
  pixDiscount?: number;
  blackFriday?: number;
  hiddenFlags?: boolean;
  productGroupID?: string;
  hiddenAddToCartButton?: boolean;
}

const WIDTH = 178;
const HEIGHT = 194;

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
  product,
  preload,
  pixDiscount = 0,
  itemListName,
  index,
  class: _class,
  hiddenFlags = false,
  hiddenAddToCartButton = true,
  superPromo = 0,
  blackFriday = 0,
}: Props) {
  const { url, image: images, offers, isVariantOf, additionalProperty } =
    product;

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

  const isPriceHidden = additionalProperty?.some((prop) =>
    prop.propertyID === "200"
  );

  const isSuperPromo = additionalProperty?.some((prop) =>
    prop.propertyID === superPromo.toString()
  );

  const isBlackFriday = additionalProperty?.some((prop) =>
    prop.propertyID === blackFriday.toString()
  );

  const message = encodeURIComponent(
    `Olá, estou interessado nesse produto: ${title}`,
  );

  return (
    <div
      {...event}
      class="card flex flex-col card-compact group text-sm bg-white p-3 bg-base max-w-[220px] h-full justify-between"
    >
      <div class="flex items-start justify-between">
        <div class="flex flex-wrap gap-[5px]">
          {percent > 1 && inStock && !hiddenFlags
            ? (
              <span class="text-xs font-semibold text-white uppercase bg-primary text-center text-white px-2 py-1 rounded-full family-secondary">
                {percent}% off
              </span>
            )
            : null}
          {isBlackFriday && <p class="flag-bf uppercase">
            Black Friday
          </p>}
          {isSuperPromo && <p class="flag-superpromo uppercase">
            super promo
          </p>}
        </div>
        <WishlistButton item={item} variant="icon" />
      </div>

      <a
        href={relativeUrl}
        aria-label="view product flex"
      >
        <Image
          class="aspect-square mx-auto"
          src={front.url!}
          alt={front.alternateName}
          width={WIDTH}
          height={HEIGHT}
          preload={preload}
          loading={preload ? "eager" : "lazy"}
          decoding="async"
        />
      </a>
      <div>
        <a href={relativeUrl} class="flex flex-col gap-2">
          <p class="font-semibold family-secondary text-sm text-ellipsis font-bold line-clamp-2 h-10 leading-5">
            {title}
          </p>
          {isPriceHidden
            ? (
              <a
                href={`https://wa.me/11987939455?text=${message}`}
                class="flex items-center justify-center gap-3 mt-2 bg-primary border-0 text-white py-2 text-center font-semibold rounded-full"
              >
                Consultar Preço
              </a>
            )
            : (
              <Price
                type="shelf"
                pixDiscount={pixDiscount}
                product={product}
              />
            )}
        </a>
        {!isPriceHidden && !hiddenAddToCartButton && inStock &&
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
