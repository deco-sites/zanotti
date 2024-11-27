import { useOffer } from "../../sdk/useOffer.ts";
import { Product } from "apps/commerce/types.ts";
import { formatPrice } from "../../sdk/format.ts";

interface Props {
  type?: "shelf" | "details" | "fixed";
  product: Product;
  isMobile?: boolean;
}

export default function Price({
  type = "details",
  product,
  isMobile = false,
}: Props) {
  const { offers } = product;
  const { pix, listPrice = 0, price = 0, availability, installment } = useOffer(
    offers,
  );
  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;
  const hasPixDiscount = pix > 0 && pix < price;

  if (type === "shelf") {
    return (
      <>
        {availability === "https://schema.org/InStock"
          ? (
            <div class="flex flex-col">
              {listPrice > price &&
                (
                  <span class="line-through font-normal text-dark-gray text-xs">
                    {formatPrice(
                      listPrice,
                      offers?.priceCurrency,
                    )}
                  </span>
                )}
              <span class="font-semibold text-xl text-primary">
                {hasPixDiscount
                  ? formatPrice(pix, offers?.priceCurrency)
                  : formatPrice(price, offers?.priceCurrency)}{" "}
                {hasPixDiscount &&
                  (
                    <span class="text-primary font-normal text-base">
                      no pix
                    </span>
                  )}
              </span>
              <span class="text-dark-gray text-xs">
                ou {installment?.billingDuration}x de {formatPrice(
                  installment?.billingIncrement,
                  offers!.priceCurrency!,
                )}
              </span>
            </div>
          )
          : (
            <p class="text-left font-semibold">
              Produto Indisponível
            </p>
          )}
      </>
    );
  }

  if (type === "details") {
    if (isMobile) {
      return (
        <div class="flex flex-col gap-2">
          <div class="flex gap-1 items-center">
            {listPrice > price &&
              (
                <span class="line-through text-base text-dark-gray leading-[1]">
                  {formatPrice(
                    listPrice,
                    offers?.priceCurrency,
                  )}
                </span>
              )}
            <span class="text-[20px] font-semibold text-black leading-[1]">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>
          {hasPixDiscount &&
            (
              <div class="flex flex-col items-start">
                <p class="text-[40px] font-semibold text-primary leading-[1]">
                  {formatPrice(pix)}
                  <span class="text-primary font-normal text-[30px] ml-2 leading-[1]">
                    no PIX
                  </span>
                </p>
              </div>
            )}
          {percent >= 1 && (
            <div class="text-xs font-semibold text-white uppercase bg-primary text-center text-white px-2 py-1 rounded-[6px] w-fit">
              {percent} % off
            </div>
          )}
          <p
            class={`${
              price === pix
                ? "font-semibold text-primary text-xl"
                : "text-black text-base"
            } leading-[1]`}
          >
            ou {installment?.billingDuration}x de {formatPrice(
              installment?.billingIncrement,
              offers!.priceCurrency!,
            )}
          </p>
        </div>
      );
    } else {
      return (
        <div class="flex flex-col gap-2">
          <div class="flex gap-2 items-center">
            {listPrice > price &&
              (
                <span class="line-through text-base text-dark-gray leading-[1]">
                  {formatPrice(
                    listPrice,
                    offers?.priceCurrency,
                  )}
                </span>
              )}
            <span class="text-xl font-semibold text-black leading-[1]">
              {formatPrice(price, offers?.priceCurrency)}
            </span>
          </div>
          {hasPixDiscount &&
            (
              <div class="flex items-center">
                <p class="text-[40px] font-semibold text-primary leading-[1]">
                  {formatPrice(pix, offers?.priceCurrency)}
                  <span class="text-primary font-normal text-[30px] ml-2 leading-[1]">
                    no PIX
                  </span>
                </p>
                {percent >= 1 && (
                  <span class="ml-3 text-xs font-semibold text-white uppercase bg-primary text-center text-white px-2 py-1 rounded-[6px] w-fit">
                    {percent} % off
                  </span>
                )}
              </div>
            )}
          <div>
            <p
              class={`${
                hasPixDiscount
                  ? "text-black text-base"
                  : "font-semibold text-primary text-xl"
              }`}
            >
              ou {installment?.billingDuration}x de {formatPrice(
                installment?.billingIncrement,
                offers!.priceCurrency!,
              )}
            </p>
          </div>
        </div>
      );
    }
  }

  if (type === "fixed") {
    if (isMobile) {
      return (
        <div class="flex flex-col flex-grow">
          <div class="flex flex-col items-start">
            {hasPixDiscount
              ? (
                <p class="text-lg font-semibold text-primary text-nowrap">
                  {formatPrice(pix, offers?.priceCurrency)}
                  <span class="text-primary font-normal text-xs ml-2">
                    no PIX
                  </span>
                </p>
              )
              : (
                <p class="text-lg font-semibold text-black text-nowrap">
                  {formatPrice(price, offers?.priceCurrency)}
                </p>
              )}
          </div>
          <p
            class={`${
              price === pix
                ? "font-semibold text-primary text-lg max-[390px]:text-base"
                : "text-black text-xs"
            } leading-[1] text-nowrap`}
          >
            ou {installment?.billingDuration}x de {formatPrice(
              installment?.billingIncrement,
              offers!.priceCurrency!,
            )}
          </p>
        </div>
      );
    } else {
      return (
        <div class="flex flex-col col-span-2">
          <div class="flex flex-col items-start">
            {hasPixDiscount
              ? (
                <p class="text-2xl font-semibold text-primary">
                  {formatPrice(pix, offers?.priceCurrency)}
                  <span class="text-primary font-normal text-xl ml-2">
                    no PIX
                  </span>
                </p>
              )
              : (
                <p class="text-xl font-semibold text-black">
                  {formatPrice(price, offers?.priceCurrency)}
                </p>
              )}
          </div>
          <p
            class={`${
              price === pix
                ? "font-semibold text-primary text-xl"
                : "text-black text-base"
            } leading-[1]`}
          >
            ou {installment?.billingDuration}x de {formatPrice(
              installment?.billingIncrement,
              offers!.priceCurrency!,
            )}
          </p>
        </div>
      );
    }
  }

  return null;
}
