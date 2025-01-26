import { AnalyticsItem, Product } from "apps/commerce/types.ts";
import { JSX } from "preact";
import { useState } from "preact/hooks";
import { useId } from "../../sdk/useId.ts";
import Icon from "../../components/ui/Icon.tsx";

export interface Props extends JSX.HTMLAttributes<HTMLButtonElement> {
  product: Product;
  seller: string;
  item: AnalyticsItem;
}

function showToast(message: string) {
  const toast = document.createElement("div");
  toast.className =
    "alert shadow-lg fixed bottom-4 left-4 w-fit z-50";
  toast.textContent = message;

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 7000); 
}

function AddToCartButton(props: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const id = useId();
  const { product, item, class: _class, seller } = props;

  const onClick = (event: MouseEvent) => {
    if (!event) return;

    event.stopPropagation();
    setIsClicked(true); 

    const button = event.currentTarget as HTMLButtonElement | null;
    const container = button?.closest<HTMLDivElement>("div[data-cart-item]")!;
    const { item, platformProps } = JSON.parse(
      decodeURIComponent(container.getAttribute("data-cart-item")!),
    );

    window.STOREFRONT.CART.addToCart(item, platformProps);


    showToast("Produto adicionado ao carrinho!");

    setTimeout(() => {
      setIsClicked(false);
    }, 200);
  };

  return (
    <div
      id={id}
      class="flex"
      data-item-id={product.productID}
      data-cart-item={encodeURIComponent(
        JSON.stringify({
          item,
          platformProps: {
            allowedOutdatedData: ["paymentData"],
            orderItems: [{ quantity: 1, seller: seller, id: product.productID }],
          },
        }),
      )}
    >
      <button
        class={`flex-grow cursor-pointer flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition transform active:scale-95 ${
          isClicked ? "scale-98" : ""
        } ${_class}`}
        onClick={(event) => onClick(event)}
      >
        <Icon id="shopping_bag" size={21} />
        COMPRAR
      </button>
    </div>
  );
}

export default AddToCartButton;
