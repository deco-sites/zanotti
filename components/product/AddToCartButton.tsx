import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { omit } from "../../sdk/useVariantPossiblities.ts";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
import Icon from "../../components/ui/Icon.tsx";
export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  hiddenIcon?: boolean;
  product: Product;
  seller: string;
  item: AnalyticsItem;
}
const onClick = () => {
  event?.stopPropagation();
  const button = event?.currentTarget as HTMLButtonElement | null;
  const container = button!.closest<HTMLDivElement>("div[data-cart-item]")!;
  const { item, platformProps } = JSON.parse(
    decodeURIComponent(container.getAttribute("data-cart-item")!),
  );
  window.STOREFRONT.CART.addToCart(item, platformProps);
  setTimeout(() => {
    const minicartDrawer = document.querySelector("label[for=minicart-drawer]");
    if (minicartDrawer) {
      // @ts-ignore click is correct
      minicartDrawer.click();
    }
    const modal = document.querySelector("#add_to_cart_modal form > button");
    if (modal) {
      // @ts-ignore click is correct
      modal.click();
    }
  }, 500);
};
const useAddToCart = ({ product, seller }: Props) => {
  const { productID } = product;
  return {
    allowedOutdatedData: ["paymentData"],
    orderItems: [{ quantity: 1, seller: seller, id: productID }],
  };
};
function AddToCartButton(props: Props) {
  const id = useId();
  const platformProps = useAddToCart(props);
  const { product, item, class: _class, hiddenIcon = false } = props;

  console.log("item", item);
  console.log("product", product);
// @ts-ignore item_id exists
  const { item_id: itemId } = item;
  const { isVariantOf } = product;
  const  selectedVariant = isVariantOf?.hasVariant.find((v) => v.productID === itemId) || {};

  if (!selectedVariant) return null;

  const { additionalProperty = [] } = selectedVariant;
  const specs = additionalProperty.filter(({ name }) => {
    return !omit.has(name!);
  });

  console.log("specs", specs);

  if (Object.keys(specs).length === 0) {
    return null;
  }

  return (
    <>
      <button 
        class={clx("flex-grow cursor-pointer", _class?.toString())}
        hx-on:click={
          useScript(() => {
            // @ts-ignore showModal exists
            document.querySelector("#add_to_cart_modal")?.showModal()
          })
        }
      >
        {!hiddenIcon && (
          <Icon id="shopping_bag" class="max-[375px]:hidden" size={21} />
        )}
        Comprar
      </button>
      <dialog id="add_to_cart_modal" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          <div
            id={id}
            class="flex flex-col w-full gap-2"
            data-item-id={product.productID}
            data-cart-item={encodeURIComponent(
              JSON.stringify({ item, platformProps }),
            )}
          >
            {specs.map((spec) => {
              return (
                <div class="flex items-center flex-col gap-2">
                  <span class="block">A <b>{spec.name}</b> escolhida foi:</span>
                  <span class="p-3 rounded-full text-xs font-bold w-max bg-primary text-white w-full flex">{spec.value}</span>
                </div>
              )
            })}
            <button
              class="flex-grow cursor-pointer bg-signature-green text-base flex justify-center items-center gap-2 py-2 rounded-full no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
              hx-on:click={useScript(onClick)}
            >
              Sim, continuar
            </button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
export default AddToCartButton;
