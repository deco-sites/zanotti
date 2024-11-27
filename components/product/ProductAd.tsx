import { useOffer } from "../../sdk/useOffer.ts";
import { formatPrice } from "../../sdk/format.ts";
import Image from "apps/website/components/Image.tsx";
import type { AppContext } from "../../apps/site.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";
import { type SectionProps } from "@deco/deco";
export interface Like {
  product: number;
  comments: string[];
}
export interface Props {
  product: ProductDetailsPage | null;
}
export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  const { product } = props;
  if (!product) {
    return props;
  }
  if (!product?.product) {
    return props;
  }
  return { ...props, isMobile: ctx.device !== "desktop" };
};
export default function ProductAd({
  product,
}: SectionProps<typeof loader>) {
  if (!product) {
    return null;
  }
  if (!product?.product) {
    return null;
  }
  const {
    pix,
    listPrice,
    installment,
  } = useOffer(product?.product?.offers);
  const {
    product: currentProduct,
  } = product;
  const {
    isVariantOf,
  } = currentProduct;
  const { url, brand, image: images = [], offers } = currentProduct;
  const title = isVariantOf?.name ?? currentProduct.name;
  const image = images && images[0]?.url;
  return (
    <div class="container p-3 lg:py-0 sm:px-0 flex flex-col lg:flex-row">
      <div class={`gap-3 rounded-xl flex`}>
        <a href={url} class="block overflow-hidden rounded-xl">
          <Image
            class="object-cover"
            src={image || ""}
            alt={title}
            width={250}
            height={250}
            preload={true}
            loading="lazy"
            fetchPriority="low"
            style={{ transition: "all .3s ease" }}
          />
        </a>
      </div>
      <div class="flex flex-col items-start justify-center p-3 lg:px-8 lg:py-3">
        <p class="mb-2 text-middle-gray text-sm uppercase">
          {brand?.name}
        </p>
        <p class="text-base leading-6 font-normal text-black max-w-[252px]">
          {title}
        </p>
        <div class="flex items-start lg:items-center mt-2 flex-col lg:flex-row lg:gap-1.5">
          <p class="text-sm text-dark-gray line-through">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </p>
          <p class="font-semibold sm:text-right text-xl lg:text-xl text-primary">
            {formatPrice(pix, offers?.priceCurrency)}
          </p>
        </div>
        <div class="text-dark-gray text-sm">
          ou {installment?.billingDuration}x de {formatPrice(
            installment?.billingIncrement,
            offers!.priceCurrency!,
          )}
        </div>
      </div>
    </div>
  );
}
