import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";
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
  return (
    <div
      id={id}
      class="flex w-full"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({ item, platformProps }),
      )}
    >
      <button
        class={clx("flex-grow cursor-pointer", _class?.toString())}
        hx-on:click={useScript(onClick)}
      >
        {!hiddenIcon && (
          <Icon id="shopping_bag" class="max-[375px]:hidden" size={21} />
        )}
        Comprar
      </button>
    </div>
  );
}
export default AddToCartButton;
