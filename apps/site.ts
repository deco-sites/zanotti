import commerce, { type Props as CommerceProps } from "apps/commerce/mod.ts";
import { color as shopify } from "apps/shopify/mod.ts";
import { color as vnda } from "apps/vnda/mod.ts";
import { color as vtex } from "apps/vtex/mod.ts";
import { color as wake } from "apps/wake/mod.ts";
import { color as linx } from "apps/linx/mod.ts";
import { color as nuvemshop } from "apps/nuvemshop/mod.ts";
// import type { Section } from "deco/blocks/section.ts";
import { rgb24 } from "std/fmt/colors.ts";
import manifest, { type Manifest } from "../manifest.gen.ts";
import type { Config } from "apps/vtex/loaders/config.ts";
import { type App as A, type AppContext as AC } from "@deco/deco";
export type Props = {
  /**
   * @title Flags de Novidades
   * @description Insira o número da coleção:
   */
  newsFlag?: string;
  /**
   * @title Flags de Promoções
   * @description Insira o número da coleção:
   */
  promoFlag?: string;
  /**
   * @title Flags de Produtos Internacionais
   * @description Insira o número da coleção:
   */
  internationalFlag?: string;
  /**
   * @title Sugestões do Minicart
   * @description Insira o número da coleção:
   */
  minicartSuggestion?: string;
  /**
   * @title Active Commerce Platform
   * @description Choose the active ecommerce platform
   * @default custom
   */
  platform: Platform;
  // vtex: Config;
} & CommerceProps;
export type Platform =
  | "vtex"
  | "vnda"
  | "shopify"
  | "wake"
  | "linx"
  | "nuvemshop"
  | "custom";
export let _platform: Platform = "custom";
export type App = ReturnType<typeof Site>;
export type AppContext = AC<App>;
const color = (platform: string) => {
  switch (platform) {
    case "vtex":
      return vtex;
    case "vnda":
      return vnda;
    case "wake":
      return wake;
    case "shopify":
      return shopify;
    case "linx":
      return linx;
    case "nuvemshop":
      return nuvemshop;
    case "deco":
      return 0x02f77d;
    default:
      return 0x212121;
  }
};
let firstRun = true;
export default function Site(state: Props): A<Manifest, Props, [
  ReturnType<typeof commerce>,
]> {
  _platform = state.platform || state.commerce?.platform || "custom";
  if (firstRun) {
    firstRun = false;
    console.info(
      ` 🐁 ${rgb24("Storefront", color("deco"))} | ${
        rgb24(_platform, color(_platform))
      } \n`,
    );
  }
  return {
    state,
    manifest,
    dependencies: [
      commerce({
        ...state,
        global: state.global,
      }),
    ],
  };
}
export { onBeforeResolveProps, Preview } from "apps/website/mod.ts";
