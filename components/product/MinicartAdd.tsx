import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";
import { useScript } from "@deco/deco/hooks";
export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
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
  const { product, item, class: _class } = props;
  return (
    <div
      id={id}
      class="flex"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({ item, platformProps }),
      )}
    >
      <button
        class={clx("flex-grow cursor-pointer", _class?.toString())}
        hx-on:click={useScript(onClick)}
      >
        <Icon id="shopping_bag" size={21} />
        COMPRAR
      </button>
    </div>
  );
}
export default AddToCartButton;
