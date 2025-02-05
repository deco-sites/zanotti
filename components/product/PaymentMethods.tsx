import Icon from "../ui/Icon.tsx";
import { formatPrice } from "../../sdk/format.ts";
import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";
import { useScript } from "@deco/deco/hooks";
interface PaymentMethodsProps {
  offers?: AggregateOffer;
}
function PaymentMethods({ offers }: PaymentMethodsProps) {
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

  return (
    <>
      <button
        hx-on:click={useScript(() =>
          // @ts-ignore showModal exists on DaisyUI
          document.getElementById("payment-methods")?.showModal()
        )}
        class="underline text-primary text-left flex items-center gap-2 lg:gap-3"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 18 18"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M16.5 3L1.5 3.00002C0.947715 3.00002 0.5 3.44774 0.5 4.00002V14.6C0.5 15.1523 0.947715 15.6 1.5 15.6L16.5 15.6C17.0523 15.6 17.5 15.1523 17.5 14.6V4C17.5 3.44772 17.0523 3 16.5 3Z"
            stroke="#064cce"
          >
          </path>
          <rect y="6" width="18" height="3" fill="#064cce"></rect>
        </svg>

        Opções de Parcelamento
      </button>
      <dialog id="payment-methods" class="modal">
        <div class="modal-box bg-white">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 class="font-semibold text-base text-black mb-4">
            Opções de Parcelamento
          </h3>
          <div id="installments">
            <table class="table table-xs w-full">
              <tbody class="bg-white divide-y divide-gray-200">
                {offer?.priceSpecification.map(
                  (priceSpecification, index) => {
                    if (maxIntallments?.name === priceSpecification.name) {
                      const {
                        billingDuration = 0,
                        billingIncrement = 0,
                        price: installment,
                      } = priceSpecification;
                      return (
                        <tr
                          key={index}
                          class="odd:bg-light-gray even:bg-transparent"
                        >
                          <td>{billingDuration}x</td>
                          <td class="text-right">
                            {formatPrice(billingIncrement)}
                          </td>
                          <td class="text-right">
                            {installment > price ? "com juros" : "sem juros"}
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
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
export default PaymentMethods;
