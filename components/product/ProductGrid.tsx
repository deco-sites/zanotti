import { ProductDetailsPage } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const ProductGrid = ({ page }: Props) => {
  if (!page) return null;

  const { product } = page;
  const { image } = product || {};
  const images = image?.filter((img) => img.name !== "measurementtable") || [];

  return (
    <>
      {images.length > 1 && (
        <div className="container px-5 py-5 sm:py-12">
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-4">
            {images &&
              images.map((img, index) => (
                <li key={index} className="w-full">
                  <Image
                    class="object-contain object-center bg-white rounded-[10px] lg:rounded-[20px]"
                    style={{ aspectRatio: "1/1" }}
                    src={img.url!}
                    alt={img.alternateName}
                    width={700}
                    height={700}
                  />
                </li>
              ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default ProductGrid;
