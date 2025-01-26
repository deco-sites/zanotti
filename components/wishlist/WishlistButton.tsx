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

function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 7000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div role="alert" class="alert shadow-lg fixed bottom-4 left-4 w-fit z-50">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        class="stroke-info h-6 w-6 shrink-0"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        >
        </path>
      </svg>
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
