import Bag from "../../components/header/Bag.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Logo from "../../components/header/Logo.tsx";
import Menu from "../../components/header/Menu.tsx";
import Image from "apps/website/components/Image.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import SignIn from "../../components/header/SignIn.tsx";
import Alert from "../../components/header/Alert.tsx";
import Wishlist from "../../components/header/Wishlist.tsx";
import { INavItem } from "../../components/header/NavItem.tsx";
import type { ImageWidget, RichText } from "apps/admin/widgets.ts";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import {
  NAVBAR_HEIGHT_MOBILE,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import { useDevice, useSection } from "@deco/deco/hooks";
export function LoadingFallback() {
  return <div class="skeleton rounded-none h-[130px] lg:h-[109px]" />;
}

export interface Logo {
  src: ImageWidget;
  alt: string;
  width: number;
  height: number;
}

export interface SectionProps {
  alerts?: RichText[];
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /** @title Menu */
  navItems?: INavItem[] | null;
  /** @title Logo */
  logo: Logo;
  /** @hide true */
  variant?: "initial" | "menu";
}
type Props = Omit<SectionProps, "alert" | "variant">;
const Desktop = ({
  logo,
  searchbar,
  navItems = [],
}: Props) => (
  <>
    <div class="flex flex-col gap-5 py-5 container">
      <div class="flex items-center space-between">
        <Logo
          src={logo.src}
          alt={logo.alt}
          width={logo.width}
          height={logo.height}
        />

        <Searchbar {...searchbar} />

        <div class="flex gap-4 items-center place-self-end">
          <SignIn variant="desktop" />
          <Wishlist />
          <Bag />
        </div>
      </div>
      <div class="flex justify-between">
        {navItems?.length && navItems.map((item, index) => {
          const {
            navImage = "https://placehold.co/600x400",
            hasNavImage = false,
          } = item;

          return (
            <div class="dropdown dropdown-hover static">
              <div tabindex={index} class="text-sm text-white relative z-[2]">
                <a
                  class={`flex items-center gap-2 text-white ${
                    item.ishighlighted && "font-semibold"
                  }`}
                  href={item.url || "#"}
                >
                  {item.icon && (
                    <Image
                      src={item.icon}
                      width={18}
                      height={18}
                    />
                  )}
                  {item.name}

                </a>
              </div>
              {item.children && item.children?.length > 0 && (
                <div
                  tabindex={index}
                  class="dropdown-content menu top-[83px] p-0 pt-8 left-0 z-[1] w-full"
                >
                  <div class="bg-base-100 shadow rounded-box rounded-t-none">
                    <div className="container p-5 grid grid-cols-4 gap-5">
                      <ul>
                        {item.children.slice(0, 15).map((children) => (
                          <li>
                            <a class="text-black" href={children.url || "#"}>
                              {children.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                      <ul>
                        {item.children.slice(15, 30).map((children) => (
                          <li>
                            <a href={children.url || "#"}>{children.name}</a>
                          </li>
                        ))}
                      </ul>
                      {hasNavImage
                        ? (
                          <div class="col-span-2">
                            <Image
                              src={navImage}
                              class="rounded-xl"
                              width={600}
                              height={400}
                            />
                          </div>
                        )
                        : (
                          <>
                            <ul>
                              {item.children.slice(30, 45).map((children) => (
                                <li>
                                  <a href={children.url || "#"}>
                                    {children.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                            <ul>
                              {item.children.slice(45, 60).map((children) => (
                                <li>
                                  <a href={children.url || "#"}>
                                    {children.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </>
                        )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  </>
);
const Mobile = ({ logo, searchbar }: Props) => (
  <>
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
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width}
              height={logo.height}
            />
          </a>
        )}

        <div class="flex gap-3 items-center max-h-[30px]">
          <SignIn variant="mobile" />
          <Bag />
        </div>
      </div>

      <Searchbar {...searchbar} />
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
      <header>
        <div
          id="header"
          class="bg-primary w-full z-40 group-header ease-in duration-500 relative rounded-b-xl"
        >
          {device === "desktop"
            ? <Desktop logo={logo} {...props} />
            : <Mobile logo={logo} {...props} />}
        </div>
      </header>
      <Alert alerts={alerts} />
    </>
  );
}
export default function Section({ variant, ...props }: SectionProps) {
  if (variant === "menu") {
    return <Menu navItems={props.navItems ?? []} />;
  }
  return <Header {...props} />;
}
