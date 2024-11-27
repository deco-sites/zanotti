import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import type { JSX } from "preact";

export default function (id_?: string) {
  const id = id_ || useId();

  return {
    Collapsable: ({
      children,
      open,
      ...props
    }: JSX.IntrinsicElements["div"] & {
      open?: boolean;
    }) => (
      <div {...props}>
        <input
          type="checkbox"
          id={id}
          class="hidden peer"
          checked={open}
        />
        {children}
      </div>
    ),

    Trigger: (props: JSX.IntrinsicElements["label"]) => (
      <label
        {...props}
        for={id}
        class={clx("cursor-pointer select-none", props.class as string)}
      />
    ),

    ContentWrapper: ({
      customTransition,
      ...props
    }: JSX.IntrinsicElements["div"] & {
      customTransition?: boolean;
    }) => (
      <div
        {...props}
        class={clx(
          "group grid transition-all",
          !customTransition && "grid-rows-[0fr] peer-checked:grid-rows-[1fr]",
          props.class as string,
        )}
      />
    ),

    Content: (
      props: JSX.IntrinsicElements["div"] & { noOverflow?: boolean },
    ) => (
      <div
        {...props}
        class={clx(
          "[grid-row:1_/_span_2]",
          !props.noOverflow && "overflow-hidden",
          props.class as string,
        )}
      />
    ),
    close() {
      const e = document.getElementById(id) as HTMLInputElement;

      if (!e) throw new Error(`Collapsable ${id} not found`);

      e.checked = false;
    },
    open() {
      const e = document.getElementById(id) as HTMLInputElement;

      if (!e) throw new Error(`Collapsable ${id} not found`);

      e.checked = true;
    },
    isOpen() {
      const e = document.getElementById(id) as HTMLInputElement;

      if (!e) throw new Error(`Collapsable ${id} not found`);

      return e.checked;
    },
    id,
  };
}
