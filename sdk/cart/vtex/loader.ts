import { Minicart } from "../../../components/minicart/Minicart.tsx";
import { itemToAnalyticsItem } from "apps/vtex/hooks/useCart.ts";
import type a from "apps/vtex/loaders/cart.ts";
import type { Product } from "apps/commerce/types.ts";
import type { AppContext } from "../../../apps/site.ts";

export type Cart = Awaited<ReturnType<typeof a>>;

interface InstallmentOptions {
  value: number;
  paymentSystem: string;
  installments: Installment[];
}

interface Installment {
  count: number;
  value: number;
  total: number;
  hasInterestRate: boolean;
}

export interface BestInstallmentOption {
  paymentSystem: string;
  count: number;
  value: number;
  total: number;
}

const bestInstallmentOption = (
  bestOption: BestInstallmentOption | null,
  option: InstallmentOptions,
): BestInstallmentOption | null => {
  const bestNoInterestInstallment: Installment | null = option.installments
    .filter((installment: Installment) => !installment.hasInterestRate)
    .reduce((
      bestInstallment: Installment | null,
      currentInstallment: Installment,
    ) => {
      return currentInstallment.count > (bestInstallment?.count || 0)
        ? currentInstallment
        : bestInstallment;
    }, null);

  return bestNoInterestInstallment &&
      bestNoInterestInstallment.count > (bestOption?.count || 0)
    ? {
      paymentSystem: option.paymentSystem,
      ...bestNoInterestInstallment,
    }
    : bestOption;
};

export const cartFrom = (
  form: Cart,
  url: string,
  isMobile: boolean,
  recommendations?: Product[],
): Minicart => {
  const { items, totalizers, paymentData } = form ?? { items: [] };
  const bestInstallment =
    (paymentData.installmentOptions as InstallmentOptions[]).reduce(
      bestInstallmentOption,
      null,
    ) || null;
  const total = totalizers?.find((item) => item.id === "Items")?.value || 0;
  const discounts =
    (totalizers?.find((item) => item.id === "Discounts")?.value || 0) * -1;
  const shipping = totalizers?.find((item) => item.id === "Shipping")?.value ||
    null;
  const locale = form?.clientPreferencesData.locale ?? "pt-BR";
  const currency = form?.storePreferencesData.currencyCode ?? "BRL";
  const coupon = form?.marketingData?.coupon ?? undefined;

  return {
    isMobile,
    platformCart: form as unknown as Record<string, unknown>,
    recommendations: recommendations ?? [],
    storefront: {
      items: items.map((item, index) => {
        const detailUrl = new URL(item.detailUrl, url).href;

        return {
          ...itemToAnalyticsItem({ ...item, detailUrl, coupon }, index),
          image: item.imageUrl,
          listPrice: item.listPrice / 100,
          attachments: item.attachments ?? [],
        };
      }),

      total: (total - discounts) / 100,
      subtotal: total / 100,
      discounts: discounts / 100,
      shipping: shipping !== null ? shipping / 100 : null,
      coupon: coupon,
      bestInstallment,
      locale,
      currency,
      freeShippingTarget: 1000,
      checkoutHref: "/checkout",
    },
  };
};

async function loader(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const {
    device,
    minicartSuggestion = "",
  } = ctx;
  const isMobile = device !== "desktop";
  // deno-lint-ignore no-explicit-any
  const response = await (ctx as any).invoke("vtex/loaders/cart.ts");
  if (minicartSuggestion !== "") {
    // deno-lint-ignore no-explicit-any
    const recommendations = await (ctx as any).invoke(
      "vtex/loaders/intelligentSearch/productList.ts",
      {
        collection: minicartSuggestion,
        count: 5,
        sort: "orders:desc",
      },
    );

    return cartFrom(response, req.url, isMobile, recommendations);
  }

  return cartFrom(response, req.url, isMobile);
}

export default loader;
