import ProductCard from "./ProductCard.tsx";
import { useOffer } from "../../sdk/useOffer.ts";
import { useScript } from "@deco/deco/hooks";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import type { Product, ProductDetailsPage } from "apps/commerce/types.ts";

export interface Props {
  page: ProductDetailsPage;
  device: string;
  productRecommendations: Product[];
}

const onClick = () => {
  const container = document.getElementById("buy-together") as HTMLDivElement;
  if (container) {
    let newItem = [];
    let newPlatformProps = {};
    newPlatformProps.orderItems = [];
    newPlatformProps.allowedOutdatedData = ["paymentData"];
    const productCards = container.querySelectorAll("div[data-item-id]");
    productCards.forEach((card) => {
      if (card.querySelector("input")?.checked) {
        const { item, platformProps } = JSON.parse(
          decodeURIComponent(card.getAttribute("data-cart-item")!),
        );
        newItem.push(item);
        newPlatformProps.orderItems.push(platformProps.orderItems[0]);
      }
    });
    window.STOREFRONT.CART.addToCart(newItem, newPlatformProps);
    setTimeout(() => {
      const minicartDrawer = document.querySelector(
        "label[for=minicart-drawer]",
      );
      if (minicartDrawer) {
        // @ts-ignore click is correct
        minicartDrawer.click();
      }
    }, 500);
  }
};

const onChange = () => {
  const container = document.getElementById("buy-together") as HTMLDivElement;
  if (container) {
    let pix = 0;
    let price = 0;
    const productCards = container.querySelectorAll("div[data-item-id]");
    productCards.forEach((card) => {
      if (card.querySelector("input")?.checked) {
        const { item } = JSON.parse(
          decodeURIComponent(card.getAttribute("data-cart-item")!),
        );

        const pixPrice = parseFloat(
          card.getAttribute("data-pix") || "0",
        );

        pix += pixPrice;
        price += item.price;
      }
    });
    const pixContainer = document.querySelector("#pix-price");
    if (pixContainer) {
      pixContainer.innerHTML = pix.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    const priceContainer = document.querySelector("#total-price");
    if (priceContainer) {
      priceContainer.innerHTML = price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    const addToCartCount = document.querySelector("#add-to-cart-count");
    if (addToCartCount) {
      addToCartCount.innerHTML = container.querySelectorAll(
        "div[data-item-id] input:checked",
      ).length.toString();
    }
  }
};

const onLoad = () => {
  const container = document.getElementById("buy-together") as HTMLDivElement;
  if (container) {
    let pix = 0;
    let price = 0;
    const productCards = container.querySelectorAll("div[data-item-id]");
    productCards.forEach((card) => {
      if (card.querySelector("input")?.checked) {
        const { item } = JSON.parse(
          decodeURIComponent(card.getAttribute("data-cart-item")!),
        );

        const pixPrice = parseFloat(
          card.getAttribute("data-pix") || "0",
        );

        pix += pixPrice;
        price += item.price;
      }
    });
    const pixContainer = document.querySelector("#pix-price");
    if (pixContainer) {
      if (price > pix) {
        pixContainer.innerHTML = pix.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      } else {
        pixContainer.parentElement?.classList.add("hidden");
      }
    }
    const priceContainer = document.querySelector("#total-price");
    if (priceContainer) {
      priceContainer.innerHTML = price.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      });
    }
    const addToCartCount = document.querySelector("#add-to-cart-count");
    if (addToCartCount) {
      addToCartCount.innerHTML = container.querySelectorAll(
        "div[data-item-id] input:checked",
      ).length.toString();
    }
  }
};

export default function BuyTogether({
  page,
  productRecommendations,
  device,
}: Props) {
  const { breadcrumbList, product } = page;
  const { offers } = product;

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const {
    pix = 0,
    price = 0,
    seller = "1",
    listPrice = 0,
  } = useOffer(offers);

  const actualItem = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const recommendations = productRecommendations.filter((p) => {
    return product.productID !== p.productID;
  });

  return (
    <>
      {recommendations.length > 0 &&
        (
          <div
            id="buy-together"
            class="container px-0 lg:px-5 mb-3 mt-12 lg:my-12"
          >
            <h3 class="text-2xl font-semibold mb-4 lg:mb-5 px-5 lg:px-0">
              Compre Junto
            </h3>
            <div class="flex items-center gap-4 overflow-x-auto">
              <div
                class="relative ml-5 lg:ml-0"
                data-pix={pix}
                data-item-id={product.productID}
                data-cart-item={encodeURIComponent(
                  JSON.stringify({
                    item: actualItem,
                    platformProps: {
                      allowedOutdatedData: ["paymentData"],
                      orderItems: [{
                        quantity: 1,
                        seller: seller,
                        id: product.productID,
                      }],
                    },
                  }),
                )}
              >
                <div class="form-control p-3 lg:p-5 absolute top-0 left-0 z-[1]">
                  <label class="label cursor-pointer p-0">
                    <input
                      type="checkbox"
                      class="checkbox checkbox-primary"
                      checked={true}
                      hx-on:change={useScript(onChange)}
                    />
                  </label>
                </div>
                <ProductCard
                  class="w-[216px] sm:w-[300px]"
                  product={product}
                  hiddenFlags={true}
                />
              </div>
              <span class="text-primary text-3xl font-bold">+</span>
              {recommendations.splice(0, 2).map(
                (item: Product, index: number, arr: Product[]) => {
                  const { offers } = item;

                  const {
                    pix: itemPix = 0,
                    price: itemPrice = 0,
                    seller: itemSeller = "1",
                    listPrice: itemListPrice = 0,
                  } = useOffer(offers);

                  const newItem = mapProductToAnalyticsItem({
                    price: itemPrice,
                    product: item,
                    listPrice: itemListPrice,
                    breadcrumbList: breadcrumb,
                  });

                  return (
                    <>
                      <div
                        class="relative last:mr-5 last:lg:mr-0"
                        data-pix={itemPix}
                        data-item-id={item.productID}
                        data-cart-item={encodeURIComponent(
                          JSON.stringify({
                            item: newItem,
                            platformProps: {
                              allowedOutdatedData: ["paymentData"],
                              orderItems: [{
                                quantity: 1,
                                seller: itemSeller,
                                id: item.productID,
                              }],
                            },
                          }),
                        )}
                      >
                        <div class="form-control p-3 lg:p-5 absolute top-0 left-0 z-[1]">
                          <label class="label cursor-pointer p-0">
                            <input
                              type="checkbox"
                              class="checkbox checkbox-primary"
                              checked={true}
                              hx-on:change={useScript(onChange)}
                            />
                          </label>
                        </div>
                        <ProductCard
                          class="w-[216px] sm:w-[300px]"
                          product={item}
                          hiddenFlags={true}
                        />
                      </div>
                      {(index + 1) < arr.length && (
                        <span class="text-primary text-3xl font-bold">
                          +
                        </span>
                      )}
                    </>
                  );
                },
              )}
              {device === "desktop" &&
                (
                  <div class="flex flex-col gap-4 items-center justify-center px-6">
                    <div class="text-primary font-normal text-[30px]">
                      <span
                        id="pix-price"
                        class="text-[40px] font-semibold text-primary"
                      >
                        R$ 0
                      </span>{" "}
                      no Pix
                    </div>
                    <div class="text-base">
                      Preço Total:{" "}
                      <span id="total-price" class="text-xl font-semibold">
                        R$ 0
                      </span>
                    </div>
                    <button
                      class="btn btn-primary gap-1 px-16"
                      hx-on:click={useScript(onClick)}
                    >
                      Adicionar <span id="add-to-cart-count">2</span>{" "}
                      ao carrinho
                    </button>
                  </div>
                )}
            </div>
          </div>
        )}
      {device === "mobile" && recommendations.length > 0 &&
        (
          <div class="flex flex-col gap-4 items-center justify-center pb-6 pt-3 border-b-middle-gray">
            <div class="text-primary font-normal text-[30px]">
              <span
                id="pix-price"
                class="text-[40px] font-semibold text-primary"
              >
                R$ 0
              </span>{" "}
              no Pix
            </div>
            <div class="text-base">
              Preço Total:{" "}
              <span id="total-price" class="text-xl font-semibold">R$ 0</span>
            </div>
            <button
              class="btn btn-primary gap-1 px-9"
              hx-on:click={useScript(onClick)}
            >
              Adicionar <span id="add-to-cart-count">2</span> ao carrinho
            </button>
          </div>
        )}
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad),
        }}
      />
    </>
  );
}
