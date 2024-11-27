import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductCard from "../../components/product/ProductCard.tsx";
import Filters from "../../components/search/Filters.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import Breadcrumb from "../ui/Breadcrumb.tsx";
import Drawer from "../ui/Drawer.tsx";
import Sort from "../../islands/Sort.tsx";
import { useDevice, useScript } from "@deco/deco/hooks";
import { type SectionProps } from "@deco/deco";
import type { AppContext } from "../../apps/site.ts";
export interface Layout {
  /**
   * @title Pagination
   * @description Format of the pagination
   */
  pagination?: "show-more" | "pagination";
}
export interface Props {
  /** @title Integration */
  page: ProductListingPage | null;
  layout?: Layout;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
  /** @hidden */
  partial?: "hideMore" | "hideLess";
}
function NotFound() {
  return (
    <>
      <div class="w-full flex justify-center items-center py-10">
        <span>Not Found!</span>
      </div>
    </>
  );
}
const useUrlRebased = (overrides: string | undefined, base: string) => {
  let url: string | undefined = undefined;
  if (overrides) {
    const temp = new URL(overrides, base);
    const final = new URL(base);
    final.pathname = temp.pathname;
    for (const [key, value] of temp.searchParams.entries()) {
      final.searchParams.set(key, value);
    }
    url = final.href;
  }
  return url;
};
function PageResult(props: SectionProps<typeof loader>) {
  const {
    layout,
    startingPage = 0,
    url,
    internationalFlag,
    promoFlag,
    newsFlag,
  } = props;
  const page = props.page!;
  const { products, pageInfo } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const prev = pageInfo.currentPage - startingPage;
  const next = pageInfo.currentPage + startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const nextPageUrl = useUrlRebased(pageInfo.nextPage, url);
  const prevPageUrl = useUrlRebased(pageInfo.previousPage, url);
  return (
    <div class="grid grid-flow-row grid-cols-1 place-items-center mx-auto">
      <div
        data-product-list
        class={clx(
          "grid items-center",
          "flex gap-2",
          "grid-cols-2 sm:grid-cols-4 lg:gap-4",
          "w-full pb-5",
        )}
      >
        {products?.map((product, index) => (
          <ProductCard
            key={`product-card-${product.productID}`}
            flags={[internationalFlag, promoFlag, newsFlag]}
            product={product}
            preload={index === 0}
            index={offset + index}
            class="h-full min-w-[160px] max-w-[300px]"
          />
        ))}
      </div>

      <div class="py-5 sm:pt-10 w-full flex justify-center">
        <div class="join lg:flex gap-[30px] items-center text-base">
          <a
            rel="prev"
            aria-label="previous page link"
            href={prevPageUrl ?? "#"}
            disabled={!prevPageUrl}
            class=""
          >
            <Icon id="arrow-right" class="rotate-90" size={13} />
          </a>
          {prev === 0 ? null : (
            <a
              rel="prev"
              aria-label="previous page link"
              href={prevPageUrl ?? "#"}
              disabled={!prevPageUrl}
              class=""
            >
              {prev}
            </a>
          )}

          <span class="py-2 px-3 border border-primary">
            {zeroIndexedOffsetPage + 1}
          </span>
          {nextPageUrl
            ? (
              <a
                rel="next"
                aria-label="next page link"
                href={nextPageUrl ?? "#"}
                disabled={!nextPageUrl}
                class=""
              >
                {next}
              </a>
            )
            : null}

          <a
            rel="next"
            aria-label="next page link"
            href={nextPageUrl ?? "#"}
            disabled={!nextPageUrl}
            class=""
          >
            <Icon id="arrow-right" class="-rotate-90" size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
const setPageQuerystring = (page: string, id: string) => {
  const element = document.getElementById(id)?.querySelector(
    "[data-product-list]",
  );
  if (!element) {
    return;
  }
  new IntersectionObserver((entries) => {
    const url = new URL(location.href);
    const prevPage = url.searchParams.get("page");
    for (let it = 0; it < entries.length; it++) {
      if (entries[it].isIntersecting) {
        url.searchParams.set("page", page);
      } else if (
        typeof history.state?.prevPage === "string" &&
        history.state?.prevPage !== page
      ) {
        url.searchParams.set("page", history.state.prevPage);
      }
    }
    history.replaceState({ prevPage }, "", url.href);
  }).observe(element);
};
function Result(props: SectionProps<typeof loader>) {
  const container = useId();
  const controls = useId();
  const device = useDevice();
  const page = props.page!;
  const { startingPage = 0, url, partial } = props;
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo?.recordPerPage || products.length;
  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;
  const viewItemListEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item_list",
      params: {
        // TODO: get category name from search or cms setting
        item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
        item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
        items: page.products?.map((product, index) =>
          mapProductToAnalyticsItem({
            ...(useOffer(product.offers)),
            index: offset + index,
            product,
            breadcrumbList: page.breadcrumb,
          })
        ),
      },
    },
  });
  function extractSearchTerms() {
    const newURL = new URL(url);
    const search = newURL.search;
    const pathname = newURL.pathname;
    const match = search.match(/q=([^&]*)/);
    if (!match) {
      const temp = pathname.split("/");
      return temp[temp.length - 1];
    }
    if (match) {
      return match[1].replace(/\+/g, " ");
    } else {
      const pathMatch = url.match(/\/s\/([^?]*)/);
      return pathMatch ? pathMatch[1].replace(/\+/g, " ") : "";
    }
  }
  const result = extractSearchTerms();
  const sortBy = sortOptions.length > 0 && (
    <Sort sortOptions={sortOptions} url={url} />
  );
  return (
    <>
      {device === "desktop" && (
        <div class="flex justify-between flex-col items-start">
          <div class="w-full flex flex-col gap-8">
            <div class="border-b border-gray-300 mb-8">
              <div class="flex items-center space-between w-full container py-8 px-5">
                <h1 class="text-xl lg:text-3xl uppercase font-semibold flex items-center">
                  {result}{" "}
                  <span class="text-base lg:text-xl ml-2">
                    [{page.pageInfo.records}]
                  </span>
                </h1>
                <div class="w-fit">
                  {sortBy}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div id={container} {...viewItemListEvent} class="w-full">
        {partial
          ? <PageResult {...props} />
          : (
            <div class="flex flex-col gap-4 sm:gap-5 w-full">
              {device === "mobile" && (
                <>
                  <div class="w-full flex flex-col gap-6">
                    <div class="border-b border-gray-300">
                      <div class="flex items-center space-between w-full pt-5 pb-6 container mt-[5px]">
                        <h1 class="px-5 text-[20px] uppercase font-semibold flex items-center">
                          {result}{" "}
                          <span class="text-[14px] font-normal ml-4">
                            [{page.pageInfo.records}]
                          </span>
                        </h1>
                      </div>
                    </div>
                    <div class="container px-5">
                      <Breadcrumb
                        itemListElement={breadcrumb?.itemListElement}
                      />
                    </div>
                  </div>
                  <div class="px-5">
                    <Drawer
                      id={controls}
                      aside={
                        <div class="bg-base-100 flex flex-col h-full divide-y overflow-y-hidden min-w-[85vw]">
                          <div class="flex justify-between items-center bg-primary">
                            <p class="text-[20px] font-semibold py-[17px] flex items-center text-white px-5">
                              Filtros
                            </p>
                            <label class="btn btn-ghost" for={controls}>
                              <Icon id="close-white" />
                            </label>
                          </div>
                          <div class="flex-grow overflow-auto">
                            <Filters filters={filters} />
                          </div>
                        </div>
                      }
                    >
                      <div class="flex justify-between items-end">
                        <label
                          class="flex items-center gap-[43px] rounded-[10px] border border-gray-300 shadow-sm px-4 py-2 bg-transparent text-xs font-bold  focus:outline-none"
                          for={controls}
                        >
                          Filtrar

                          <Icon
                            class={` transition-all ease-in-out duration-[400ms]`}
                            id={"arrowRight"}
                            size={13}
                          />
                        </label>

                        <div class="flex flex-col">
                          {sortBy}
                        </div>
                      </div>
                    </Drawer>
                  </div>
                </>
              )}

              {device === "desktop" && (
                <div class="container px-5">
                  <Breadcrumb
                    itemListElement={breadcrumb?.itemListElement}
                  />
                </div>
              )}
              <div class="grid grid-cols-1 sm:grid-cols-[250px_1fr] gap-12 container px-5">
                {device === "desktop" && (
                  <aside class="place-self-start flex flex-col w-full">
                    <span class="text-base lg:text-lg font-semibold pb-4 flex items-center border-b border-gray-300">
                      Filtros
                    </span>

                    <Filters filters={filters} />
                  </aside>
                )}

                <div class="flex flex-col gap-10">
                  <PageResult {...props} />
                </div>
              </div>
            </div>
          )}
      </div>

      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(
            setPageQuerystring,
            `${pageInfo.currentPage}`,
            container,
          ),
        }}
      />
    </>
  );
}
function SearchResult({ page, ...props }: SectionProps<typeof loader>) {
  if (!page) {
    return <NotFound />;
  }
  return <Result {...props} page={page} />;
}
export const loader = (props: Props, req: Request, ctx: AppContext) => {
  const {
    internationalFlag = "",
    promoFlag = "",
    newsFlag = "",
  } = ctx;

  return {
    ...props,
    url: req.url,
    internationalFlag,
    promoFlag,
    newsFlag,
  };
};
export default SearchResult;
