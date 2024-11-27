import { ImageObject, ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useId } from "../../sdk/useId.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import ShippingSimulationForm from "../shipping/Form.tsx";
import WishlistButton from "../wishlist/WishlistButton.tsx";
import AddToCartButton from "./AddToCartButton.tsx";
import OutOfStock from "./OutOfStock.tsx";
import ProductSelector from "./ProductVariantSelector.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import PaymentMethods from "./PaymentMethods.tsx";
import GallerySlider from "./Gallery.tsx";
import type { Device } from "apps/website/matchers/device.ts";
import ProductSubscription from "./Subscription/Form.tsx";
import { useScript } from "@deco/deco/hooks";
import { getFlagCluster } from "./ProductCard.tsx";
import Icon from "../ui/Icon.tsx";
import Price from "./Price.tsx";
interface Props {
  page: ProductDetailsPage | null;
  flags?: [internationalFlag: string, promoFlag: string, newsFlag: string] | [];
  device: Device;
  hiddenShipping: boolean;
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
function ShareModal() {
  return (
    <>
      <dialog id="share_product" class="modal">
        <div class="modal-box">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div class="text-base font-semibold mb-5">Compartilhar</div>
          <div class="flex items-center gap-3 flex-wrap">
            <a
              id="share-x"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
              target="_blank"
            >
              <Icon id="x-twitter" width={27} height={25} />
            </a>
            <a
              id="share-facebook"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
              target="_blank"
            >
              <Icon id="facebook" width={15} height={29} />
            </a>
            <a
              id="share-email"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
              target="_blank"
            >
              <Icon id="mail" width={29} height={25} />
            </a>
            <a
              id="share-whatsapp"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
              target="_blank"
            >
              <Icon id="whatsapp" width={27} height={28} />
            </a>
            <button
              id="share-copy"
              class="flex items-center justify-center w-14 h-14 rounded-full border border-primary"
            >
              <Icon id="copy-paste" width={27} height={28} />
            </button>
          </div>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
      <script
        type="text/javascript"
        defer
        dangerouslySetInnerHTML={{
          __html: useScript(() => {
            const productURL = encodeURIComponent(window.location.href);
            const shareLinks = {
              x: `https://twitter.com/intent/tweet?url=${productURL}&text=Confira este produto!`, // Link para X
              facebook:
                `https://www.facebook.com/sharer/sharer.php?u=${productURL}`, // Link para Facebook
              email:
                `mailto:?subject=Confira este produto&body=Veja este produto interessante: ${productURL}`, // Link para E-mail
              whatsapp:
                `https://api.whatsapp.com/send?text=Confira este produto: ${productURL}`, // Link para WhatsApp
            };

            function copyToClipboard() {
              navigator.clipboard.writeText(window.location.href)
                .then(() => alert("Link copiado!"))
                .catch((err) => console.error("Erro ao copiar o link: ", err));
            }

            document.getElementById("share-x")?.setAttribute(
              "href",
              shareLinks.x,
            );
            document.getElementById("share-facebook")?.setAttribute(
              "href",
              shareLinks.facebook,
            );
            document.getElementById("share-email")?.setAttribute(
              "href",
              shareLinks.email,
            );
            document.getElementById("share-whatsapp")?.setAttribute(
              "href",
              shareLinks.whatsapp,
            );
            document.getElementById("share-copy")?.addEventListener(
              "click",
              copyToClipboard,
            );
          }),
        }}
      />
    </>
  );
}
interface MeasurementTable {
  image?: ImageObject | null;
}
function MeasurementTable({
  image,
}: MeasurementTable) {
  if (!image) return null;
  return (
    <dialog id="measurement_table" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
          <div class="text-base font-semibold mb-5">Guia de Medidas</div>
          <img
            class="w-full object-contain bg-white rounded-xl lg:rounded-3xl"
            src={image.url ?? ""}
            alt={image.alternateName}
            width={600}
          />
        </form>
      </div>
      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}
function ProductInfo({
  page,
  flags = [],
  device,
  hiddenShipping,
}: Props) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }
  const id = useId();
  const [internationalFlag, promoFlag, newsFlag] = flags;
  const { breadcrumbList, product } = page;
  const {
    productID,
    offers,
    isVariantOf,
    brand,
    additionalProperty,
    image: images,
  } = product;
  const title = isVariantOf?.name ?? product.name;
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const {
    price = 0,
    listPrice = 0,
    seller = "1",
    sellerName = "",
    inventory = 0,
    installment,
    availability,
  } = useOffer(offers);
  const hasInternationalFlag = getFlagCluster(
    internationalFlag,
    additionalProperty,
  );
  const hasPromoFlag = getFlagCluster(promoFlag, additionalProperty);
  const hasNewsFlag = getFlagCluster(newsFlag, additionalProperty);
  const percent = listPrice && price
    ? Math.round(((listPrice - price) / listPrice) * 100)
    : 0;
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
  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "product",
        item_list_name: "Product",
        items: [item],
      },
    },
  });

  const newOffers = offers?.offers.filter((offer) => {
    return offer.inventoryLevel.value && offer.inventoryLevel.value > 0 &&
      offer.seller !== seller;
  }) || [];

  const measurementTableImage =
    ((images as ImageObject[])?.find((img) =>
      img.name === "measurementtable"
    ) as ImageObject) ||
    null;

  if (device === "mobile" || device === "tablet") {
    return (
      <>
        <ShareModal />
        <MeasurementTable image={measurementTableImage} />
        <div class="flex flex-col gap-3 px-5 pt-5">
          <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />
          <h1 class="text-base font-semibold">
            {title}
          </h1>
          <div class="flex items-center justify-between">
            <p class="text-dark-gray m-0 text-xs">
              Cod: {productID} | {brand?.name}
            </p>
            {/* @ts-ignore . */}
            <button
              class="btn btn-ghost text-dark-gray underline text-xs font-normal hover:bg-transparent"
              hx-on:click={useScript(() =>
                document.getElementById("share_product")?.showModal()
              )}
            >
              <Icon id="share-2" width={20} height={20} />
              Compartilhe
            </button>
            <WishlistButton item={item} pdp={true} />
          </div>
          {hasPromoFlag &&
            (
              <p class="text-xs font-semibold text-white uppercase bg-[#F22E2E] text-center text-white px-2 py-1 rounded-full w-full">
                Promoção
              </p>
            )}
          {hasInternationalFlag &&
            (
              <div class="flex w-full">
                <p class="text-xs font-semibold text-white uppercase bg-black text-center text-white px-2 py-1 rounded-full w-full">
                  Produto internacional{" "}
                  <a
                    class="underline"
                    href="#specifications"
                  >
                    Saiba mais
                  </a>
                </p>
              </div>
            )}
          <GallerySlider page={page} />
          <div class="flex justify-between">
            <div class="w-full max-w-[151px]">
              {hasNewsFlag &&
                (
                  <p class="text-xs font-semibold text-white uppercase bg-[#FFA318] text-center text-white px-2 py-1 rounded-full">
                    Novidade
                  </p>
                )}
            </div>
          </div>
          <div class="flex flex-col gap-3">
            {availability === "https://schema.org/InStock"
              ? (
                <>
                  <div
                    data-trustvox-product-code={productGroupID}
                  />
                  <Price type="details" product={product} isMobile={true} />
                  <PaymentMethods
                    offers={offers}
                    installment={installment?.price.toString() || ""}
                  />
                  <ProductSelector product={product} />
                  <div class="w-[calc(100%+40px)] -mx-[20px] px-[20px] py-4 border border-y-dark-gray flex flex-col gap-3">
                    <>
                      {inventory > 0 && inventory <= 9 && (
                        <p className="text-base font-normal text-black">
                          Restam só{" "}
                          <span className="font-bold text-primary">
                            {inventory} unidade{inventory > 1 ? "s" : ""}
                          </span>
                        </p>
                      )}
                    </>
                    <AddToCartButton
                      item={item}
                      seller={seller}
                      product={product}
                      class="uppercase bg-signature-green text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                      disabled={false}
                    />
                    <ProductSubscription
                      product={product}
                      item={item}
                      seller={seller}
                    />
                    <p class="text-xs font-normal text-black">
                      Vendido e entregue por:{" "}
                      <span class="font-bold capitalize">{sellerName}</span>
                    </p>
                  </div>
                  {newOffers.length > 0 &&
                    (
                      <div class="w-[calc(100%+40px)] -mx-[20px] border-b border-b-dark-gray pb-5 pt-2">
                        <span class="block font-semibold text-black mb-5 px-[20px]">
                          Veja outros vendedores
                        </span>
                        {newOffers.map((offer) => (
                          <div class="flex items-end justify-between border-t border-t-dark-gray py-5 px-[20px] last:pb-0">
                            <div class="flex flex-col gap-3">
                              <span>{offer.sellerName}</span>
                              <span class="font-semibold">
                                {formatPrice(offer.price, offer?.priceCurrency)}
                              </span>
                            </div>
                            <AddToCartButton
                              item={item}
                              seller={offer.seller || ""}
                              product={product}
                              hiddenIcon={true}
                              class="bg-primary text-sm py-3 px-8 rounded-full no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  {!hiddenShipping && (
                    <div class="w-[calc(100%+40px)] -mx-[20px] px-[20px] pt-1.5 pb-4 border border-b-dark-gray border-t-0">
                      <div>
                        <ShippingSimulationForm
                          items={[{
                            id: Number(product.sku),
                            quantity: 1,
                            seller: seller,
                          }]}
                        />
                      </div>
                    </div>
                  )}
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
        <div class="fixed bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl z-10">
          <div class="container px-5 py-4 flex gap-4 items-center">
            <Price type="fixed" product={product} isMobile={true} />
            <AddToCartButton
              item={item}
              seller={seller}
              product={product}
              class="uppercase bg-signature-green text-base flex justify-center items-center gap-2 py-3 rounded-full no-animation text-white font-semibold hover:bg-[#1bae3299]"
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
        <ShareModal />
        <MeasurementTable image={measurementTableImage} />
        <div class="container pt-12 px-5 grid grid-cols-2 gap-8">
          <div class="col-span-1">
            <GallerySlider page={page} />
          </div>
          <div class="col-span-1">
            <div class="flex flex-col gap-6">
              <Breadcrumb
                itemListElement={page.breadcrumbList.itemListElement}
              />
              <div class="flex flex-col gap-3 border border-x-0 border-y-dark-gray py-6">
                <div class="flex items-center gap-4">
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
                    Cod: {productID} | {brand?.name}
                  </p>
                  {/* @ts-ignore . */}
                  <button
                    class="btn btn-ghost text-dark-gray underline text-sm hover:bg-transparent p-0 min-h-unset h-auto"
                    hx-on:click={useScript(() =>
                      document.getElementById("share_product")?.showModal()
                    )}
                  >
                    <Icon id="share-2" />
                    Compartilhe
                  </button>
                </div>
              </div>
              {availability === "https://schema.org/InStock" &&
                (
                  <>
                    <div class="flex flex-col gap-[5px]">
                      {hasPromoFlag &&
                        (
                          <p class="text-xs font-semibold text-white uppercase bg-[#F22E2E] text-center text-white px-2 py-1 rounded-full">
                            Promoção
                          </p>
                        )}
                      {hasNewsFlag &&
                        (
                          <p class="text-xs font-semibold text-white uppercase bg-[#FFA318] text-center text-white px-2 py-1 rounded-full">
                            Novidade
                          </p>
                        )}
                      {hasInternationalFlag &&
                        (
                          <div class="flex w-full">
                            <p class="text-xs font-semibold text-white uppercase bg-black text-center text-white px-2 py-1 rounded-full w-full">
                              Produto internacional{" "}
                              <a
                                class="underline"
                                href="#specifications"
                              >
                                Saiba mais
                              </a>
                            </p>
                          </div>
                        )}
                    </div>
                    <Price type="details" product={product} isMobile={false} />
                    <PaymentMethods
                      offers={offers}
                      installment={installment?.price.toString() || ""}
                    />
                    <ProductSelector product={product} />
                    <div class="flex flex-col gap-3">
                      <AddToCartButton
                        item={item}
                        seller={seller}
                        product={product}
                        class="uppercase bg-signature-green text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                        disabled={false}
                      />
                      <ProductSubscription
                        product={product}
                        item={item}
                        seller={seller}
                      />
                      {inventory > 0 && inventory <= 9 && (
                        <div>
                          <p className="text-xl text-black">
                            Restam só{" "}
                            <span className="font-bold text-primary">
                              {inventory} unidade{inventory > 1 ? "s" : ""}
                            </span>
                          </p>
                        </div>
                      )}
                      <p class="text-xs font-normal text-black">
                        Vendido e entregue por:{" "}
                        <span class="font-bold capitalize">{sellerName}</span>
                      </p>
                    </div>
                    {newOffers.length > 0 &&
                      (
                        <div class="border border-y-dark-gray border-x-0 py-5">
                          <span class="block font-semibold text-black mb-5">
                            Veja outros vendedores
                          </span>
                          {newOffers.map((offer) => (
                            <div class="flex items-end justify-between border-t border-t-dark-gray py-5 last:pb-0">
                              <div class="flex flex-col gap-3">
                                <span>{offer.sellerName}</span>
                                <span class="font-semibold">
                                  {formatPrice(
                                    offer.price,
                                    offer?.priceCurrency,
                                  )}
                                </span>
                              </div>
                              <AddToCartButton
                                item={item}
                                seller={offer.seller || ""}
                                product={product}
                                hiddenIcon={true}
                                class="bg-primary text-sm py-3 px-8 rounded-full no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    {!hiddenShipping && (
                      <div>
                        <ShippingSimulationForm
                          items={[{
                            id: Number(product.sku),
                            quantity: 1,
                            seller: seller,
                          }]}
                        />
                      </div>
                    )}
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
          class="invisible fixed bottom-0 left-0 right-0 rounded-t-2xl bg-white shadow-2xl z-10"
        >
          <div class="container px-5 py-4 grid grid-cols-4 lg:grid-cols-7 gap-12 items-center">
            <div class="hidden lg:block text-xl font-semibold text-black col-span-3">
              {title}
            </div>
            <Price type="fixed" product={product} isMobile={false} />
            <div class="col-span-2">
              <AddToCartButton
                item={item}
                seller={seller}
                product={product}
                class="uppercase bg-signature-green text-[20px] flex justify-center items-center gap-2 py-[10px] rounded-[30px] no-animation text-white font-semibold hover:bg-[#1bae3299] ease-in"
                disabled={false}
              />
            </div>
          </div>
        </div>
        <script
          type="module"
          dangerouslySetInnerHTML={{ __html: useScript(onLoad, id) }}
        />
      </>
    );
  }
  return null;
}
export default ProductInfo;
