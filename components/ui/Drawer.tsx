import { type ComponentChildren } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import Icon from "./Icon.tsx";
import { useScript } from "@deco/deco/hooks";
export interface Props {
  open?: boolean;
  class?: string;
  children?: ComponentChildren;
  aside: ComponentChildren;
  id?: string;
  buyTogether?: boolean;
}
const script = (id: string) => {
  const handler = (e: KeyboardEvent) => {
    if (e.key !== "Escape" && e.keyCode !== 27) {
      return;
    }
    const input = document.getElementById(id) as HTMLInputElement | null;
    if (!input) {
      return;
    }
    input.checked = false;
  };
  addEventListener("keydown", handler);
};
function Drawer(
  { children, aside, open, class: _class = "", id = useId() }: Props,
) {
  return (
    <>
      <div class={clx("drawer", _class)}>
        <input
          id={id}
          name={id}
          checked={open}
          type="checkbox"
          class="drawer-toggle"
          aria-label={open ? "open drawer" : "closed drawer"}
        />
        <div class="drawer-content">{children}</div>
        <aside
          data-aside
          class={clx(
            "drawer-side h-full z-40 overflow-hidden",
            "[[data-aside]&_section]:contents",
          )}
        >
          <label for={id} class="drawer-overlay" />
          {aside}
        </aside>
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: useScript(script, id) }}
      />
    </>
  );
}
interface AsideProps {
  title?: string;
  drawer: string;
  children: ComponentChildren;
  background?: string;
  color?: string;
  sizeMenu?: boolean;
  isMinicart?: boolean;
  layout: "minicart" | "menu" | "searchBar";
}
function Aside({ drawer, children, layout }: AsideProps) {
  switch (layout) {
    case "minicart":
      return (
        <div class="w-full max-w-[100vw] sm:max-w-[400px] lg:max-w-[800px] overflow-y-auto lg:overflow-y-hidden h-screen bg-base-100 sm:rounded-l-3xl">
          {children}
        </div>
      );
    case "menu":
      return (
        <div
          data-aside
          class="bg-white h-full divide-y w-full max-w-[388px] flex flex-col overflow-y-auto"
        >
          <div
            class={`flex justify-between items-center pr-5 max-w-[388px] absolute right-0 top-[20px]`}
          >
            <label class="cursor-pointer" for={drawer} aria-label="X">
              <Icon id="close-black" />
            </label>
          </div>
          {children}
        </div>
      );
    case "searchBar":
      return (
        <div
          data-aside
          class="bg-light-gray h-full divide-y w-full flex flex-col"
        >
          <div
            class={`flex justify-between items-center bg-primary h-[58px] p-5`}
          >
            <p class="text-base font-semibold text-white">Buscar</p>
            <label for={drawer} aria-label="X">
              <Icon id="close-white" />
            </label>
          </div>
          {children}
        </div>
      );
  }
}
Drawer.Aside = Aside;
export default Drawer;
