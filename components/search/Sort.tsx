import { useState } from "preact/hooks";
import { ProductListingPage } from "apps/commerce/types.ts";

import Icon from "../../components/ui/Icon.tsx";

const SORT_QUERY_PARAM = "sort";
const PAGE_QUERY_PARAM = "page";

export type Props = Pick<ProductListingPage, "sortOptions"> & { url: string };

const getUrl = (href: string, value: string) => {
  const url = new URL(href);

  url.searchParams.delete(PAGE_QUERY_PARAM);
  url.searchParams.set(SORT_QUERY_PARAM, value);

  return url.href;
};

const labels: Record<string, string> = {
  "relevance:desc": "Relevância",
  "price:desc": "Maior Preço",
  "price:asc": "Menor Preço",
  "orders:desc": "Mais vendidos",
  "name:desc": "Nome - de Z a A",
  "name:asc": "Nome - de A a Z",
  "release:desc": "Lançamento",
  "discount:desc": "Maior desconto",
};

function Sort({ sortOptions, url }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const current = getUrl(
    url,
    new URL(url).searchParams.get(SORT_QUERY_PARAM) ?? "",
  );
  const options = sortOptions?.map(({ value, label }) => ({
    value: getUrl(url, value),
    label,
  }));

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropdown = () => {
    setIsOpen(false);
  };

  const regex = /sort=([a-zA-Z]+)/;

  const match = current.match(regex);
  let sortValue = "";

  if (match && match[1]) {
    sortValue = match[1];
  }

  let selectedLabel = "";

  switch (sortValue) {
    case "OrderByScoreDESC":
      selectedLabel = "Relevância";
      break;
    case "OrderByPriceDESC":
      selectedLabel = "Maior Preço";
      break;
    case "OrderByPriceASC":
      selectedLabel = "Menor Preço";
      break;
    case "OrderByTopSaleDESC":
      selectedLabel = "Mais vendidos";
      break;
    case "OrderByNameDESC":
      selectedLabel = "Nome - de Z a A";
      break;
    case "OrderByNameASC":
      selectedLabel = "Nome - de A a Z";
      break;
    case "OrderByReleaseDateDESC":
      selectedLabel = "Lançamento";
      break;
    case "OrderByBestDiscountDESC":
      selectedLabel = "Maior desconto";
      break;
    default:
      selectedLabel = "Ordenar por";
  }

  return (
    <div
      class={`relative rounded-[10px] border border-gray-300 shadow-sm inline-block text-left w-full max-w-fit ${
        isOpen && "bg-white rounded-b-none border-b-0"
      }`}
    >
      <div class="relative z-[3]">
        <button
          type="button"
          class="flex items-center gap-2 w-full px-4 py-2 bg-transparent text-xs font-bold text-primary focus:outline-none"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          {selectedLabel}
          <Icon
            class={`${
              isOpen && "rotate-180"
            } transition-all ease-in-out duration-[400ms]`}
            id={"arrowRight"}
            size={13}
          />
        </button>
      </div>

      {isOpen && (
        <div
          class="origin-top-right absolute right-0 mt-[1px] w-full rounded-[10px] rounded-t-none shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-[2] overflow-hidden border-t-0"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div role="none">
            {options.map(({ value, label }, index) => (
              <a
                href={value}
                class="block px-[10px] py-2 text-[10px] text-black font-semibold hover:bg-gray-100 border-b border-gray-200 first:border-t-0 last:border-b-0"
                role="menuitem"
                tabIndex={-1}
                key={value}
                onClick={closeDropdown}
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                {labels[label] ?? label}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Sort;
