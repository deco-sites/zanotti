import type {
  AggregateOffer,
  UnitPriceSpecification,
} from "apps/commerce/types.ts";

const bestInstallment = (
  acc: UnitPriceSpecification | null,
  curr: UnitPriceSpecification,
) => {
  if (curr.priceComponentType !== "https://schema.org/Installment") {
    return acc;
  }

  if (curr.name === "Pix") {
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
};

const installmentToString = (
  installment: UnitPriceSpecification,
  sellingPrice: number,
) => {
  const { billingDuration, billingIncrement, price } = installment;

  if (!billingDuration || !billingIncrement) {
    return "";
  }

  const withTaxes = sellingPrice < price;

  return `${billingDuration}x de R$ ${billingIncrement} ${
    withTaxes ? "com juros" : "sem juros"
  }`;
};

export const useOffer = (aggregateOffer?: AggregateOffer) => {
  const offer =
    aggregateOffer?.offers.find((o) =>
      o.availability === "https://schema.org/InStock"
    ) || aggregateOffer?.offers[0];

  const listPrice = offer?.priceSpecification.find((spec) =>
    spec.priceType === "https://schema.org/ListPrice"
  );

  const availability = offer?.availability;
  const installment = offer?.priceSpecification.reduce(bestInstallment, null);
  const pix = offer?.priceSpecification.find((spec: UnitPriceSpecification) => {
    return spec.name === "Pix";
  })?.price || 0;
  const inventory = offer?.inventoryLevel?.value;
  const sellerName = offer?.sellerName;
  const seller = offer?.seller;
  const price = offer?.price;

  return {
    inventory,
    price,
    listPrice: listPrice?.price,
    availability,
    seller,
    sellerName,
    pix,
    installment,
    installments: installment && price
      ? installmentToString(installment, price)
      : null,
  };
};
