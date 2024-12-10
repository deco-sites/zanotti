import Icon from "../ui/Icon.tsx";
import Collapsable from "./../ui/Collapsable.tsx";
import { useScript } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy name */
export interface Children {
  /** @title Texto */
  name: string;
  /** @title Link */
  url: string;
}
/** @titleBy name */
export interface INavItem {
  icon?: ImageWidget;
  /** @title Texto */
  name: string;
  /** @title Item possui destaque? */
  ishighlighted?: boolean;
  /** @title Link */
  url?: string;
  /**
   * @title Imagem do Submenu
   * @description Aparece apenas no desktop, subir no formato 600x400
   */
  navImage?: ImageWidget;
  /**
   * @title Mostrar a Imagem?
   */
  hasNavImage?: boolean;
  /** @title Filhos */
  children?: Children[];
}
export interface Props {
  navItems: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <Collapsable
      title={
        <div
          className={`${
            item.ishighlighted ? "text-primary font-semibold" : "text-black"
          } flex items-center justify-between group`}
        >
          <a
            href={item.url}
            class="h-14 flex items-center text-sm"
          >
            {item.name}
          </a>
          {item?.children && item?.children.length > 0 && (
            <Icon
              class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
              size={13}
              id="arrow-down"
            />
          )}
        </div>
      }
    >
      <>
        {item.children && (
          <ul>
            {item.children.map((node, index) => (
              <li key={index}>
                <a
                  href={node.url}
                  class="h-14 flex items-center text-dark-gray text-sm"
                >
                  {node.name}
                </a>
              </li>
            ))}
          </ul>
        )}
      </>
    </Collapsable>
  );
}

function Menu({ navItems }: Props) {
  return (
    <>
      <div class="bg-white min-h-screen w-screen">
        <div class="text-primary font-semibold px-4">
          <a
            id="loginButton"
            class="h-14 flex items-center font-semibold text-sm border-b border-b-middle-gray"
          >
            <Icon class="mr-2" id="account_blue" />
            <span />
          </a>
        </div>
        <div class="text-primary font-semibold px-4">
          <a
            href="#"
            class="h-14 flex items-center font-semibold text-sm border-b border-b-middle-gray"
          >
            Lista de Desejos
          </a>
        </div>
        <div class="flex flex-col">
          <ul class="px-4 flex-grow flex flex-col divide-y divide-middle-gray">
            {navItems.map((item) => (
              <li>
                <MenuItem item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <script
        type="text/javascript"
        defer
        dangerouslySetInnerHTML={{
          __html: useScript(() => {
            window.STOREFRONT.USER.subscribe((sdk) => {
              const user = sdk.getUser();
              const loginButton = document.querySelector("#loginButton");
              const loginButtonContent = loginButton?.querySelector("span");
              if (user?.email && loginButton && loginButtonContent) {
                loginButtonContent.innerHTML = `Acesse sua conta`;
                // @ts-ignore .
                loginButton.href = "/account";
              } else if (loginButton && loginButtonContent) {
                loginButtonContent.innerHTML = `Entre ou cadastre-se`;
                // @ts-ignore .
                loginButton.href = "/login";
              }
            });
          }),
        }}
      />
    </>
  );
}

export default Menu;
