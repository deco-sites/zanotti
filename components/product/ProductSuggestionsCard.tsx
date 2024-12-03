import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import type { Product } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

interface Props {
  product: Product;
  index: number;
}

const WIDTH = 130;
const HEIGHT = 130;
const ASPECT_RATIO = `1/1`;

function ProductSuggestionsCard({
  product,
  index,
}: Props) {
  const { url, image: images, offers, isVariantOf } = product;
  const title = isVariantOf?.name ?? product.name;
  const [front] = images ?? [];

  const { listPrice, price, seller = "1", availability, installment } =
    useOffer(offers);
  const inStock = availability === "https://schema.org/InStock";
  const relativeUrl = relative(url);

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  {/* Add click event to dataLayer */}
  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: "product-suggestions",
        items: [item],
      },
    },
  });

  return (
    <div
      {...event}
      class="grid grid-cols-3 items-center gap-4 bg-white px-3 py-2 lg:p-0 rounded-lg"
    >
      <div class="col-span-1">
        <a href={relativeUrl} aria-label="view product">
          <Image
            src={front.url!}
            alt={front.alternateName}
            class="lg:w-full"
            width={WIDTH}
            height={HEIGHT}
            preload={true}
            loading="eager"
            decoding="async"
          />
        </a>
      </div>
      <div class="col-span-2">
        <a href={relativeUrl}>
          <p class="text-ellipsis line-clamp-2 h-8 lg:h-10 overflow-hidden text-xs lg:text-sm">
            {title}
          </p>
          {inStock
            ? (
              <div class="flex flex-col pt-2">
                {listPrice && (
                  <span class="line-through font-normal text-middle-gray text-xs lg:text-sm">
                    {formatPrice(listPrice, offers?.priceCurrency)}
                  </span>
                )}
                <span class="font-semibold text-base lg:text-xl text-primary">
                  {formatPrice(installment?.price)}{" "}
                  <span class="text-primary font-normal text-xs lg:text-base">
                    no pix
                  </span>
                </span>
                <span class="text-middle-gray text-xs lg:text-sm">
                  ou {installment?.billingDuration}x de {formatPrice(
                    installment?.billingIncrement,
                    offers!.priceCurrency!,
                  )}
                </span>
              </div>
            )
            : (
              <p class="font-semibold text-middle-gray text-xs lg:text-sm">
                Produto Indisponível
              </p>
            )}
        </a>
      </div>
    </div>
  );
}

export default ProductSuggestionsCard;
