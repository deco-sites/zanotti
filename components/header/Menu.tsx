import Icon from "../ui/Icon.tsx";
import Collapsable from "./../ui/Collapsable.tsx";
import { useScript } from "@deco/deco/hooks";

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
              id="arrow-right"
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
      <div class="bg-white min-h-screen">
        <div class="text-primary font-semibold px-4">
          <a
            id="loginButton"
            class="h-14 flex items-center font-semibold text-sm border-b border-b-middle-gray"
          >
            <Icon class="mr-2" id="account_blue" />
            <span />
          </a>
          <a
            href="https://www.b2b.eletrotrafo.com.br/"
            class="h-14 flex items-center font-semibold text-sm border-b border-b-middle-gray"
          >
            Loja B2B
          </a>
          <a
            href="/atendimento"
            class="h-14 flex items-center font-semibold text-sm border-b border-b-middle-gray"
          >
            <Icon class="mr-2" id="sac" />
            Atendimento
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
