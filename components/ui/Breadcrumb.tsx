import type { BreadcrumbList } from "apps/commerce/types.ts";
import { relative } from "../../sdk/url.ts";

interface Props {
  itemListElement: BreadcrumbList["itemListElement"];
}

function Breadcrumb({ itemListElement = [] }: Props) {
  const items = [{ name: "Home", item: "/" }, ...itemListElement];

  return (
    <ul class="flex items-center flex-wrap gap-1 text-xs text-dark-gray">
      {items
        .filter(({ name, item }) => name && item)
        .map(({ name, item }, index) => {
          if (index === 0) {
            return (
              <li>
                <a href={relative(item)}>{name}</a>
              </li>
            );
          }
          return (
            <li class="before:content-['/'] flex items-center gap-1">
              <a href={relative(item)}>{name}</a>
            </li>
          );
        })}
    </ul>
  );
}

export default Breadcrumb;
