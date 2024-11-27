import { useId } from "../../sdk/useId.ts";
import { useScript } from "deco/hooks/useScript.ts";
import type { ImageWidget } from "apps/admin/widgets.ts";

import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";

interface Category {
  image?: ImageWidget;
  label?: string;
  link?: string;
}

interface Props {
  title?: string;
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
    image,
    label = "Categoria",
    link,
  }: Category,
) {
  return (
    <a className="flex flex-col group" href={link}>
      <Image
        className="rounded-xl mb-2"
        src={image ?? "https://placehold.co/114x106"}
        alt={label}
        width={114}
        height={106}
        loading="lazy"
      />
      <p className="text-base text-center group-hover:text-primary ease-in duration-300">
        {label}
      </p>
    </a>
  );
}

const CarouselCategory = ({ categories, title }: Props) => {
  const id = useId();

  return (
    <div id={id}>
      <div className="container px-5 lg:px-0 overflow-hidden">
        <h3 className="mb-5 text-base font-semibold sm:text-2xl px-0 sm:px-5">
          {title}
        </h3>
      </div>
      <div id="fakeLoading" class="container px-5 flex gap-5 overflow-x-hidden">
        {new Array(15).fill("").map((_, index) => (
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
        class="hidden container px-0 lg:px-10 overflow-hidden relative"
      >
        <div class="overflow-hidden">
          <div class="swiper-wrapper">
            {categories?.map((item, index) => (
              <div
                class="swiper-slide max-w-[114px] first:ml-5 last:mr-5 lg:first:ml-0 lg:last:mr-0 cursor-pointer"
                key={index}
              >
                <Card {...item} />
              </div>
            ))}
          </div>
          <div class="button-prev absolute left-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <Icon id="chevron-right" className="rotate-180" />
          </div>
          <div class="button-next absolute right-0 top-1/2 -translate-y-1/2 hidden lg:block">
            <Icon id="chevron-right" />
          </div>
          <div class="pagination static mt-5 flex sm:hidden justify-center" />
        </div>
        <script
          type="module"
          dangerouslySetInnerHTML={{
            __html: useScript(onLoad, id),
          }}
        />
      </div>
    </div>
  );
};

export default CarouselCategory;
