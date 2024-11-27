import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";
import { useId } from "../../sdk/useId.ts";
import { useScript } from "deco/hooks/useScript.ts";

/**
 * @titleBy title
 */
interface Deal {
  /**
   * @title Texto da barra de condição
   */
  title?: string;

  /**
   * @title Adicionar um ícone
   */
  image?: ImageWidget;
}

interface Props {
  /**
   * @title Carregamento da Imagem
   * @description Ative caso queira adiar o carregamento
   */
  preload?: boolean;

  /**
   * @description Clique no ícone de + caso queira adicionar um novo card
   */
  deals: Deal[];
}
  const device = useDevice();
const onLoad = (id: string) => {
  const carousel = document.getElementById(id);
  if (carousel) {
    // @ts-ignore Swiper é definido globalmente
    new Swiper(`#${id} #content > div`, {
      spaceBetween: 12,
      slidesPerView: "auto",
      breakpoints: {
        640: {
          spaceBetween: 30,
        },
      },
      pagination: {
        el: `#${id} .pagination`,
        clickable: true,
      },
      freeMode: true,
    });

    document.querySelector(`#${id} #content`)?.classList.remove("hidden");
    document.querySelector(`#${id} #fakeLoading`)?.classList.add("hidden");
  }
};

const Card = ({ title, image }: Deal) => (
  <div class="flex items-center cursor-pointer gap-2">
    <Image
      src={image || "https://placehold.co/24x24"}
      alt={title || "Imagem de condição"}
      width={24}
      height={24}
      fetchPriority="low"
    />
    <div class="flex">
      <p class="text-base font-normal text-black family-secondary">{title}</p>
    </div>
  </div>
);

const Deals = ({ deals, preload }: Props) => {

  const id = useId();

  return (
    <div class="bg-white" id={id}>
      <div class="lg:container py-1 lg:p-2">
        {device === "mobile" ? (
          <>
            <div
              id="content"
              class="overflow-hidden relative px-5"
            >
              <div class="swiper-wrapper flex items-center">
                {deals.map((deal, index) => (
                  <div class="swiper-slide" key={index}>
                    <Card {...deal} />
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div class="flex space-between gap-4">
            {deals.map((deal) => <Card {...deal} />)}
          </div>
        )}
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

export default Deals;
