import type { SKU } from "apps/vtex/utils/types.ts";
import { useId } from "../../sdk/useId.ts";
import { useComponent } from "../../sections/Component.tsx";

export interface Props {
  items: SKU[];
}

export default function Form({ items }: Props) {
  const slot = useId();

  return (
    <div>
      <div class="uppercase text-xs font-semibold mb-2">Calcule o frete</div>
      <form
        class="flex gap-[11px] mt-2"
        hx-target={`#${slot}`}
        hx-swap="innerHTML"
        hx-sync="this:replace"
        hx-post={useComponent(import.meta.resolve("./Results.tsx"), {
          items,
        })}
      >
        <input
          as="input"
          type="text"
          class="input input-bordered w-48 rounded-[10px] bg-white text-xs w-full max-w-[212px] placeholder:text-black text-black"
          placeholder="Informe o CEP"
          name="postalCode"
          maxLength={9}
        />
        <button
          type="submit"
          class="no-animation bg-primary text-white text-xs font-semibold rounded-[39px] p-4 max-w-[127px] w-full"
        >
          <span class="[.htmx-request_&]:hidden inline">Calcular</span>
          <span class="hidden [.htmx-request_&]:inline-block loading loading-spinner loading-xs" />
        </button>
      </form>
      <a
        href="https://buscacepinter.correios.com.br/app/endereco/index.php"
        target="_blank"
        class="text-xs text-black font-normal underline mt-3"
      >
        Descobrir meu CEP
      </a>
      <div id={slot} />
    </div>
  );
}
