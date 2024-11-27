import { useCart } from "apps/vtex/hooks/useCart.ts";

export interface Props {
  items: { id: number; quantity: number }[];
}

export default async function loader(
  props: Props,
  _req: Request,
) {
  const { simulate } = useCart();

  const { id, quantity } = props.items[0];

  const response = await simulate({
    items: [{
      id,
      quantity,
      seller: "1",
    }],
    postalCode: "89218220",
    country: "BRA",
    RnbBehavior: 0,
  });

  return response || null;
}
