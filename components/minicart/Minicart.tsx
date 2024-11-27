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
  recommendations: Product[];
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

      {
        /* <button
        class="btn btn-primary"
        hx-patch={useComponent(import.meta.url)}
        hx-swap="outerHTML"
        hx-target="closest div"
      >
        Retry
      </button> */
      }
    </div>
  );
}
export let itemCount = 0;
function ProductRecommendations({
  isMobile,
  recommendations,
}: {
  isMobile: boolean;
  recommendations: Product[];
}) {
  const _class = isMobile ? "shrink-0 w-[250px]" : "";

  return (
    <div class="w-full lg:w-[400px] lg:h-full border border-y-0 border-l-0 border-r-middle-gray">
      <div class="px-5 py-5 lg:py-8 border border-x-0 border-t-0 border-b-middle-gray">
        <span class="block text-left lg:text-center lg:max-w-[210px] text-lg lg:text-2xl lg:mx-auto">
          Você também pode <b class="text-primary">[Gostar]</b>
        </span>
      </div>
      <div class="flex flex-row max-lg:overflow-x-auto lg:flex-col gap-4 lg:overflow-y-auto lg:max-h-[calc(100vh-129px)] px-5 lg:px-12 pt-5 pb-8 lg:py-5">
        {recommendations.map((item: Product, index: number) => (
          <ProductCard
            key={index}
            class={_class}
            product={item}
            hiddenAddToCartButton={false}
          />
        ))}
      </div>
    </div>
  );
}
export default function Cart(
  {
    cart: {
      isMobile,
      platformCart,
      recommendations,
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
    <div id="minicart" class="flex flex-col lg:flex-row lg:items-stretch">
      {isMobile === false && recommendations.length > 0 && (
        <ProductRecommendations
          isMobile={isMobile}
          recommendations={recommendations}
        />
      )}
      <form
        class="block"
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
            "flex flex-col items-center overflow-hidden w-full lg:w-[400px] h-full max-h-[85vh] lg:max-h-screen",
            "[.htmx-request_&]:pointer-events-none [.htmx-request_&]:opacity-60 [.htmx-request_&]:cursor-wait transition-opacity duration-300",
          )}
        >
          {/* Cart header */}
          <div class="bg-primary flex justify-between text-white w-full gap-[5px] py-[13px] px-[35px] h-[58px] items-center">
            <div class="flex gap-[5px]">
              <p class="font-semibold text-base">Meu carrinho</p>
              {count === 0 ? null : (
                <p>
                  [{count} {items.length === 0
                    ? ""
                    : items.length === 1
                    ? "Produto"
                    : "Produtos"}]
                </p>
              )}
            </div>
            <div>
              <label class="cursor-pointer" for={MINICART_DRAWER_ID}>
                <Icon id="close-white" size={16} />
              </label>
            </div>
          </div>
          {count === 0
            ? (
              <div class="flex flex-col m-auto gap-3 py-14">
                <div class="flex justify-center">
                  <Icon id="bag-blue" />
                </div>
                <div>
                  <p class="font-semibold text-base text-center">
                    Seu carrinho está vazio!
                  </p>
                  <p class="text-sm max-w-[184px] m-auto flex text-center leading-[21px]">
                    Você ainda não possuí itens no seu carrinho.
                  </p>
                </div>
                <label
                  for={MINICART_DRAWER_ID}
                  class="bg-signature-green py-[15px] w-full rounded-full text-white px-6 text-sm cursor-pointer"
                >
                  Clique aqui e <b>veja os produtos</b> {">"}
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
      {isMobile && recommendations.length > 0 && (
        <ProductRecommendations
          isMobile={isMobile}
          recommendations={recommendations}
        />
      )}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, MINICART_FORM_ID),
        }}
      />
    </div>
  );
}
