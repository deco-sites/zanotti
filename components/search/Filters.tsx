import { useState } from "preact/hooks";
import type {
  Filter,
  FilterToggle,
  FilterToggleValue,
  ProductListingPage,
} from "apps/commerce/types.ts";
import { clx } from "../../sdk/clx.ts";
import Icon from "../ui/Icon.tsx";
import Collapsable from "../ui/Collapsable.tsx";

interface Props {
  filters: ProductListingPage["filters"];
}

const isToggle = (filter: Filter): filter is FilterToggle =>
  filter["@type"] === "FilterToggle";

function ValueItem(
  { url, selected, label, quantity, onClear }: FilterToggleValue & { onClear: () => void },
) {
  return (
    <li class="flex items-center gap-2 relative">
      <a
        href={url}
        rel="nofollow"
        class="absolute top-0 left-0 w-full h-full z-[1]"
      />
      <input
        type="checkbox"
        checked={selected}
        class="checkbox checkbox-sm"
        readOnly
      />
      <span class="text-xs font-semibold">{label}</span>
      {selected && (
        <button
          onClick={onClear}
          class="ml-2 text-red-500 text-xs hover:text-red-700 transition-all"
        >
          Limpar
        </button>
      )}
    </li>
  );
}

function FilterValues(
  { key, values, onClear }: {
    key: string;
    values: FilterToggleValue[];
    onClear: (filterKey: string) => void;
  },
) {
  const avatars = key === "tamanho" || key === "cor";
  const flexDirection = avatars ? "flex-row items-center" : "flex-col";

  return (
    <ul class={clx(`flex flex-wrap gap-2 pb-4`, flexDirection)}>
      {values.map((item) => <ValueItem {...item} onClear={() => onClear(key)} />)}
    </ul>
  );
}

function Filters({ filters }: Props) {
  const [filterState, setFilterState] = useState(filters);

  const handleClear = (filterKey: string) => {
    setFilterState((prevFilters) => {
      return prevFilters.map((filter) => {
        if (filter.key === filterKey && isToggle(filter)) {
          const updatedValues = filter.values.map((value) => ({
            ...value,
            selected: false,
          }));
          return { ...filter, values: updatedValues };
        }
        return filter;
      });
    });
  };

  const handleClearAll = () => {
    setFilterState((prevFilters) => {
      return prevFilters.map((filter) => {
        if (isToggle(filter)) {
          const updatedValues = filter.values.map((value) => ({
            ...value,
            selected: false,
          }));
          return { ...filter, values: updatedValues };
        }
        return filter;
      });
    });
  };


  if (filters.length <= 0) {
    return null;
  }

  return (
    <ul class="flex flex-col p-5 sm:p-0">
      {filterState
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
                <FilterValues
                  key={filter.key}
                  values={filter.values}
                  onClear={handleClear}
                />
              </Collapsable>
            </li>
          );
        })}

    </ul>
  );
}

export default Filters;
