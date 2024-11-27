import type { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";
interface Deal {
  /**
   * @title Titulo do card
   */
  title?: string;
  /**
   * @title Subtitulo do card
   */
  label?: string;
  /**
   * @title Adicionar uma imagem?
   */
  image?: ImageWidget;
  /**
   * @title Largura da imagem?
   */
  width?: number;
  /**
   * @title Altura da imagem?
   */
  height?: number;
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
const Deals = ({ deals, preload }: Props) => {
  const width = 200;
  const height = 200;
  const device = useDevice();
  return (
    <div className="lg:container px-0 lg:px-5 my-8">
      {device === "mobile"
        ? (
          <div className="overflow-x-auto no-scrollbar px-5">
            <div className="flex space-x-4 animate-scroll">
              {deals.map((deal, index) => (
                <div
                  key={index}
                  className="flex items-start gap-[15px] min-w-[213px]"
                >
                  <Image
                    src={deal.image ? deal.image : ""}
                    alt={deal.title || "Imagem de condição"}
                    width={deal.width || width}
                    height={deal.height || height}
                    fetchPriority="low"
                    loading={preload ? "lazy" : "eager"}
                  />
                  <div className="flex items-start flex-col">
                    <p className="text-base font-semibold text-dark">
                      {deal.title}
                    </p>
                    <p className="text-base font-normal text-dark-gray">
                      {deal.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        : (
          <div className="flex space-between gap-4">
            {deals.map((deal, index) => (
              <div
                key={index}
                className="flex items-start gap-[15px] lg:max-w-[214px]"
              >
                <Image
                  src={deal.image ? deal.image : ""}
                  alt={deal.title || "Imagem de condição"}
                  width={deal.width || width}
                  height={deal.height || height}
                  fetchPriority="low"
                  loading={preload ? "lazy" : "eager"}
                />
                <div className="flex items-start flex-col">
                  <p className="text-base font-semibold text-black">
                    {deal.title}
                  </p>
                  <p className="text-base font-normal text-dark-gray">
                    {deal.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};
export default Deals;
