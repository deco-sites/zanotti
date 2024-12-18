import type { ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { clx } from "../../sdk/clx.ts";
import { useId } from "../../sdk/useId.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";

/**
 * @titleBy alt
 */
export interface Banner {
  /**
   * @title Imagem para o Desktop
   * @description Subir imagem no formato 1920x600
   */
  desktop: ImageWidget;

  /**
   * @title Imagem para o Mobile
   * @description Subir imagem no formato 640x600
   */
  mobile: ImageWidget;

  /** @title Texto alternativo para as imagens */
  alt?: string;

  /** @title Link */
  href?: string;
}

export interface Props {
  images?: Banner[];

  /**
   * @description Check this option when this banner is the biggest image on the screen for image optimizations
   */
  preload?: boolean;
}

function BannerItem(
  { image, lcp }: { image: Banner; lcp?: boolean },
) {
  const {
    alt,
    mobile,
    desktop,
    href,
  } = image;
  const params = { promotion_name: image.alt };

  const selectPromotionEvent = useSendEvent({
    on: "click",
    event: { name: "select_promotion", params },
  });

  const viewPromotionEvent = useSendEvent({
    on: "view",
    event: { name: "view_promotion", params },
  });

  return (
    <a
      {...selectPromotionEvent}
      href={href ?? "#"}
      aria-label={alt}
      class="relative block overflow-y-hidden w-full"
    >
      <Picture preload={lcp} {...viewPromotionEvent}>
        <Source
          media="(max-width: 767px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={mobile}
          width={640}
          height={600}
        />
        <Source
          media="(min-width: 768px)"
          fetchPriority={lcp ? "high" : "auto"}
          src={desktop}
          width={1920}
          height={600}
        />
        <img
          class="object-cover w-full"
          loading={lcp ? "eager" : "lazy"}
          src={desktop}
          alt={alt}
          width={1920}
          height={600}
        />
      </Picture>
    </a>
  );
}

function Carousel({ images = [], preload }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class={clx(
        "grid",
        "grid-rows-[1fr_32px_1fr_64px]",
        "grid-cols-[32px_1fr_32px]",
        "sm:grid-cols-[112px_1fr_112px] sm:min-h-min",
        "w-full relative",
      )}
    >
      <div class="col-span-full row-span-full leading-[1]">
        <Slider class="carousel carousel-center sm:carousel-end w-full gap-6">
          {images.map((image, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <BannerItem image={image} lcp={index === 0 && preload} />
            </Slider.Item>
          ))}
        </Slider>
      </div>
      {images.length > 1
        ? (
          <div class="container absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-10 flex items-center">
            <Slider.PrevButton class="btn-sm pr-5 flex items-center justify-center bg-transparent disabled:hidden text-white pl-0">
              <Icon id="arrow-left" size={20} />
            </Slider.PrevButton>

            <Slider.NextButton class="btn-sm pl-5 flex items-center justify-center bg-transparent ml-auto disabled:hidden text-white pr-0">
              <Icon id="arrow-right" size={20} />
            </Slider.NextButton>
          </div>
        )
        : null}
      <Slider.JS rootId={id} />
    </div>
  );
}

export default Carousel;
