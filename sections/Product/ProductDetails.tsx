import Icon from "../../components/ui/Icon.tsx";
import Collapsable from "../../components/ui/Collapsable.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Description from "../../components/product/Description.tsx";

import type { SectionProps } from "@deco/deco";
import type { AppContext } from "../../apps/site.ts";
import type { ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  const {
    device,
    pixDiscount = 0,
  } = ctx;
  return { ...props, device, pixDiscount };
};

export default function ProductDetails(
  { page, device, pixDiscount }: SectionProps<typeof loader>,
) {
  if (!page) {
    return (
      <div class="w-full flex justify-center ite  ms-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Oops!</span>
          <a href="/" class="btn no-animation">
            Go back to Home
          </a>
        </div>
        <div class={`mx-auto flex flex-col items-center px-5`}>
          <p
            class={`text-black font-normal justify-center text-start lg:text-center text-base lg:text-[30px] w-full gap-1 lg:leading-[45px]`}
          >
            Tente ajustar os termos da sua busca ou verificar se não há erros de
            digitação.
          </p>
        </div>
        <a
          href="/"
          class="bg-primary rounded-full py-3 px-10 text-white mx-auto flex w-fit justify-center my-10"
        >
          Voltar para a home
        </a>
      </div>
    );
  }
  if (page) {
    const { product } = page;
    const {
      isVariantOf,
      additionalProperty = [],
    } = product;
    return (
      <>
        <ProductInfo
          page={page}
          device={device}
          pixDiscount={pixDiscount}
        />
        <div class="mt-0 lg:mt-12 relative z-[1] container">
          <Description page={page} />
        </div>
        {additionalProperty.length > 0 && (
          <div class="container mt-3">
            <Collapsable
              class="px-6 bg-white rounded-[35px]"
              title={
                <div class="flex space-between items-center">
                  <span class="text-base py-5 font-semibold">
                    Especificações Técnicas
                  </span>
                  <Icon
                    id="arrow-down"
                    size={13}
                    class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                  />
                </div>
              }
            >
              <div class="mb-5 w-full">
                {isVariantOf?.additionalProperty.map((property) => {
                  if (
                    ["viavarejogarantia", "FAQ"].includes(property?.name ?? "")
                  ) return null;
                  return (
                    <div class="px-3 py-2 w-full text-sm sm:text-base odd:bg-light-gray">
                      <span class="font-semibold after:content-[':'] max-sm:pb-0 mr-2">
                        {property.name}
                      </span>
                      {property.value}
                    </div>
                  );
                })}
              </div>
            </Collapsable>
          </div>
        )}
        {additionalProperty.length > 0 && (
          <>
            {isVariantOf?.additionalProperty.map((property) => {
              if (property?.name === "FAQ") {
                return (
                  <div class="container mt-3">
                    <Collapsable
                      class="px-6 bg-white rounded-[35px]"
                      title={
                        <div class="flex space-between items-center">
                          <span class="text-base py-5 font-semibold">
                            Dúvidas Frequentes
                          </span>
                          <Icon
                            id="arrow-down"
                            size={13}
                            class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                          />
                        </div>
                      }
                    >
                      <div class="mb-5 w-full">
                        <div
                          class="px-3 py-2 w-full text-sm sm:text-base"
                          dangerouslySetInnerHTML={{
                            __html: property.value?.replace(/\n/gi, "<br />") ||
                              "",
                          }}
                        />
                      </div>
                    </Collapsable>
                  </div>
                );
              }
            })}
          </>
        )}
      </>
    );
  }
}

export function LoadingFallback() {
  return (
    <div
      style={{ height: "710px" }}
      class="w-full flex justify-center items-center"
    >
      <span class="loading loading-spinner" />
    </div>
  );
}
