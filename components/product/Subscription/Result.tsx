import { useScript } from "@deco/deco/hooks";
import type { AppContext } from "../../../apps/site.ts";
import type { ComponentProps } from "../../../sections/Component.tsx";

export interface Props {
  productID: string;
  seller: string;
  sname: string;
}

interface Attachment {
  name: string;
  content: {
    [key: string]: string;
  };
}

interface Item {
  id: string;
  attachments: Attachment[];
}

interface Frequency {
  interval: number;
  periodicity: string;
}

interface Validity {
  start: string;
  end: string;
}

interface Plan {
  frequency: Frequency;
  validity: Validity;
}

interface Subscription {
  itemIndex: number;
  plan: Plan;
}

export async function action(props: Props, req: Request, ctx: AppContext) {
  const {
    productID,
    seller,
    sname,
  } = props;

  const form = await req.formData();
  const selectedOption = `${form.get("subscription-option") ?? ""}`;

  if (selectedOption) {
    const orderItems = [{
      id: productID,
      seller,
      quantity: 1,
    }];

    // deno-lint-ignore no-explicit-any
    let cart = await (ctx as any).invoke("vtex/actions/cart/addItems.ts", {
      orderItems,
    });

    const SUBSCRIPTION_KEY = sname;
    const SUBSCRIPTION_PLAN = selectedOption;

    const SUBSCRIPTION_VALUE = {
      "vtex.subscription.key.frequency": SUBSCRIPTION_PLAN,
    };

    const attachmentIndex = cart?.items.findLastIndex((item: Item) => {
      return item.id === productID && item.attachments.length === 0;
    });

    // deno-lint-ignore no-explicit-any
    cart = await (ctx as any).invoke(
      "vtex/actions/cart/updateItemAttachment.ts",
      {
        index: attachmentIndex,
        content: SUBSCRIPTION_VALUE,
        attachment: SUBSCRIPTION_KEY,
        noSplitItem: true,
      },
    );

    const subscriptions: Subscription[] = [];
    if (cart) {
      cart.items.forEach((item: Item, itemIndex: number) => {
        const subscription = item.attachments.find(
          (a) => a.name.indexOf("subscription") !== -1,
        )?.content || null;

        if (subscription) {
          const plan = subscription["vtex.subscription.key.frequency"];

          if (plan) {
            const [interval, periodicity] = plan.trim().split(" ");

            const today = new Date();
            const validity = {
              start: `${today.getFullYear()}-${today.getMonth() + 1}-${
                today.getDate() > 28 ? 28 : today.getDate()
              }`,
              end: `${today.getFullYear() + 3}-${today.getMonth() + 1}-${
                today.getDate() > 28 ? 28 : today.getDate()
              }`,
            };

            subscriptions.push({
              itemIndex,
              plan: {
                frequency: { interval: parseInt(interval), periodicity },
                validity,
              },
            });
          }
        }
      });
    }

    if (subscriptions.length > 0) {
      // deno-lint-ignore no-explicit-any
      await (ctx as any).invoke("vtex/actions/cart/updateAttachment.ts", {
        attachment: "subscriptionData",
        body: { subscriptions },
      });
    }

    return {
      result: "OK",
    };
  }

  return {
    result: null,
  };
}

export default function Result(_props: ComponentProps<typeof action>) {
  return (
    <script
      type="text/javascript"
      defer
      dangerouslySetInnerHTML={{
        __html: useScript(() => {
          setTimeout(() => {
            const button = document?.querySelector<HTMLButtonElement>(
              `#minicart-form #teste-sub`,
            );
            button?.click();
            // @ts-ignore showModal exists on DaisyUI
            document.querySelector("#modal_subscription > form > button")
              ?.click();
            // @ts-ignore click is correct
            document.querySelector("label[for=minicart-drawer]")?.click();
          }, 500);
        }),
      }}
    />
  );
}
