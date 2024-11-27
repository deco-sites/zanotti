import type { ImageWidget } from "apps/admin/widgets.ts";

export interface BaseBanner {
  /**
   * @title  Link do banner
   */
  Link?: string;
  /**
   * @title  texto alternativo banner
   */
  Alt?: string;
  /**
   * @title  Tipo de carregamento
   */
  /**  @description Com loading = "eager" carrega imediatamente a imagem  | Com loading = "lazy" adia o carregamento até que o usuário role para onde está a imagem */
  Loading?: "eager" | "lazy";
  /**
   * @title  Upload de imagem Para desktop
   */
  desktop?: {
    Image?: ImageWidget;
    /**
     * @title  Largura de imagem Para desktop
     */
    Width?: number;
    /**
     * @title  Altura de imagem Para desktop
     */
    Height?: number;
  };
  /**
   * @title  Upload de imagem Para mobile
   */
  mobile?: {
    Image?: ImageWidget;
    /**
     * @title  Largura de imagem Para mobile
     */
    Width?: number;
    /**
     * @title  Altura de imagem Para mobile
     */
    Height?: number;
  };
}

type Cards = BaseBanner;
type Slide = BaseBanner;
type FullBanner = BaseBanner;

export interface FirstVariationProps {
  title?: string;
  items: Cards[];
  slide?: Slide[];
  bannerFull?: FullBanner;
}

export interface SecondVariationProps {
  title?: string;
  items: Cards[];
}

export interface ThirdVariationProps {
  title?: string;
  items: Cards[];
}
export interface FourthVariationProps {
  title?: string;
  items: Cards[];
  bannerFull?: FullBanner;
}
export interface FifthVariationProps {
  title?: string;
  slide?: Slide[];
}
export interface SixthVariationProps {
  title?: string;
  items?: Cards[];
}
export interface SeventhVariationProps {
  title?: string;
  items?: Cards[];
}
