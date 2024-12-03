import { AppContext } from "../../apps/site.ts";
import { MINICART_DRAWER_ID, MINICART_FORM_ID } from "../../constants.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useComponent } from "../../sections/Component.tsx";
import Coupon from "./Coupon.tsx";
import CartItem, { Item } from "./Item.tsx";
import Icon from "../ui/Icon.tsx";
import { Product } from "apps/commerce/types.ts";
import { useScript } from "@deco/deco/hooks";
import ProductCard from "../product/ProductCard.tsx";
import { BestInstallmentOption } from "../../sdk/cart/vtex/loader.ts";
export interface Minicart {
  isMobile: boolean;
  /** Cart from the ecommerce platform */
  platformCart: Record<string, unknown>;
  /** Cart from storefront. This can be changed at your will */
  storefront: {
    items: Item[];
    total: number;
    subtotal: number;
    discounts: number;
    coupon?: string;
    locale: string;
    currency: string;
    bestInstallment: BestInstallmentOption | null;
    shipping: number | null;
    enableCoupon?: boolean;
    freeShippingTarget: number;
    checkoutHref: string;
  };
}
const onLoad = (formID: string) => {
  const form = document.getElementById(formID) as HTMLFormElement;
  window.STOREFRONT.CART.dispatch(form);
  // view_cart event
  if (typeof IntersectionObserver !== "undefined") {
    new IntersectionObserver((items, observer) => {
      for (const item of items) {
        if (item.isIntersecting && item.target === form) {
          window.DECO.events.dispatch({
            name: "view_cart",
            params: window.STOREFRONT.CART.getCart(),
          });
          observer?.unobserve(item.target);
        }
      }
    }).observe(form);
  }
  // Disable form interactivity while cart is being submitted
  document.body.addEventListener(
    "htmx:before-send", // deno-lint-ignore no-explicit-any
    ({ detail: { elt } }: any) => {
      if (elt !== form) {
        return;
      }
    },
  );
};
const sendBeginCheckoutEvent = () => {
  window.DECO.events.dispatch({
    name: "being_checkout",
    params: window.STOREFRONT.CART.getCart(),
  });
};
export const action = async (_props: unknown, req: Request, ctx: AppContext) =>
  req.method === "PATCH"
    ? ({ cart: await ctx.invoke("site/loaders/minicart.ts") }) // error fallback
    : ({ cart: await ctx.invoke("site/actions/minicart/submit.ts") });
export function ErrorFallback() {
  return (
    <div class="flex flex-col flex-grow justify-center items-center overflow-hidden w-full gap-2">
      <div class="flex flex-col gap-1 p-6 justify-center items-center">
        <span class="font-semibold">
          Ocorreu um erro ao atualizar o carrinho
        </span>
        <span class="text-sm text-center">
          Por favor, recarregue a página
        </span>
      </div>
    </div>
  );
}
export let itemCount = 0;
export default function Cart(
  {
    cart: {
      isMobile,
      platformCart,
      storefront: {
        items,
        total,
        coupon,
        discounts,
        bestInstallment,
        locale,
        shipping,
        currency,
        enableCoupon = true,
        checkoutHref,
      },
    },
  }: {
    cart: Minicart;
  },
) {
  const count = items.length;
  itemCount = count;
  return (
    <div id="minicart" class="flex flex-col w-full h-full lg:flex-row lg:items-stretch">
      <form
        class="block w-full"
        id={MINICART_FORM_ID}
        hx-sync="this:replace"
        hx-trigger="submit, change delay:300ms"
        hx-target="#minicart"
        hx-indicator="this"
        hx-include="#minicart"
        hx-disabled-elt="this"
        hx-post={useComponent(import.meta.url)}
        hx-swap="outerHTML"
      >
        {/* Button to submit the form */}
        <button hidden autofocus />

        {/* Add to cart controllers */}
        <input name="add-to-cart" type="hidden" />
        <button id="teste" hidden name="action" value="add-to-cart" />

        {/* Reload cart controller */}
        <input name="reload-cart" type="hidden" />
        <button id="teste-sub" hidden name="action" value="reload-cart" />

        {/* This contains the STOREFRONT cart. */}
        <input
          type="hidden"
          name="storefront-cart"
          value={encodeURIComponent(
            JSON.stringify({ coupon, currency, value: total, items }),
          )}
        />

        {/* This contains the platformCart cart from the commerce platform. Integrations usually use this value, like GTM, pixels etc */}
        <input
          type="hidden"
          name="platform-cart"
          value={encodeURIComponent(JSON.stringify(platformCart))}
        />

        <div
          class={clx(
            "flex flex-col items-center overflow-hidden w-full h-full max-h-screen",
            "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300",
          )}
        >
          {/* Cart header */}
          <div class="bg-primary flex justify-between text-white w-full gap-[5px] py-[13px] px-[35px] h-[58px] items-center">
            <div class="flex gap-[5px]">
              <p class="font-semibold text-base">Meu carrinho</p>
              {count === 0 ? null : <p>({count})</p>}
            </div>
            <div>
              <label class="cursor-pointer" for={MINICART_DRAWER_ID}>
                <Icon id="close-white" size={16} />
              </label>
            </div>
          </div>
          {count === 0
            ? (
              <div class="flex flex-col items-center m-auto gap-3 py-14">
                <span class="block font-semibold text-2xl text-center">:(</span>
                <span class="block font-semibold text-base text-center">
                  Seu carrinho está vazio!
                </span>
                <p class="text-sm max-w-[184px] m-auto flex text-center leading-[21px]">
                  Você ainda não possuí itens no seu carrinho.
                </p>
                <label
                  for={MINICART_DRAWER_ID}
                  class="bg-signature-green py-4 rounded-full text-white px-6 text-sm cursor-pointer"
                >
                  Começar a comprar
                </label>
              </div>
            )
            : (
              <>
                <ul
                  role="list"
                  class="p-5 overflow-y-auto flex flex-col gap-2 w-full overflow-y-auto flex-grow"
                >
                  {items.map((item, index) => (
                    <li>
                      <CartItem
                        item={item}
                        index={index}
                        locale={locale}
                        currency={currency}
                      />
                    </li>
                  ))}
                </ul>

                {/* Cart Footer */}
                <footer class="w-full bg-white">
                  {/* Subtotal */}
                  <div class="flex flex-col">
                    {shipping && (
                      <div class="flex justify-between px-4 pt-5 gap-2">
                        <div class="flex items-center gap-2 text-sm lg:text-base text-dark-gray">
                          <Icon id="delivery-box" />
                          Frete
                        </div>
                        <span>
                          {shipping === 0
                            ? (
                              <span class="font-semibold text-lime-600">
                                Frete Grátis
                              </span>
                            )
                            : formatPrice(shipping, currency, locale)}
                        </span>
                      </div>
                    )}
                    {enableCoupon && <Coupon coupon={coupon} />}
                  </div>

                  {/* Total */}
                  <div class="flex flex-col gap-2 mx-4 pb-3">
                    {discounts > 0 && (
                      <div class="flex justify-between items-center w-full">
                        <span class="text-sm">Descontos</span>
                        <span class="text-sm">
                          {formatPrice(-discounts, currency, locale)}
                        </span>
                      </div>
                    )}
                    <div class="flex justify-between items-center w-full">
                      <span class="text-base">Total</span>
                      <output
                        form={MINICART_FORM_ID}
                        class="font-semibold text-xl"
                      >
                        {formatPrice(total, currency, locale)}
                      </output>
                    </div>
                    {bestInstallment && (
                      <div class="text-right text-sm text-dark-gray">
                        ou até {bestInstallment.count}x de{" "}
                        {formatPrice(bestInstallment.value / 100)}
                      </div>
                    )}
                  </div>
                  <hr class="max-w-[90%] m-auto" />
                  <div class="p-4">
                    <a
                      class="bg-signature-green w-full no-animation flex items-center justify-center py-[10px] w-full rounded-full"
                      href={checkoutHref}
                      hx-on:click={useScript(sendBeginCheckoutEvent)}
                    >
                      <span class="[.htmx-request_&]:hidden text-white text-xl font-semibold">
                        Finalizar Compra
                      </span>

                      <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
                    </a>
                    <label
                      for={MINICART_DRAWER_ID}
                      class="flex w-full justify-center mt-4 text-primary text-base"
                    >
                      OU CONTINUAR COMPRANDO
                    </label>
                  </div>
                </footer>
              </>
            )}
        </div>
      </form>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_FORM_ID),
        }}
      />
    </div>
  );
}
