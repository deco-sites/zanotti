import { useId } from "../../../sdk/useId.ts";
import { useOffer } from "../../../sdk/useOffer.ts";
import { useScript } from "@deco/deco/hooks";
import { usePeriod } from "../../../sdk/usePeriod.ts";
import { useComponent } from "../../../sections/Component.tsx";
import type { AnalyticsItem, Product } from "apps/commerce/types.ts";
import Icon from "../../ui/Icon.tsx";
export interface Props {
  item: AnalyticsItem;
  seller: string;
  product: Product;
}
const onLoad = () => {
  const form = document.querySelector("#modal_subscription");
  const inputs = form?.querySelectorAll("fieldset input") as NodeListOf<
    HTMLInputElement
  >;
  const verifyActiveRadio = (e: Event) => {
    inputs.forEach((i) =>
      i.parentElement?.parentElement?.classList.remove("border-primary")
    );
    const target = e.currentTarget;
    if (target) {
      (target as Element).parentElement?.parentElement?.classList.add(
        "border-primary",
      );
    }
  };
  if (inputs) {
    inputs.forEach((input) => {
      if (input.checked) {
        input.parentElement?.parentElement?.classList.add(
          "border-primary",
        );
      }
      input.onchange = verifyActiveRadio;
    });
  }
};
export default function ProductSubscription({ product }: Props) {
  const slot = useId();
  if (!product) {
    return null;
  }
  const { offers, productID, additionalProperty } = product;
  const { seller = "1" } = useOffer(offers) || {};
  const hasProductSubscription = additionalProperty?.find((prop) => (
    prop.name?.indexOf("subscription") !== -1
  ));
  if (!hasProductSubscription) {
    return null;
  }
  const value = JSON.parse(hasProductSubscription.value || "[]")[0];
  const sname = hasProductSubscription.name;
  return (
    <>
      <button
        class="btn btn-primary"
        hx-on:click={useScript(() => {
          // @ts-ignore showModal exists on DaisyUI
          document.getElementById("product_subscription")?.showModal();
        })}
      >
        Faça sua assinatura
      </button>
      <dialog id="product_subscription" class="modal">
        <div
          id="modal_subscription"
          class="modal-box lg:w-[800px] lg:max-w-[unset]"
        >
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h2 class="text-black font-semibold uppercase text-lg mb-3">
            ASSINE E COMPRE COM ATÉ <b class="text-primary">[10% OFF]</b>
          </h2>
          <div class="mb-5 text-sm text-black font-semibold">
            <h3>Por que assinar?</h3>
            <div class="flex items-center gap-3 border-b border-middle-gray py-3">
              <Icon
                id="check-circle"
                class="text-primary"
              />
              10% OFF no site em todas as compras com assinatura
            </div>
            <div class="flex items-center gap-3 border-b border-middle-gray py-3">
              <Icon
                id="check-circle"
                class="text-primary"
              />
              Edite os produtos e as datas, pause ou cancele a qualquer momento!
            </div>
            <div class="flex items-center gap-3 border-b border-middle-gray py-3">
              <Icon
                id="check-circle"
                class="text-primary"
              />
              Sem taxas de Adesão, Mensalidade ou Cancelamento
            </div>
          </div>
          <form
            id="subscription-form"
            class="flex flex-col gap-y-6 overflow-y-auto h-full"
            hx-swap="innerHTML"
            hx-sync="this:replace"
            hx-post={useComponent(import.meta.resolve("./Result.tsx"), {
              productID,
              seller,
              sname,
            })}
            hx-target={`#${slot}`}
          >
            <div>
              <fieldset>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1">
                  {value.DomainValues?.split(",").map((
                    domainValue: string,
                    index: number,
                  ) => (
                    <div class="border-2 border-middle-gray rounded">
                      <label className="label cursor-pointer justify-start lg:justify-center gap-2 px-2">
                        <input
                          type="radio"
                          name="subscription-option"
                          class="radio checked:bg-primary"
                          value={domainValue}
                          defaultChecked={index === 0}
                        />
                        <span className="label-text text-sm">
                          {usePeriod(domainValue)}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </fieldset>
              <button
                type="submit"
                class="btn btn-primary mt-5 w-full"
              >
                <span class="[.htmx-request_&]:hidden inline text-white uppercase">
                  Comprar com assinatura
                </span>
                <span class="[.htmx-request_&]:inline hidden loading loading-spinner" />
              </button>
            </div>
          </form>
          <script
            type="text/javascript"
            defer
            dangerouslySetInnerHTML={{
              __html: useScript(onLoad),
            }}
          />
          <div id={slot} />
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
