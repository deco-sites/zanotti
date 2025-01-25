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
        class="underline text-primary text-left"
      >
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
                      const { billingDuration = 0, billingIncrement = 0, price: installment } =
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
