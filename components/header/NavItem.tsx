import {
  HEADER_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_DESKTOP,
} from "../../constants.ts";

import Icon from "../ui/Icon.tsx";

/** @titleBy name */
export interface Children {
  name: string;
  url: string;
  isBold?: boolean;
  /** @title Filhos */
  children?: Children[];
}

/** @titleBy name */
export interface INavItem {
  /** @title Texto */
  name: string;
  /** @title Link */
  url?: string;
  /** @title Icone */
  icon?: "sac" | "account_blue";
  /** @title Filhos */
  children?: Children[];
  /** @title Item possui destaque? */
  ishighlighted?: boolean;
  /** @title Item possui negrito? */
  isBold?: boolean;
}

interface Props {
  item: INavItem;
}

function NavItem({ item }: Props) {
  const { url, name, children } = item;

  return (
    <li
      class="group flex items-center pr-5"
      style={{ height: NAVBAR_HEIGHT_DESKTOP }}
    >
      <a
        href={url}
        class="group-hover:underline text-base/5 font-medium"
      >
        {name}
      </a>

      {children && children.length > 0 &&
        (
          <div
            class="fixed hidden hover:flex group-hover:flex bg-base-100 z-40 items-start justify-center gap-6 border-t-2 border-b-2 border-base-200 w-screen"
            style={{
              top: "0px",
              left: "0px",
              marginTop: HEADER_HEIGHT_DESKTOP,
            }}
          >
            <ul class="flex items-start justify-center gap-6">
              {children.map((node) => (
                <li class="p-6">
                  <a class="hover:underline" href={node.url}>
                    <span>{node.name}</span>
                  </a>

                  <ul class="flex flex-col gap-1 mt-4">
                    {node.children?.map((leaf) => (
                      <li>
                        <a class="hover:underline" href={leaf.url}>
                          <span class="text-xs">{leaf.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
