import { AnalyticsItem } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import { clx } from "../../sdk/clx.ts";
import { usePeriod } from "../../sdk/usePeriod.ts";
import { formatPrice } from "../../sdk/format.ts";
import Icon from "../ui/Icon.tsx";
import QuantitySelector from "../ui/QuantitySelector.tsx";
import { useScript } from "@deco/deco/hooks";
type AttachmentContent = {
  [key: string]: string;
};
interface Attachment {
  name: string;
  content: AttachmentContent;
}
export type Item = AnalyticsItem & {
  attachments: Attachment[];
  listPrice: number;
  image: string;
};
export interface Props {
  item: Item;
  index: number;
  locale: string;
  currency: string;
}
const QUANTITY_MAX_VALUE = 100;
const removeItemHandler = () => {
  const itemID = (event?.currentTarget as HTMLButtonElement | null)
    ?.closest("fieldset")
    ?.getAttribute("data-item-id");
  if (typeof itemID === "string") {
    window.STOREFRONT.CART.setQuantity(itemID, 0);
  }
};
function CartItem({ item, index, locale, currency }: Props) {
  const { image, listPrice, price = Infinity, quantity, attachments } = item;
  const isGift = price < 0.01;
  // deno-lint-ignore no-explicit-any
  const name = (item as any).item_name;

  return (
    <a href={item.item_url}>
      <fieldset
        // deno-lint-ignore no-explicit-any
        data-item-id={(item as any).item_id}
        class="grid grid-rows-1 gap-2 bg-white py-2 px-[10px] rounded-[10px]"
        style={{ gridTemplateColumns: "auto 1fr" }}
      >
        <Image
          alt={name}
          src={image.replace("-55-55", "-100-100")}
          width={100}
          height={100}
          class="h-full object-contain"
        />

        {/* Info */}
        <div class="flex flex-col gap-[10px] ml-[10px]">
          {/* Name and Remove button */}
          <div class="flex justify-between items-center">
            <div>
              <legend class="block text-xs text-black text-ellipsis font-bold line-clamp-2 max-h-8">
                {name}
              </legend>
              {attachments.map((attachment) => {
                if (attachment.name.indexOf("subscription") !== -1) {
                  return (
                    <div class="text-xs text-black bg-light-gray py-1/2 px-1 rounded mt-1">
                      <b>Assinatura:</b>{" "}
                      <span>
                        {usePeriod(
                          attachment.content["vtex.subscription.key.frequency"],
                        )}
                      </span>
                    </div>
                  );
                }
              })}
            </div>
            <button
              class={clx(
                isGift && "hidden",
                "btn btn-ghost btn-square no-animation",
              )}
              hx-on:click={useScript(removeItemHandler)}
            >
              <Icon id="trash" size={24} />
            </button>
          </div>

          {/* Price Block */}
          <div class="flex flex-col items-start gap-2">
            {listPrice > price &&
              (
                <span class="line-through  text-sm text-dark-gray">
                  {formatPrice(listPrice, currency, locale)}
                </span>
              )}
            <span class=" text-sm text-primary font-semibold">
              {isGift ? "Grátis" : formatPrice(price, currency, locale)}
            </span>
          </div>

          {/* Quantity Selector */}
          <QuantitySelector
            min={0}
            max={QUANTITY_MAX_VALUE}
            value={quantity}
            name={`item::${index}`}
          />
        </div>
      </fieldset>
    </a>
  );
}
export default CartItem;
