import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Banner {
    /**
     * @title  Imagem desktop
     * @description Tamanho da imagem 1252 x 328
     */
    srcDesktop?: ImageWidget;
    /**
     * @title  Imagem mobile
     * @description Tamanho da imagem 390 x 133
     */
    srcMobile?: ImageWidget;
    /**
     * @title  texto alternativo da imagem
     */
    alt: string;
    /**
     * @title  Link da Imagem
     * @description Obrigatório preenchimento para leitores de tela
     */
    link?: string;
}

interface Props {
    banner?: Banner;
}
const FulllBanner = ({ ...props }: Props) => {
    const device = useDevice();
    return (
        <div class="container px-5 lg:px-0">
            <a href={props?.banner?.link}>
                <Image
                    class="w-full"
                    src={device === "mobile"
                        ? props?.banner?.srcMobile
                        : props?.banner?.srcDesktop}
                    width={device === "mobile" ? 390 : 1252}
                    height={device === "mobile" ? 133 : 328}
                    alt={props?.banner?.alt}
                />
            </a>
        </div>
    );
};

export default FulllBanner;
