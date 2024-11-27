import { useCart } from "apps/vtex/hooks/useCart.ts";

export async function sendSubscriptionChecker() {
  const { cart, sendAttachment } = useCart();

  // @ts-ignore subscriptions are checked
  const subscriptions = [];

  cart.value?.items.filter((item, itemIndex) => {
    const hasSubscription = item.attachments.find(
      // @ts-ignore all properties are checked
      (a) => a.name === "vtex.subscription.assinatura",
      // @ts-ignore all properties are checked
    )?.content || null;

    if (hasSubscription) {
      const item_plan = hasSubscription["vtex.subscription.key.frequency"];

      const frequency: {
        interval?: number;
        periodicity?: string;
      } = {};

      if (item_plan.indexOf("2 week") !== -1) {
        frequency.interval = 2;
        frequency.periodicity = "WEEK";
      }

      if (item_plan.indexOf("1 month") !== -1) {
        frequency.interval = 1;
        frequency.periodicity = "MONTH";
      }

      if (item_plan.indexOf("2 month") !== -1) {
        frequency.interval = 2;
        frequency.periodicity = "MONTH";
      }

      if (item_plan.indexOf("3 month") !== -1) {
        frequency.interval = 3;
        frequency.periodicity = "MONTH";
      }

      const today = new Date();
      const validity = {
        start: `${today.getFullYear()}-${today.getMonth() + 1}-${
          today.getDate() > 28 ? 28 : today.getDate()
        }`,
        end: `${today.getFullYear()}-${today.getMonth() + 1}-${
          today.getDate() > 28 ? 28 : today.getDate()
        }`,
      };

      subscriptions.push({
        itemIndex,
        plan: {
          frequency,
          validity,
        },
      });
    }
  });

  await sendAttachment({
    attachment: "subscriptionData",
    // @ts-ignore subscriptions are checked
    body: { subscriptions },
  });
}
