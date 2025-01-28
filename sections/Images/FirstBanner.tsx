import Image from "apps/website/components/Image.tsx";
import { useDevice } from "@deco/deco/hooks";
import type { ImageWidget } from "apps/admin/widgets.ts";

interface Cards {
  /**
   * @title  Link do banner
   */
  link?: string;
  /**
   * @title  texto alternativo banner
   */
  alt?: string;
  /**
   * @title  Upload de imagem Para desktop
   * @description Subir a primeira imagem no formato 480x600 e as demais 480x292
   */
  desktopImage?: ImageWidget;
  /**
   * @title  Upload de imagem Para mobile
   * @description Subir as imagens no formato 320x200
   */
  mobileImage?: ImageWidget;
}

interface Props {
  title?: string;
  items?: Cards[];
}

export default function GridImages({ title, items }: Props) {
  const device = useDevice();

  if (!items) return null;

  if (device === "desktop") {
    return (
      <div class="container">
        {title && (
          <div class="mb-5">
            <p class="text-2xl sm:text-3xl font-semibold">
              {title}
            </p>
          </div>
        )}
        <div class="grid grid-cols-3 justify-center gap-4">
          {items.length > 0 && (
            <div class="col-span-1">
              <a href={items[0].link} class="flex w-full h-full">
                <Image
                  src={items[0].desktopImage || "https://placehold.co/480x600"}
                  alt={items[0].alt || "Image"}
                  width={480}
                  height={600}
                  fetchPriority="low"
                  class="object-cover rounded-xl h-full"
                />
              </a>
            </div>
          )}
          {items.length > 1 && (
            <div class="col-span-2 grid grid-rows-2 grid-cols-2 gap-4">
              {items.slice(1, 5).map((item) => (
                <a href={item.link} class="flex">
                  <Image
                    src={item.desktopImage || "https://placehold.co/480x292"}
                    alt={item.alt || "Image"}
                    width={480}
                    height={292}
                    fetchPriority="low"
                    class="object-contain rounded-xl w-full"
                  />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (device === "mobile") {
    return (
      <div>
        {title && (
          <div class="container mb-3">
            <p class="text-2xl sm:text-3xl font-semibold">
              {title}
            </p>
          </div>
        )}
        <div class="flex flex-row gap-3 flex-nowrap overflow-x-auto no-scrollbar">
          {items.map((item) => (
            <div class="shrink-0 first:ml-5 last:mr-5">
              <a href={item.link} class="flex">
                <Image
                  src={item.mobileImage || item.desktopImage ||
                    "https://placehold.co/320x200"}
                  alt={item.alt || "Image"}
                  width={320}
                  height={200}
                  fetchPriority="low"
                  class="object-cover rounded-xl"
                />
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}
