/**
 * This file takes care of global app side effects,
 * like clicking on add to cart and the cart modal being displayed
 */

import { signal } from "@preact/signals";
import type { Props } from "deco-sites/true-source/components/product/SubscriptionModal.tsx";

const displayCart = signal(false);
const displayMenu = signal(false);
const displaySearchPopup = signal(false);
const displaySearchDrawer = signal(false);
const displaySubscriptionPopup = signal(false);
const displayVideoModal = signal<null | string>(null);
const searchBarExpanded = signal(false);

const currentSubscription = signal<Props | null>(null);

const state = {
  displayCart,
  displayMenu,
  displaySearchPopup,
  displaySearchDrawer,
  displaySubscriptionPopup,
  displayVideoModal,
  searchBarExpanded,
  currentSubscription,
};

// Keyboard event listeners
addEventListener("keydown", (e: KeyboardEvent) => {
  const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;

  // Open Searchbar on meta+k
  if (e.metaKey === true && isK) {
    displaySearchPopup.value = true;
  }
});

export const useUI = () => state;
