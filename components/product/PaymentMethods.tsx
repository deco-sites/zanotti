import Icon from "../ui/Icon.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";
import { useScript } from "@deco/deco/hooks";
interface PaymentMethodsProps {
  offers?: AggregateOffer;
  installment: string;
}
function PaymentMethods({ offers, installment }: PaymentMethodsProps) {
  const offer =
    offers?.offers.find((o) =>
      o.availability === "https://schema.org/InStock"
    ) || offers?.offers[0];
  const { price } = offer;
  const maxIntallments = offer?.priceSpecification.reduce(
    (acc: UnitPriceSpecification | null, curr: UnitPriceSpecification) => {
      if (
        curr.priceComponentType !== "https://schema.org/Installment" ||
        curr.name === "Pix"
      ) {
        return acc;
      }
      if (!acc) {
        return curr;
      }
      if (
        acc.billingDuration && curr.billingDuration &&
        acc.billingDuration < curr.billingDuration
      ) {
        return curr;
      }
      return acc;
    },
    null,
  );
  const pixInstallment = installment && parseFloat(installment);
  const hasPixDiscount = pixInstallment < price;
  return (
    <>
      <button
        hx-on:click={useScript(() =>
          // @ts-ignore showModal exists on DaisyUI
          document.getElementById("payment-methods")?.showModal()
        )}
        class="underline text-primary text-left"
      >
        Ver formas de pagamento
      </button>
      <dialog id="payment-methods" class="modal">
        <div class="modal-box bg-white">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 class="font-semibold text-base text-black mb-4">
            Métodos de <span class="text-primary">[pagamento]</span>
          </h3>
          <div className="flex">
            <div class="flex flex-col gap-8">
              {hasPixDiscount && (
                <button
                  id="pix"
                  class="flex flex-col items-center gap-2 text-sm font-semibold text-center text-black max-w-24"
                  hx-on:click={useScript(() => {
                    const content = document.querySelector("div#pix");
                    const otherContent = document.querySelector(
                      "div#installments",
                    );
                    content?.classList.add("flex");
                    content?.classList.remove("hidden");
                    otherContent?.classList.add("hidden");
                    otherContent?.classList.remove("flex");
                    const pixButton = document.querySelector(
                      "button#pix > div",
                    );
                    const installmentsButton = document.querySelector(
                      "button#installments > div",
                    );
                    pixButton?.classList.add("border-primary");
                    pixButton?.classList.remove("border-dark-gray");
                    installmentsButton?.classList.add("border-dark-gray");
                    installmentsButton?.classList.remove("border-primary");
                  })}
                >
                  <div class="w-20 h-20 flex items-center justify-center border-2 border-primary rounded-full">
                    <Icon
                      id="pix"
                      width={46}
                      height={50}
                      class="-mr-[3px] -mb-[2px]"
                    />
                  </div>
                  Pix
                </button>
              )}
              <button
                id="installments"
                class="flex flex-col items-center gap-2 text-sm font-semibold text-center text-black max-w-24"
                hx-on:click={useScript(() => {
                  const content = document.querySelector("div#pix");
                  const otherContent = document.querySelector(
                    "div#installments",
                  );
                  content?.classList.add("hidden");
                  content?.classList.remove("flex");
                  otherContent?.classList.add("flex");
                  otherContent?.classList.remove("hidden");
                  const pixButton = document.querySelector("button#pix > div");
                  const installmentsButton = document.querySelector(
                    "button#installments > div",
                  );
                  pixButton?.classList.add("border-dark-gray");
                  pixButton?.classList.remove("border-primary");
                  installmentsButton?.classList.add("border-primary");
                  installmentsButton?.classList.remove("border-dark-gray");
                })}
              >
                <div
                  class={`w-20 h-20 flex items-center justify-center border-2 border-dark-gray rounded-full ${
                    !hasPixDiscount && "!border-primary"
                  }`}
                >
                  <Icon id="credit-card" width={45} height={35} />
                </div>
                Cartão de Crédito
              </button>
            </div>
            <div class="grow pl-4 lg:pl-6 ml-4 lg:ml-6 border-l border-dark-gray">
              {hasPixDiscount && (
                <div id="pix" class="flex flex-col gap-4">
                  <p class="text-2xl text-primary font-semibold flex flex-wrap items-center gap-x-2">
                    {!!pixInstallment && formatPrice(pixInstallment)}
                    <span class="text-normal">no PIX</span>
                  </p>
                  <p class="text-xs text-gray-600 font-semibold max-w-xs">
                    Para pagamento via PIX será gerada uma chave e um QR Code ao
                    finalizar o processo de compra.
                  </p>
                  <p class="text-xs text-gray-600 font-semibold max-w-xs">
                    - O prazo de validade da chave é de X minutos. Em caso de
                    não pagamento o pedido será cancelado.
                  </p>
                  <p class="text-xs text-gray-600 font-semibold max-w-xs">
                    - O prazo de entrega começa a contar após a confirmação do
                    pagamento.
                  </p>
                </div>
              )}
              <div
                id="installments"
                class={`hidden ${!hasPixDiscount && "!flex"}`}
              >
                <table class="table table-xs w-full">
                  <thead>
                    <tr>
                      <th class="text-black font-normal">Parcelamento</th>
                      <th class="text-black font-normal text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    {offer?.priceSpecification.map(
                      (priceSpecification, index) => {
                        if (maxIntallments?.name === priceSpecification.name) {
                          const { billingDuration, billingIncrement } =
                            priceSpecification;
                          return (
                            <tr
                              key={index}
                              class="odd:bg-light-gray even:bg-transparent"
                            >
                              <td>{billingDuration}x</td>
                              <td class="text-right">
                                {formatPrice(billingIncrement)}
                              </td>
                            </tr>
                          );
                        }
                      },
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
export default PaymentMethods;
