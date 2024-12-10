import { Suggestion } from "apps/commerce/types.ts";
import type { AppContext } from "../../../apps/site.ts";
import { clx } from "../../../sdk/clx.ts";
import { ComponentProps } from "../../../sections/Component.tsx";
import ProductSuggestionsCard from "../../product/ProductSuggestionsCard.tsx";
import { ACTION, NAME } from "./Form.tsx";
import Image from "apps/website/components/Image.tsx";
import { type Resolved } from "@deco/deco";
export interface Props {
    /**
     * @title Suggestions Integration
     * @todo: improve this typings ({query: string, count: number}) => Suggestions
     */
    loader: Resolved<Suggestion | null>;
}
export const action = async (props: Props, req: Request, ctx: AppContext) => {
    const { loader: { __resolveType, ...loaderProps } } = props;
    const form = await req.formData();
    const query = `${form.get(NAME ?? "q")}`;
    // @ts-expect-error This is a dynamic resolved loader
    const suggestion = await ctx.invoke(__resolveType, {
        ...loaderProps,
        query,
    }) as Suggestion | null;
    return { suggestion };
};
export const loader = async (props: Props, req: Request, ctx: AppContext) => {
    const { loader: { __resolveType, ...loaderProps } } = props;
    const query = new URL(req.url).searchParams.get(NAME ?? "q");
    // @ts-expect-error This is a dynamic resolved loader
    const suggestion = await ctx.invoke(__resolveType, {
        ...loaderProps,
        query,
    }) as Suggestion | null;
    return { suggestion };
};
function Suggestions({ suggestion }: ComponentProps<typeof loader, typeof action>) {
    const { products = [], searches = [] } = suggestion ?? {};
    const hasProducts = Boolean(products?.length || false);
    const hasTerms = Boolean(searches.length);
    return (<div class={clx(``, !hasProducts && !hasTerms && "flex")}>
      <div class="flex flex-col lg:flex-row py-5 lg:py-8">
        {hasTerms && (<div class="flex flex-col lg:pr-14 pb-5">
            <span class="font-semibold text-sm uppercase text-primary pb-2 lg:pb-3" role="heading" aria-level={3}>
              Sugestões
            </span>
            <ul class="flex flex-col gap-3">
              {searches.map(({ term }) => (<li>
                  <a href={`${ACTION}?${NAME}=${term}`}>
                    <span class="text-dark-gray text-[13px] lg:text-sm" dangerouslySetInnerHTML={{ __html: term }}/>
                  </a>
                </li>))}
            </ul>
          </div>)}
        <div class="flex flex-col gap-3 max-w-80">
          {products.length > 0
            ? (<>
                {products.slice(0, 3).map((product, index) => (<ProductSuggestionsCard index={index} product={product}/>))}
              </>)
            : null}
        </div>
      </div>
    </div>);
}
export default Suggestions;
