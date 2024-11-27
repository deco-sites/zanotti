import { type AppContext } from "../../apps/site.ts";
import { type Minicart } from "../../components/minicart/Minicart.tsx";

import linx from "../../sdk/cart/linx/submit.ts";
import vnda from "../../sdk/cart/vnda/submit.ts";
import wake from "../../sdk/cart/wake/submit.ts";
import vtex from "../../sdk/cart/vtex/submit.ts";
import vtexLoader from "../../sdk/cart/vtex/loader.ts";
import shopify from "../../sdk/cart/shopify/submit.ts";
import nuvemshop from "../../sdk/cart/nuvemshop/submit.ts";

const actions: Record<string, CartSubmitActions> = {
  vtex: vtex as CartSubmitActions,
  vnda: vnda as CartSubmitActions,
  wake: wake as CartSubmitActions,
  linx: linx as CartSubmitActions,
  shopify: shopify as CartSubmitActions,
  nuvemshop: nuvemshop as CartSubmitActions,
};

interface CartForm {
  items: number[];
  coupon: string | null;
  action: string | null;
  platformCart: unknown;
  addToCart: unknown;
}

export interface CartSubmitActions<AC = unknown> {
  addToCart?: (props: CartForm, req: Request, ctx: AC) => Promise<Minicart>;
  setQuantity?: (props: CartForm, req: Request, ctx: AC) => Promise<Minicart>;
  setCoupon?: (props: CartForm, req: Request, ctx: AC) => Promise<Minicart>;
  reloadCart?: (props: CartForm, req: Request, ctx: AC) => Promise<Minicart>;
}

const safeParse = (payload: string | null) => {
  try {
    return JSON.parse(payload || "null");
  } catch {
    return null;
  }
};

// Reconstruct the cart state from the received form data
const cartFrom = (form: FormData) => {
  const cart: CartForm = {
    items: [],
    coupon: null,
    platformCart: null,
    action: null,
    addToCart: null,
  };

  for (const [name, value] of form.entries()) {
    if (name === "coupon") {
      cart.coupon = value.toString();
    } else if (name === "action") {
      cart.action = value.toString();
    } else if (name === "platform-cart") {
      cart.platformCart = safeParse(decodeURIComponent(value.toString()));
    } else if (name?.startsWith("item::")) {
      const [_, it] = name.split("::");
      cart.items[Number(it)] = Number(value);
    } else if (name === "add-to-cart") {
      cart.addToCart = safeParse(decodeURIComponent(value.toString()));
    }
  }

  return cart;
};

async function action(
  _props: unknown,
  req: Request,
  ctx: AppContext,
): Promise<Minicart> {
  const { setQuantity, setCoupon, addToCart } = actions["vtex"];

  const {
    device,
    minicartSuggestion = "",
  } = ctx;

  const form = cartFrom(await req.formData());

  let handler = null;
  if (form.action === "add-to-cart") {
    handler = addToCart;
  } else if (form.action === "reload-cart") {
    handler = vtexLoader;
  } else if (form.action === "set-coupon") {
    handler = setCoupon;
  } else {
    handler = setQuantity;
  }

  if (!handler) {
    throw new Error("Unsupported action on platform vtex");
  }

  const result = await handler(form, req, ctx);

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

    result.recommendations = recommendations || [];
  }

  const isMobile = device !== "desktop";
  result.isMobile = isMobile;

  return result;
}

export default action;
