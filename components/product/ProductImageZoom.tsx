import type { ImageObject } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "deco/hooks/useScript.ts";

export interface Props {
  id?: string;
  images: ImageObject[];
}

function ProductImageZoom({ images, id = useId() }: Props) {
  return (
    <>
      <dialog id={id} class="modal">
        <div class="modal-box overflow-hidden w-full sm:min-h-[90vh] sm:min-w-[90vh] sm:max-w-11/12 max-sm:h-full max-sm:max-h-full max-sm:rounded-none flex items-center justify-center max-sm:p-0 p-12">
          <form method="dialog">
            <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div class="relative w-full">
            <div class="zoomist-container">
              <div class="zoomist-wrapper">
                <div class="zoomist-image">
                  <Slider class="carousel carousel-center gap-6 w-full">
                    {images.map((img, index) => (
                      <Slider.Item index={index} class="carousel-item w-full">
                        <Image
                          class="w-full object-contain"
                          sizes="(max-width: 640px) 100vw, 40vw"
                          style={{ aspectRatio: "1/1" }}
                          src={img.url!}
                          alt={img.alternateName}
                          width={1000}
                          height={1000}
                          preload={index === 0}
                          loading={index === 0 ? "eager" : "lazy"}
                        />
                      </Slider.Item>
                    ))}
                  </Slider>
                </div>
              </div>
            </div>

            <Slider.PrevButton
              class="no-animation absolute left-2 top-1/2 disabled:hidden z-10"
              disabled
            >
              <Icon id="ArrowSlide" />
            </Slider.PrevButton>

            <Slider.NextButton
              class="no-animation absolute right-2 top-1/2 disabled:hidden z-10"
              disabled={images.length < 2}
            >
              <Icon id="ArrowSlide" class="rotate-180" />
            </Slider.NextButton>
          </div>
        </div>
      </dialog>

      <script
        type="text/javascript"
        defer
        dangerouslySetInnerHTML={{
          __html: useScript(() => {
            // @ts-ignore .
            new Zoomist(".zoomist-container", {
              maxScale: 4,
              slider: true,
            });
          }),
        }}
      />

      <Slider.JS rootId={id} />
    </>
  );
}

export default ProductImageZoom;
