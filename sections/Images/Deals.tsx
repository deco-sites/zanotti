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

const Card = ({ title, image }: Deal) => (
  <div class="swiper-slide ">
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
  </div>
);

const Deals = ({ deals, preload }: Props) => {
  const id = useId();
  const device = useDevice();

  return (
    <div class="bg-white">
      <div class="lg:container py-1 lg:p-2">
        {device === "mobile"
          ? (
            <>
              <div class="overflow-hidden relative px-5">
                <div id={id} class="swiper-wrapper flex items-center">
                  {deals.map((deal) => <Card {...deal} />)}
                </div>
              </div>
            </>
          )
          : (
            <div class="flex space-between gap-4">
              {deals.map((deal) => <Card {...deal} />)}
            </div>
          )}

        <script
          type="text/javascript"
          defer
          dangerouslySetInnerHTML={{
            __html: useScript((id) => {
              // @ts-ignore .
              new Swiper(`#${id}`, {
                freeMode: true,
                grabCursor: true,
                spaceBetween: 12,
                slidesPerView: "1",
                centeredSlides: false,
                centerInsufficientSlides: true,
              });
            }, id),
          }}
        />
      </div>
    </div>
  );
};

export default Deals;
