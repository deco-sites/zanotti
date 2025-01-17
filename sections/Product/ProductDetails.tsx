import Icon from "../../components/ui/Icon.tsx";
import Collapsable from "../../components/ui/Collapsable.tsx";
import BuyTogether from "../../components/product/BuyTogether.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Description from "../../components/product/Description.tsx";
import ProductGrid from "../../components/product/ProductGrid.tsx";
import { useScript } from "@deco/deco/hooks";
import type { SectionProps } from "@deco/deco";
import type { AppContext } from "../../apps/site.ts";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";
export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
  /** @hidden */
  isMobile: boolean;
  /** @hidden */
  productRecommendations: Product[];
  /** @title Omitir seção de entrega? */
  hiddenShipping?: boolean;
}
const onLoad = (productId: string, productName: string, image: string) => {
  // @ts-ignore _trustvox exists
  // globalThis._trustvox = [
  //   ["_storeId", "123535"],
  //   ["_productId", productId],
  //   ["_productName", productName],
  //   ["_productPhotos", [image]],
  // ];
  // const script = document.createElement("script");
  // script.id = "_trustvox_widget_script";
  // script.async = true;
  // script.type = "text/javascript";
  // script.src = "//static.trustvox.com.br/sincero/sincero.js";
  // document.head.append(script);
  // // @ts-ignore _trustvox_shelf_rate exists
  // const _trustvox_shelf_rate = globalThis._trustvox_shelf_rate || [];
  // _trustvox_shelf_rate.push(["_storeId", "123535"]);
};
export const loader = async (props: Props, _req: Request, ctx: AppContext) => {
  const {
    internationalFlag = "",
    promoFlag = "",
    newsFlag = "",
    HidePriceCollection = "",
  } = ctx;

  const { page } = props;
  if (page) {
    const { product } = page;

    // deno-lint-ignore no-explicit-any
    const productRecommendations = await (ctx as any).invoke.vtex.loaders.legacy
      .relatedProductsLoader({
        crossSelling: "whosawalsosaw",
        id: product.inProductGroupWithID,
      });

    return {
      ...props,
      internationalFlag,
      promoFlag,
      HidePriceCollection,
      newsFlag,
      isMobile: ctx.device !== "desktop",
      productRecommendations,
    };
  }

  return {
    ...props,
    internationalFlag,
    promoFlag,
    HidePriceCollection,
    newsFlag,
  };
};
export default function ProductDetails({
  page,
  internationalFlag,
  promoFlag,
  newsFlag,
  HidePriceCollection,
  isMobile,
  productRecommendations,
  hiddenShipping = false,
}: SectionProps<typeof loader>) {
  if (!page) {
    return (
      <div class=" py-[100px]">
        <div class="container px-5">
          <p class="text-[32px] lg:text-[64px] text-middle-gray text-start lg:text-center mx-auto">
            Oops!
          </p>
          <p class="text-[32px] lg:text-[64px] text-middle-gray text-start lg:text-center mx-auto">
            Página não encontrada.
          </p>
        </div>
        <div class={`mx-auto flex flex-col items-center px-5`}>
          <p
            class={`text-black font-normal justify-center text-start lg:text-center text-base lg:text-[30px] w-full gap-1 lg:leading-[45px]`}
          >
            Tente ajustar os termos da sua busca ou verificar se não há erros de
            digitação.
          </p>
        </div>
        <a href="/" class="bg-primary rounded-full py-3 px-10 text-white mx-auto flex w-fit justify-center my-10">Voltar para a home</a>
      </div>
    );
  }
  if (page) {
    const { product } = page;
    const {
      productID: productId,
      image: images,
      isVariantOf,
      additionalProperty: productProperties,
    } = product;
    const productName = (isVariantOf?.name ?? product.name) || "";
    const [front] = images ?? [];
    const image = front?.url || "";
    const device = isMobile ? "mobile" : "desktop";
    const { additionalProperty = [] } = isVariantOf ?? {};
    return (
      <>
        <ProductInfo
          flags={[internationalFlag, promoFlag, newsFlag, HidePriceCollection]}
          page={page}
          device={device}
          hiddenShipping={hiddenShipping}
        />
        <BuyTogether
          page={page}
          device={device}
          productRecommendations={productRecommendations}
        />
        <div class="border border-x-0 border-b-dark-gray border-t-0 lg:border-t-[1px] lg:border-t-dark-gray mt-0 lg:mt-12 relative z-[1]">
          <Description page={page} />
        </div>
        {additionalProperty.length > 0 && (
          <div
            id="specifications"
            class="pt-32 -mt-32 border border-x-0 border-b-dark-gray border-t-0"
          >
            <Collapsable
              class="container px-5"
              title={
                <div class="flex space-between items-center">
                  <span class="text-base lg:text-xl py-5 sm:py-12 font-semibold">
                    Especificações Técnicas
                  </span>
                  <Icon
                    id={"arrow-right"}
                    size={13}
                    class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                  />
                </div>
              }
            >
              <div class="mb-5 w-full">
                {isVariantOf?.additionalProperty.map((property) => (
                  <div class="px-3 py-2 w-full text-sm sm:text-base odd:bg-middle-gray">
                    <span class="font-semibold after:content-[':'] max-sm:pb-0 mr-2">
                      {property.name}
                    </span>
                    {property.value}
                  </div>
                ))}
              </div>
            </Collapsable>
          </div>
        )}
        <ProductGrid page={page} />
        {/* <div className="container px-5 pb-5">
          <div id="_trustvox_widget" />
        </div> */}
        <script
          type="text/javascript"
          defer
          dangerouslySetInnerHTML={{
            __html: useScript(onLoad, productId, productName, image),
          }}
        />
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
