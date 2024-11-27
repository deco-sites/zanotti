import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import ProductImageZoom from "./ProductImageZoom.tsx";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";
import { useScript } from "deco/hooks/useScript.ts";
export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}
const WIDTH = 532;
const HEIGHT = 532;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;
/**
 * @title Product Image Slider
 * @description Creates a three columned grid on destkop, one for the dots preview, one for the image slider and the other for product info
 * On mobile, there's one single column with 3 rows. Note that the orders are different from desktop to mobile, that's why
 * we rearrange each cell with col-start- directives
 */
export default function GallerySlider(props: Props) {
  const id = useId();
  const zoomId = `${id}-zoom`;
  if (!props.page) {
    throw new Error("Missing Product Details Page Info");
  }
  const { page: { product: { image } } } = props;
  const device = useDevice();
  const images = image?.filter((img) => img.name !== "measurementtable") || [];
  if (!images) return null;
  return (
    <>
      <div id={id} class="flex flex-col">
        <div class="relative w-full">
          <Slider class="carousel carousel-center gap-6 w-full">
            {images.map((img, index) => (
              <Slider.Item index={index} class="carousel-item w-full">
                <Image
                  class="w-full object-contain bg-white rounded-[10px] lg:rounded-[20px]"
                  sizes="(max-width: 640px) 100vw, 40vw"
                  style={{ aspectRatio: ASPECT_RATIO }}
                  src={img.url!}
                  alt={img.alternateName}
                  width={WIDTH}
                  height={HEIGHT}
                  preload={index === 0}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton
            class="no-animation absolute left-2 top-1/2 disabled:hidden"
            disabled
          >
            <Icon id="ArrowSlide" />
          </Slider.PrevButton>

          <Slider.NextButton
            class="no-animation absolute right-2 top-1/2 disabled:hidden"
            disabled={images.length < 2}
          >
            <Icon id="ArrowSlide" class="rotate-180" />
          </Slider.NextButton>

          <button
            class="btn btn-ghost inline-flex absolute top-2 right-2 bg-base-100 rounded-full"
            hx-on:click={useScript((id) => {
              // @ts-ignore .
              document.getElementById(id)?.showModal();
            }, zoomId)}
          >
            <label for={zoomId}>
              <Icon id="pan_zoom" />
            </label>
          </button>
        </div>

        <ul class="grid grid-cols-5 gap-3 lg:gap-2">
          {images.length > 1 && (
            <>
              {images.map((img, index) => (
                <li class="carousel-item">
                  <Slider.Dot
                    index={index}
                    class="h-fit w-fit h-full rounded-2xl overflow-hidden"
                  >
                    <Image
                      class="rounded object-contain lg:object-cover lg:max-w-[148px] lg:max-h-[107px] bg-white rounded-[10px] lg:rounded-[20px]"
                      width={device === "desktop" ? 148 : 60}
                      height={device === "desktop" ? 107 : 60}
                      src={img.url!}
                      alt={img.alternateName}
                    />
                  </Slider.Dot>
                </li>
              ))}
            </>
          )}
        </ul>

        <Slider.JS rootId={id} />
      </div>

      {images && (
        <ProductImageZoom
          id={zoomId}
          images={images}
        />
      )}
    </>
  );
}
