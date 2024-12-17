import { Suggestion } from "apps/commerce/types.ts";
import { SEARCHBAR_INPUT_FORM_ID } from "../../../constants.ts";
import { useId } from "../../../sdk/useId.ts";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props as SuggestionProps } from "./Suggestions.tsx";
import { useScript } from "@deco/deco/hooks";
import { asResolved } from "@deco/deco";
import { type Resolved } from "@deco/deco";
export const ACTION = "/s";
export const NAME = "q";
export interface SearchbarProps {
    placeholder?: string;
    loader: Resolved<Suggestion | null>;
}
const script = (formId: string, name: string, slot: string) => {
    const form = document.getElementById(formId) as HTMLFormElement | null;
    const input = form?.elements.namedItem(name) as HTMLInputElement | null;
    const suggestionsContainer = document.getElementById(slot) as HTMLDivElement | null;
    const searchButton = document.getElementById("search") as HTMLButtonElement | null;
    const closeButton = document.getElementById("close") as HTMLButtonElement | null;
    closeButton?.addEventListener("click", () => {
        suggestionsContainer?.classList.add("hidden");
        suggestionsContainer?.classList.remove("block");
        closeButton?.classList.add("hidden");
        closeButton?.classList.remove("flex");
        searchButton?.classList.add("flex");
        searchButton?.classList.remove("hidden");
    });
    input?.addEventListener("input", () => {
        suggestionsContainer?.classList.add("block");
        suggestionsContainer?.classList.remove("hidden");
        closeButton?.classList.add("flex");
        closeButton?.classList.remove("hidden");
        searchButton?.classList.add("hidden");
        searchButton?.classList.remove("flex");
    });
    const searchDispatch = () => {
        const search_term = input?.value;
        if (search_term) {
            window.DECO.events.dispatch({
                name: "search",
                params: { search_term },
            });
        }
    };
    searchButton?.addEventListener("click", searchDispatch);
    form?.addEventListener("submit", searchDispatch);
};
const Suggestions = import.meta.resolve("./Suggestions.tsx");
export default function Searchbar({ placeholder = "O que deseja?", loader }: SearchbarProps) {
    const slot = useId();
    return (
        <div class="w-full max-w-2xl">
          <div class="w-full relative z-[3]">
            <div class="join flex gap-[20px] lg:gap-0 bg-white rounded-full pr-5 relative z-[2]">
              <form id={SEARCHBAR_INPUT_FORM_ID} action={ACTION} class="w-full">
                <input
                    type="text"
                    name={NAME}
                    class="text-[13px] lg:text-sm border-0 bg-transparent rounded-full outline-none py-2 pl-5 placeholder-middle-gray w-full"
                    placeholder={placeholder}
                    autocomplete="off"
                    data-hx-target={`#${slot}`}
                    data-hx-post={loader &&
                        useComponent<SuggestionProps>(Suggestions, {
                            loader: asResolved(loader),
                        }
                    )}
                    data-hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
                    data-hx-trigger={`input changed delay:100ms, ${NAME}`}
                    data-hx-focus="border-black"
                    data-hx-swap="innerHTML" 
                />
              </form>
              <button id="search" type="submit" form={SEARCHBAR_INPUT_FORM_ID} class="flex items-center justify-center bg-transparent border-none" aria-label="Search" tabIndex={-1}>
                <Icon id="search" size={18} class="inline"/>
              </button>
              <button id="close" class="hidden items-center justify-center bg-transparent border-none">
                <Icon id="close" size={18} class="inline"/>
              </button>
            </div>

            {/* Suggestions slot */}
            <div id={slot} class="w-full absolute left-0 top-[19px] bg-white px-5 z-[1] rounded-b-3xl shadow" />

            <script type="module" dangerouslySetInnerHTML={{
                __html: useScript(script, SEARCHBAR_INPUT_FORM_ID, NAME, slot),
            }}/>
          </div>
        </div>
    );
}
