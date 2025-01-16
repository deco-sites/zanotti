import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import PaymentMethods from "./PaymentMethods.tsx";
import GallerySlider from "./Gallery.tsx";
import { useScript } from "@deco/deco/hooks";
import Price from "./Price.tsx";
import Icon from "../ui/Icon.tsx";

interface Props {
  page: ProductDetailsPage | null;
  device: string;
  pixDiscount: number;
}

const onLoad = () => {
  const handleScroll = () => {
    const fixedAddToCart = document.getElementById("fixed-add-to-cart");
    if (fixedAddToCart) {
      if (globalThis.scrollY > 450) {
        fixedAddToCart.classList.add("visible");
        fixedAddToCart.classList.remove("invisible");
      } else {
        fixedAddToCart.classList.add("invisible");
        fixedAddToCart.classList.remove("visible");
      }
    }
  };
  addEventListener("scroll", handleScroll);
};

function ReadyForDeliveryTag() {
  return (
    <div class="flex items-center font-secondary text-white gap-2 bg-signature-green py-1 px-3 rounded-full text-sm">
      <Icon id="check-truck" />
      Produto a pronta entrega
    </div>
  );
}

function ProductInfo({ page, device, pixDiscount }: Props) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }
  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    isVariantOf,
    brand,
    additionalProperty
  } = product;
  const title = isVariantOf?.name ?? product.name;
  const refId = additionalProperty?.find((p) => p.name === "RefId")?.value || "";
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const {
    price = 0,
    listPrice = 0,
    seller = "1",
    availability,
  } = useOffer(offers);
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };
  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  if (device === "mobile" || device === "tablet") {
    return (
      <>
        <div class="flex flex-col gap-3 px-5 pt-5 items-start">
          <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />
          <h1 class="text-lg font-semibold font-secondary">
            {title}
          </h1>
          <div class="flex items-center justify-between w-full">
            <p class="text-dark-gray m-0 text-xs">
              Cod: {refId} | {brand?.name}
            </p>
            <WishlistButton item={item} pdp={true} />
          </div>
          <ReadyForDeliveryTag />
          <GallerySlider page={page} />
          <div class="flex flex-col gap-2">
            {availability === "https://schema.org/InStock"
              ? (
                <>
                  <div
                    data-trustvox-product-code={productGroupID}
                  />
                  <Price type="details" product={product} isMobile={true} pixDiscount={pixDiscount} />
                  <PaymentMethods offers={offers} />
                  <div class="divider m-0" />
                  <ProductSelector product={product} />
                  <AddToCartButton
                    item={item}
                    seller={seller}
                    product={product}
                    class="w-full uppercase bg-signature-green text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                    disabled={false}
                  />
                  <div class="divider m-0" />
                  <div class="pt-1.5 pb-4">
                    <ShippingSimulationForm
                      items={[{
                        id: Number(product.sku),
                        quantity: 1,
                        seller: seller,
                      }]}
                    />
                  </div>
                </>
              )
              : (
                <>
                  <ProductSelector product={product} />
                  <OutOfStock productID={productID} />
                </>
              )}
          </div>
        </div>
        <div class="fixed bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl z-[11]">
          <div class="container px-5 py-4 flex gap-4 items-center">
            <Price type="fixed" product={product} isMobile={true} pixDiscount={pixDiscount} />
            <AddToCartButton
              item={item}
              seller={seller}
              product={product}
              class="w-full uppercase bg-signature-green text-base flex justify-center items-center gap-2 py-3 rounded-full no-animation text-white font-semibold hover:bg-[#1bae3299]"
              disabled={false}
            />
          </div>
        </div>
      </>
    );
  }
  if (device === "desktop") {
    return (
      <>
        <div class="container pt-12 grid grid-cols-2 gap-8">
          <div class="col-span-1">
            <GallerySlider page={page} />
          </div>
          <div class="col-span-1">
            <div class="flex flex-col gap-3 py-3">
              <Breadcrumb
                itemListElement={page.breadcrumbList.itemListElement}
              />
              <div class="divider m-0" />
              <div class="flex flex-col gap-3 items-start">
                <div class="flex items-center gap-4 w-full">
                  <h1 class="text-xl font-bold flex-grow">
                    {title}
                  </h1>
                  <div
                    data-trustvox-product-code={productGroupID}
                  />
                  <WishlistButton item={item} pdp={true} />
                </div>
                <div className="flex items-center justify-between">
                  <p class="text-dark-gray">
                    Cod: {refId} | {brand?.name}
                  </p>
                </div>
                <ReadyForDeliveryTag />
              </div>
              {availability === "https://schema.org/InStock" &&
                (
                  <>
                    <div class="divider m-0" />
                    <div class="flex flex-col gap-2">
                      <Price type="details" product={product} isMobile={false} pixDiscount={pixDiscount} />
                      <PaymentMethods offers={offers} />
                    </div>
                    <div class="divider m-0" />
                    <ProductSelector product={product} />
                    <div class="flex flex-col gap-3 items-start">
                      <AddToCartButton
                        item={item}
                        seller={seller}
                        product={product}
                        class="w-full uppercase bg-signature-green text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                        disabled={false}
                      />
                      <div class="divider m-0" />
                      <ShippingSimulationForm
                        items={[{
                          id: Number(product.sku),
                          quantity: 1,
                          seller: seller,
                        }]}
                      />
                    </div>
                  </>
                )}
            </div>
            <div class="flex flex-col gap-[14px] py-[14px]">
              {availability !== "https://schema.org/InStock" &&
                (
                  <>
                    <ProductSelector product={product} />
                    <OutOfStock productID={productID} />
                  </>
                )}
            </div>
          </div>
        </div>
        <div
          id="fixed-add-to-cart"
          class="invisible fixed bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl z-[11]"
        >
          <div class="container px-5 py-4 grid grid-cols-4 lg:grid-cols-7 gap-12 items-center">
            <div class="hidden lg:block text-xl font-semibold text-black col-span-3">
              {title}
            </div>
            <Price type="fixed" product={product} isMobile={false} pixDiscount={pixDiscount} />
            <div class="col-span-2">
              <AddToCartButton
                item={item}
                seller={seller}
                product={product}
                class="w-full uppercase bg-signature-green text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                disabled={false}
              />
            </div>
          </div>
        </div>
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(onLoad) }}
        />
      </>
    );
  }
  return null;
}
export default ProductInfo;
