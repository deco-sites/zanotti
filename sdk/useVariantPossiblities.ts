import type { ProductLeaf, PropertyValue } from "apps/commerce/types.ts";
import { ConsoleLogRecordExporter } from "deco/deps.ts";

export type Possibilities = Record<string, Record<string, string | undefined>>;

const hash = ({ name, value }: PropertyValue) => `${name}::${value}`;

const omit = new Set([
  "category",
  "cluster",
  "RefId",
  "descriptionHtml",
  "vtex.subscription.allever",
  "vtex.subscription.coffe-station",
  "vtex.subscription.all",
  "vtex.subscription.eletrotrafo-10-off-assinatura",
  "assurant.insurance",
  "Estimated Date Arrival",
]);

export const useVariantPossibilities = (
  variants: ProductLeaf[],
  selected: ProductLeaf,
): Possibilities => {
  const possibilities: Possibilities = {};
  const selectedSpecs = new Set(selected.additionalProperty?.map(hash));

  for (const variant of variants) {
    const { url, additionalProperty = [], productID } = variant;
    const isSelected = productID === selected.productID;
    const specs = additionalProperty.filter(({ name }) => {
      return !omit.has(name!);
    });

    for (let it = 0; it < specs.length; it++) {
      const name = specs[it].name!;
      const value = specs[it].value!;

      if (omit.has(name)) continue;

      if (!possibilities[name]) {
        possibilities[name] = {};
      }

      // First row is always selectable
      const isSelectable = it === 0 ||
        specs.every((s) => s.name === name || selectedSpecs.has(hash(s)));

      possibilities[name][value] = isSelected
        ? url
        : isSelectable
        ? possibilities[name][value] || url
        : possibilities[name][value];
    }
  }

  return possibilities;
};
