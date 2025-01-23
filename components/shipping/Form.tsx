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
        class="mt-2"
        hx-target={`#${slot}`}
        hx-swap="innerHTML"
        hx-sync="this:replace"
        hx-post={useComponent(import.meta.resolve("./Results.tsx"), {
          items,
        })}
      >
        <div class="join">
          <input
            as="input"
            type="text"
            class="input input-bordered join-item w-48 rounded-full bg-white text-sm w-[250px] placeholder:text-black text-black"
            placeholder="Informe o CEP"
            name="postalCode"
            maxLength={9}
          />
          <button
            type="submit"
            class="join-item no-animation bg-primary text-white text-xs font-semibold !rounded-full -ml-5 p-4 w-[127px] w-full flex justify-center z-[1]"
          >
            <span class="[.htmx-request_&]:hidden inline">Calcular</span>
            <span class="hidden [.htmx-request_&]:block loading loading-spinner loading-xs" />
          </button>
        </div>
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
