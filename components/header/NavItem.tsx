import {
  HEADER_HEIGHT_DESKTOP,
  NAVBAR_HEIGHT_DESKTOP,
} from "../../constants.ts";

/** @titleBy name */
export interface Children {
  /** @title Texto */
  name: string;
  /** @title Link */
  url: string;
}

/** @titleBy name */
export interface INavItem {
  /** @title Texto */
  name: string;
  /** @title Link */
  url?: string;
  /** @title Filhos */
  children?: Children[];
  /** @title Item possui destaque? */
  ishighlighted?: boolean;
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
                </li>
              ))}
            </ul>
          </div>
        )}
    </li>
  );
}

export default NavItem;
