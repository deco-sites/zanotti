import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Props {
  /**
   * @title  Imagem desktop
   * @description Tamanho da imagem 1440 x 400
   */
  srcDesktop?: ImageWidget;
  /**
   * @title  Imagem mobile
   * @description Tamanho da imagem 640 x 400
   */
  srcMobile?: ImageWidget;
  /**
   * @title Texto alternativo da imagem
   *    * @description Obrigatório preenchimento para leitores de tela
   */
  alt: string;
  /**
   * @title  Link da Imagem
   * @description Não obrigatório no caso das institucionais

   */
  link?: string;
}

export default function FulllBanner(props: Props) {
  const device = useDevice();

  const {
    srcDesktop = "",
    srcMobile = "",
    link = "",
    alt = "",
  } = props;

  if (device === "desktop") {
    return (
      <div class="container">
        <a href={link}>
          <Image
            height={400}
            width={1440}
            class="rounded-xl"
            src={srcDesktop}
            alt={alt}
          />
        </a>
      </div>
    );
  } else {
    return (
      <div class="container">
        <a href={link}>
          <Image
            height={400}
            width={640}
            class="rounded-xl w-full"
            src={srcMobile || srcDesktop}
            alt={alt}
          />
        </a>
      </div>
    );
  }
}
