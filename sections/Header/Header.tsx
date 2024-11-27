import Bag from "../../components/header/Bag.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Logo from "../../components/header/Logo.tsx";
import Menu from "../../components/header/Menu.tsx";
import Image from "apps/website/components/Image.tsx";
import Alert from "../../components/header/Alert.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import SignIn from "../../components/header/SignIn.tsx";
import Wishlist from "../../components/header/Wishlist.tsx";
import { INavItem } from "../../components/header/NavItem.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import {
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import { useDevice, useScript, useSection } from "@deco/deco/hooks";
export function LoadingFallback() {
  return <div class="skeleton rounded-none h-[130px] lg:h-[109px]" />;
}
const onLoad = () => {
  const body = document.querySelector("body");

  if (!body) {
    console.warn("Unable to find body element");
    return;
  }

  const homePage = globalThis.location.pathname === "/";
  const scrollY = globalThis.scrollY;
  if (scrollY > 50) {
    body.classList.add("is-scrolled");
  } else {
    body.classList.remove("is-scrolled");
  }

  if (homePage) {
    if (body.classList.contains("is-otherpage")) {
      body.classList.remove("is-otherpage");
    }
    body.classList.add("is-homepage");
  } else {
    if (body.classList.contains("is-homepage")) {
      body.classList.remove("is-homepage");
    }
    body.classList.add("is-otherpage");
  }

  setInterval(() => {
    const scrollY = globalThis.scrollY;
    if (scrollY > 50) {
      body.classList.add("is-scrolled");
    } else {
      body.classList.remove("is-scrolled");
    }
  }, 100);

  const header = document.getElementById("header");
  if (header) {
    header.classList.remove("hidden");
  }
};

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}
export interface SectionProps {
  alerts?: HTMLWidget[];
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: INavItem[] | null;
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /** @title Logo */
  logo: Logo;
  /** @hide true */
  variant?: "initial" | "menu";
}
type Props = Omit<SectionProps, "alert" | "variant">;
const Desktop = ({ logo, searchbar }: Props) => (
  <>
    <div class="flex flex-col gap-4 py-4 px-5 container desktop">
      <div class="flex items-center space-between relative">
        <div>
          <label
            for={SIDEMENU_DRAWER_ID}
            class="flex items-center text-white justify-start gap-[10px] cursor-pointer"
            aria-label="open menu"
            hx-target={`#${SIDEMENU_CONTAINER_ID}`}
            hx-swap="outerHTML"
            hx-trigger="click once"
            hx-get={useSection({ props: { variant: "menu" } })}
          >
            <Icon id="menu" class="mt-[2px]" />
            Todos os departamentos
          </label>
        </div>
        <Drawer
          id={SIDEMENU_DRAWER_ID}
          aside={
            <Drawer.Aside
              layout="menu"
              drawer={SIDEMENU_DRAWER_ID}
              sizeMenu={true}
            >
              <div
                id={SIDEMENU_CONTAINER_ID}
                class="h-full flex items-center justify-center"
              >
                <span class="loading loading-spinner" />
              </div>
            </Drawer.Aside>
          }
        />

        <div class="main-logo">
          <Logo
            src={logo.src}
            alt={logo.alt}
            width={logo.width}
            height={logo.height}
          />
        </div>

        <div class="flex gap-4 items-center place-self-end">
          <Searchbar {...searchbar} />
          <SignIn variant="desktop" />
          <Wishlist />
          <Bag />
        </div>
      </div>
    </div>
  </>
);
const Mobile = ({ logo, searchbar }: Props) => (
  <>
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside
          layout="searchBar"
          title="Buscar"
          drawer={SEARCHBAR_DRAWER_ID}
          background="bg-primary"
          color="text-white"
        >
          <div class="w-screen overflow-y-auto">
            <Searchbar {...searchbar} searchBarDrawer={true} />
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside
          layout="menu"
          title="Menu"
          drawer={SIDEMENU_DRAWER_ID}
          sizeMenu={true}
        >
          <div
            id={SIDEMENU_CONTAINER_ID}
            class="h-full flex items-center justify-center"
          >
            <span class="loading loading-spinner" />
          </div>
        </Drawer.Aside>
      }
    />
    <div
      class="flex flex-col place-items-center w-screen px-5 gap-2 py-3"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
      }}
    >
      <div class="flex items-center justify-between w-full relative">
        <label
          for={SIDEMENU_DRAWER_ID}
          class="btn btn-square btn-sm btn-ghost justify-start"
          aria-label="open menu"
          hx-target={`#${SIDEMENU_CONTAINER_ID}`}
          hx-swap="outerHTML"
          hx-trigger="click once"
          hx-get={useSection({ props: { variant: "menu" } })}
        >
          <Icon id="menu" size={24} />
        </label>

        {logo && (
          <a
            href="/"
            aria-label="Store logo"
            class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          >
            <Image src={logo.src} alt={logo.alt} width={94} height={21} />
          </a>
        )}

        <div class="flex gap-[15px] items-center max-h-[30px]">
          <SignIn variant="mobile" />
          <Bag />
        </div>
      </div>

      <div class="w-full">
        <label
          class="flex items-center gap-[15px]"
          for={SEARCHBAR_DRAWER_ID}
          aria-label="search icon button"
        >
          <Icon id="search" />
          <div class="bg-white w-full m-auto rounded-[33px] h-[30px]">
          </div>
        </label>
      </div>
    </div>
  </>
);
function Header({
  alerts = [],
  logo = {
    src:
      "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/11097/3e00d53d-696d-4266-972b-c5c50c5ac2f3",
    width: 100,
    height: 16,
    alt: "Logo",
  },
  ...props
}: Props) {
  const device = useDevice();
  return (
    <>
      {alerts.length > 0 && <Alert alerts={alerts} />}
      <header>
        <div
          id="header"
          class="hidden bg-transparent w-full z-40 group-header ease-in duration-500"
        >
          {device === "desktop"
            ? <Desktop logo={logo} {...props} />
            : <Mobile logo={logo} {...props} />}
        </div>
        {/* <MicroHeaderSetup threshold={50}/> */}
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(onLoad),
          }}
        />
      </header>
    </>
  );
}
export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }
  return <Header {...props} />;
}
