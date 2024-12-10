import { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSection } from "@deco/deco/hooks";
export interface Props {
  /** @title Titulo da sessão  */
  title?: string;
}
function Header({ title }: Props) {
  if (!title) {
    return null;
  }
  return (
    <h2 class="text-lg lg:text-xl font-semibold font-secondary">
      {title}
    </h2>
  );
}
interface Tab {
  title: string;
}
function Tabbed({ tabs, current = 0, children }: {
  tabs: Tab[];
  /** @description Current tab index. Defaults to 0 */
  current?: number;
  children: JSX.Element;
}) {
  const id = useId();
  return (
    <>
      <div class="flex sm:px-0 gap-3">
        <div role="tablist" class="tabs gap-3">
          {tabs.map((tab, index) => (
            <button
              role="tab"
              class={clx(
                "tab tab-lg rounded-full",
                index === current
                  ? "tab-active bg-primary bg-opacity-15"
                  : "bg-base-200",
                "gap-2",
              )}
              hx-get={useSection({ props: { tabIndex: index } })}
              hx-swap="outerHTML"
              hx-target="closest section"
              hx-indicator={`#${id}`}
            >
              <span>{tab.title}</span>
            </button>
          ))}
        </div>

        <span
          id={id}
          class="[.htmx-request&]:inline hidden loading loading-spinner loading-xs"
        />
      </div>

      {children}
    </>
  );
}
function Container({ class: _class, ...props }: JSX.IntrinsicElements["div"]) {
  return (
    <div
      {...props}
      class={clx(
        "container flex flex-col gap-3 w-full",
        _class?.toString(),
      )}
    />
  );
}
function Section() {}
Section.Container = Container;
Section.Header = Header;
Section.Tabbed = Tabbed;
export default Section;
