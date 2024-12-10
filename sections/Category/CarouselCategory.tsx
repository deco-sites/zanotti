import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

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

function Card(
  { image, label = "Categoria", link }: Category,
) {
  return (
    <a class="flex flex-col group" href={link}>
      <Image
        class="rounded-full"
        src={image ?? "https://placehold.co/115x115"}
        alt={label}
        width={115}
        height={115}
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
  const device = useDevice();

  if (device === "desktop") {
    
    return (
      <div class="container overflow-hidden">
        <h2 class="text-lg lg:text-xl font-semibold font-secondary mb-3">
          {title}
        </h2>
        <div id={id} class="relative">
          <Slider class="carousel carousel-center sm:carousel-end gap-2 w-full justify-between">
            {categories?.map((item, index) => (
              <Slider.Item
                index={index}
                class="carousel-item"
              >
                <Card {...item} />
              </Slider.Item>
            ))}
          </Slider>

          <Slider.PrevButton class="hidden sm:flex bg-white btn-sm btn-circle no-animation absolute top-1/2 -translate-y-1/2 -left-7 p-2 box-content border border-light-gray items-center justify-center disabled:hidden">
            <Icon id="chevron-right" class="rotate-180" />
          </Slider.PrevButton>

          <Slider.NextButton class="hidden sm:flex bg-white btn-sm btn-circle no-animation absolute top-1/2 -translate-y-1/2 -right-7 p-2 box-content border border-light-gray items-center justify-center disabled:hidden">
            <Icon id="chevron-right" />
          </Slider.NextButton>

          <Slider.JS rootId={id} />
        </div>
      </div>
    );
  } else {
    return (
      <div class="overflow-hidden">
        <h2 class="container text-lg lg:text-xl font-semibold font-secondary mb-3">
          {title}
        </h2>
        <div id={id} class="flex flex-row flex-nowrap gap-2 overflow-x-auto">
          {categories?.map((item) => (
            <div className="shrink-0 first:ml-5 last:mr-5">
              <Card {...item} />
            </div>
          ))}
        </div>
      </div>
    );
  }
};
export default CarouselCategory;
