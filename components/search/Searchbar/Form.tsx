import { Suggestion } from "apps/commerce/types.ts";
import { Resolved } from "deco/mod.ts";
import {
  SEARCHBAR_INPUT_FORM_ID,
  SEARCHBAR_POPUP_ID,
} from "../../../constants.ts";
import { useId } from "../../../sdk/useId.ts";
import { useComponent } from "../../../sections/Component.tsx";
import Icon from "../../ui/Icon.tsx";
import { Props as SuggestionProps } from "./Suggestions.tsx";
import { useScript } from "@deco/deco/hooks";
import { asResolved } from "@deco/deco";
export const ACTION = "/s";
export const NAME = "q";
export interface SearchbarProps {
  placeholder?: string;
  loader: Resolved<Suggestion | null>;
  /** @hidden */
  searchBarDrawer?: boolean;
}
const script = (formId: string, name: string, popupId: string) => {
  const form = document.getElementById(formId) as HTMLFormElement | null;
  const input = form?.elements.namedItem(name) as HTMLInputElement | null;
  form?.addEventListener("submit", () => {
    const search_term = input?.value;
    if (search_term) {
      window.DECO.events.dispatch({
        name: "search",
        params: { search_term },
      });
    }
  });
  addEventListener("keydown", (e: KeyboardEvent) => {
    const isK = e.key === "k" || e.key === "K" || e.keyCode === 75;
    if (e.metaKey === true && isK) {
      const input = document.getElementById(popupId) as HTMLInputElement | null;
      if (input) {
        input.checked = true;
        document.getElementById(formId)?.focus();
      }
    }
  });
};
const Suggestions = import.meta.resolve("./Suggestions.tsx");
export default function Searchbar(
  { placeholder = "O que deseja?", loader, searchBarDrawer }: SearchbarProps,
) {
  const slot = useId();
  return (
    <div class="search-bar-container w-full lg:w-[300px] lg:hover:w-[50vw] flex justify-end">
      <div
        class={`search-bar-wrapper w-full relative lg:max-w-[300px] lg:hover:max-w-[50vw] ${
          searchBarDrawer ? "gap-[unset]" : ""
        }`}
      >
        <div class="search-bar-container flex items-center justify-end gap-2">
          {
            /* <button
            type="submit"
            form={SEARCHBAR_INPUT_FORM_ID}
            class="bg-transparent border-none hidden md:block w-6 p-0"
            aria-label="Search"
            tabIndex={-1}
          >
            <span class="loading loading-spinner loading-xs hidden [.htmx-request_&]:inline" />
            {searchBarDrawer
              ? (
                <Icon
                  id="search-drawer"
                  class="inline [.htmx-request_&]:hidden"
                />
              )
              : <Icon id="search" class="inline [.htmx-request_&]:hidden" />}
          </button> */
          }
          <form
            id={SEARCHBAR_INPUT_FORM_ID}
            action={ACTION}
            class={`join flex gap-[20px] lg:gap-0 ${
              searchBarDrawer ? "my-5 w-full px-5" : ""
            }`}
          >
            <button
              type="submit"
              form={SEARCHBAR_INPUT_FORM_ID}
              class="bg-transparent border-none lg:absolute lg:-left-10 lg:top-1/2 lg:-translate-y-1/2"
              aria-label="Search"
              tabIndex={-1}
            >
              {searchBarDrawer
                ? <Icon id="search-drawer" class="inline" />
                : <Icon id="search" class="inline" />}
            </button>
            <input
              type="text"
              name={NAME}
              class={`rounded-[30px] outline-none py-[8.5px] px-5 placeholder-middle-gray w-full lg:w-auto`}
              placeholder={placeholder}
              autocomplete="off"
              data-hx-target={`#${slot}`}
              data-hx-post={loader &&
                useComponent<SuggestionProps>(Suggestions, {
                  loader: asResolved(loader),
                })}
              data-hx-trigger={`input changed delay:100ms, ${NAME}`}
              data-hx-indicator={`#${SEARCHBAR_INPUT_FORM_ID}`}
              data-hx-swap="innerHTML"
              data-hx-focus={`border-black`}
            />
          </form>
        </div>

        {/* Suggestions slot */}
        <div
          class="suggestions-wrapper lg:absolute right-0 lg:bg-white px-5 pt-0 lg:py-8"
          id={slot}
        />

        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(
              script,
              SEARCHBAR_INPUT_FORM_ID,
              NAME,
              SEARCHBAR_POPUP_ID,
            ),
          }}
        />
      </div>
    </div>
  );
}
