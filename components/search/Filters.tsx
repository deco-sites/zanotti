import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { parseRange } from "apps/commerce/utils/filters.ts";
import Avatar from "../../components/ui/Avatar.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";

import Icon from "../ui/Icon.tsx";
import Collapsable from "../ui/Collapsable.tsx";
interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity }: FilterToggleValue,
) {
  return (
    <li class="flex items-center gap-2 relative">
      <a
        href={url}
        rel="nofollow"
        class="absolute top-0 left-0 w-full h-full z-[1]"
      />
      <input type="checkbox" checked={selected} class="checkbox checkbox-sm" />
      <span class="text-xs font-semibold">{label}</span>
    </li>
  );
}

function FilterValues({ key, values }: FilterToggle) {
  const avatars = key === "tamanho" || key === "cor";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";
  return (
    <ul class={clx(`flex flex-wrap gap-2 pb-4`, flexDirection)}>
      {values.map((item) => {
        return <ValueItem {...item} />;
      })}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const processed = [];
  if (filters.length <= 0) {
    return null;
  }

  const selectedFilters = filters.reduce<FilterToggleValue[]>(
    (initial, filter) => {
      const selected = filter.values.find((value) => value.selected);
      if (!selected) return initial;

      return [...initial, selected];
    },
    [],
  );

  console.log("selectedFilters", selectedFilters);

  return (
    <aside class="place-self-start flex flex-col w-full">
      {selectedFilters.length > 0 && (
        <div class="border-b border-gray-300 mb-4">
          <label class="flex justify-between text-base font-semibold flex items-center pb-4">
            Filtros selecionados:
          </label>
          <ul class="flex flex-col flex-wrap gap-2 pb-4">
            {selectedFilters.map((item) => <ValueItem {...item} />)}
          </ul>
        </div>
      )}
      <label class="flex justify-between text-base lg:text-lg font-semibold pb-4 flex items-center border-b border-gray-300">
        Filtros
      </label>
      <ul class="flex flex-col p-5 sm:p-0">
        {filters
          .filter(isToggle)
          .map((filter) => {
            let label = filter.label;
            if (label === "sellerName") label = "Vendedores";
            if (label === "PriceRanges") label = "Preços";
            if (label === "Departments") label = "Departamentos";
            if (label === "Brands") label = "Marcas";
            if (label === "Categories") label = "Categorias";
            if (filter.values.length <= 0) return null;
            return (
              <li class="flex flex-col gap-4 border-b border-gray-300">
                <Collapsable
                  class=""
                  title={
                    <div class="flex items-center space-between py-4 gap-5 lg:gap-0">
                      <span>{label}</span>
                      <div class="w-[14px] h-[14px]">
                        <Icon
                          class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                          id="arrow-down"
                          size={13}
                        />
                      </div>
                    </div>
                  }
                >
                  <FilterValues {...filter} />
                </Collapsable>
              </li>
            );
          })}
      </ul>
    </aside>
  );
}

export default Filters;
