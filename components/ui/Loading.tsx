import type { JSX } from "preact";
import { clx } from "../../sdk/clx.ts";

export default function (props: JSX.IntrinsicElements["span"]) {
  return (
    <span
      {...props}
      class={clx("loading loading-spinner", props.class as string)}
    />
  );
}
