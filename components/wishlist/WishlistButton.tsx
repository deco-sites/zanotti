import { useEffect, useState } from "preact/hooks";
import { AnalyticsItem } from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Icon from "../ui/Icon.tsx";

interface Props {
  variant?: "full" | "icon";
  item: AnalyticsItem;
  pdp?: boolean;
}

export function Toast(
  { message, onClose }: { message: string; onClose: () => void },
) {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div role="alert" class="alert shadow-lg fixed bottom-4 left-4 w-fit z-50">
      <div>
        <span>{message}</span>
      </div>
    </div>
  );
}

function WishlistButton({ item, variant = "full", pdp }: Props) {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const productID = (item as any).item_id;
  const productGroupID = item.item_group_id ?? "";
  const id = useId();

  const addToWishlistEvent = useSendEvent({
    on: "click",
    event: {
      name: "add_to_wishlist",
      params: { items: [item] },
    },
  });

  const onClick = (
    event: any,
    productID: string,
    productGroupID: string,
  ) => {
    const button = event.currentTarget;
    const user = window.STOREFRONT.USER.getUser();

    if (user?.email) {
      button.classList.add("htmx-request");
      window.STOREFRONT.WISHLIST.toggle(productID, productGroupID);
      setToastMessage(
        "item adicionado à sua lista de desejos.",
      );
      setShowToast(true);
    } else {
      setToastMessage(
        "Faça login para adicionar itens à sua lista de desejos.",
      );
      setShowToast(true);
    }
  };

  useEffect(() => {
    const onLoad = (id: string, productID: string) => {
      window.STOREFRONT.WISHLIST.subscribe((sdk) => {
        const button = document.getElementById(id) as HTMLButtonElement;
        const inWishlist = sdk.inWishlist(productID);
        button.disabled = false;
        button.classList.remove("htmx-request");
        button.querySelector("svg")?.setAttribute(
          "fill",
          inWishlist ? "black" : "none",
        );
        const span = button.querySelector("span");
        if (span) {
          span.innerHTML = inWishlist
            ? "Remove from wishlist"
            : "Add to wishlist";
        }
      });
    };

    onLoad(id, productID);
  }, [id, productID]);

  return (
    <>
      <button
        id={id}
        data-wishlist-button
        disabled
        {...addToWishlistEvent}
        aria-label="Add to wishlist"
        onClick={(e) => onClick(e, productID, productGroupID)}
        className={clx(
          "wishlist-button",
          "[.htmx-request_&]:hidden",
        )}
      >
        <Icon
          id="wishlist-icon"
          class="[.htmx-request_&]:hidden"
          fill="none"
          width={20}
          height={20}
        />
        <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
      </button>
      {showToast && (
        <Toast
          message={toastMessage}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}

export default WishlistButton;
