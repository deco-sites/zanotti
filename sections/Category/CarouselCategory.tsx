import { useId } from "../../sdk/useId.ts";
import { useScript } from "deco/hooks/useScript.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

/**
 * @titleBy label
 */
interface Category {
  /**
   * @title Adicionar nova imagem
   * @description Tamanho da imagem 113x113
   */
  image?: ImageWidget;
  /**
   * * @title titulo do card
   */
  label?: string;
  /**
   * * @title link do card
   */
  link?: string;
}

interface Props {
  /**
   * * @title titulo da sessão
   */
  title?: string;
  /**
   * * @title Clique no + para adicionar um novo card de categoria
   */
  categories?: Category[];
}

const onLoad = (id: string) => {
  const carousel = document.getElementById(id);
  if (carousel) {
    // @ts-ignore swiper exists
    new Swiper(`#${id} #content > div`, {
      spaceBetween: 12,
      slidesPerView: "auto",
      breakpoints: {
        640: {
          spaceBetween: 30,
        },
      },
      navigation: {
        nextEl: `#${id} .button-next`,
        prevEl: `#${id} .button-prev`,
      },
      pagination: {
        el: `#${id} .pagination`,
        clickable: true,
      },
    });

    document.querySelector(`#${id} #content`)?.classList.remove("hidden");
    document.querySelector(`#${id} #fakeLoading`)?.classList.add("hidden");
  }
};

function Card(
  {
    image = "https://placehold.co/114x106",
    label = "Categoria",
    link,
  }: Category,
) {
  return (
    <a class="flex flex-col group" href={link}>
      <Image
        class="rounded-xl mb-2"
        src={image ?? "https://placehold.co/114x106"}
        alt={label}
        width={114}
        height={106}
        loading="lazy"
      />
      <p class="text-base text-center group-hover:text-primary ease-in duration-300">
        {label}
      </p>
    </a>
  );
}

const CarouselCategory = ({ categories, title }: Props) => {
  const id = useId();

  return (
    <div id={id}>
      <div class="container px-5 lg:px-0 overflow-hidden">
          <h3 class="mb-3 text-base font-semibold">
            {title}
          </h3>
        <div
          id="fakeLoading"
          class="container px-5 flex gap-5 overflow-x-hidden"
        >
          {new Array(10).fill("").map((_, index) => (
            <div key={index}>
              <div
                class="rounded-xl mb-2 skeleton"
                style={{
                  width: "114px",
                  height: "106px",
                }}
              />
              <div class="skeleton h-6 w-full rounded-xl" />
            </div>
          ))}
        </div>
        <div
          id="content"
          class="hidden container overflow-hidden relative"
        >
          <div class="overflow-hidden">
            <div class="swiper-wrapper">
              {categories?.map((item, index) => (
                <div
                  class="swiper-slide max-w-[114px] lg:first:ml-0 lg:last:mr-0 cursor-pointer"
                  key={index}
                >
                  <Card {...item} />
                </div>
              ))}
            </div>
          </div>
          <script
            type="module"
            dangerouslySetInnerHTML={{
              __html: useScript(onLoad, id),
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default CarouselCategory;
