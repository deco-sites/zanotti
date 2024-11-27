import { type JSX } from "preact";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "@deco/deco/hooks";
const onClick = (delta: number) => {
  // doidera!
  event!.stopPropagation();
  const button = event!.currentTarget as HTMLButtonElement;
  const input = button.parentElement
    ?.querySelector<HTMLInputElement>('input[type="number"]')!;
  const min = Number(input.min) || -Infinity;
  const max = Number(input.max) || Infinity;
  input.value = `${Math.min(Math.max(input.valueAsNumber + delta, min), max)}`;
  input.dispatchEvent(new Event("change", { bubbles: true }));
};
function QuantitySelector(
  { id = useId(), disabled, ...props }: JSX.IntrinsicElements["input"],
) {
  return (
    <div class="flex items-center justify-center flex-col w-fit">
      <p class="text-xs">
        Quantidade
      </p>
      <div class="flex ">
        <button
          type="button"
          class="text-primary text-sm font-bold"
          hx-on:click={useScript(onClick, -1)}
          disabled={disabled}
        >
          -
        </button>
        <div
          data-tip={`Quantity must be between ${props.min} and ${props.max}`}
          class={clx(
            "flex justify-center items-center ",
            "has-[:invalid]:tooltip has-[:invalid]:tooltip-error has-[:invalid]:tooltip-open has-[:invalid]:tooltip-bottom",
          )}
        >
          <input
            id={id}
            class={clx(
              "text-center [appearance:textfield] bg-transparent text-sm",
              "invalid:input-error",
            )}
            disabled={disabled}
            inputMode="numeric"
            type="number"
            {...props}
          />
        </div>
        <button
          type="button"
          class="text-primary text-sm font-bold"
          hx-on:click={useScript(onClick, 1)}
          disabled={disabled}
        >
          +
        </button>
      </div>
    </div>
  );
}
export default QuantitySelector;
