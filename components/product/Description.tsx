import { ProductDetailsPage } from "apps/commerce/types.ts";
import Collapsable from "../ui/Collapsable.tsx";
import Icon from "../ui/Icon.tsx";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

const Description = ({ page }: Props) => {
  const { product } = page;
  const { isVariantOf } = product;
  const description = product.description || isVariantOf?.description;

  return (
    <>
      <Collapsable
        class="container px-5"
        title={
          <div class="flex space-between items-center">
            <span class="text-base lg:text-xl py-5 sm:py-12 font-semibold">
              Descrição do Produto
            </span>
            <Icon
              class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
              size={13}
              id={"arrow-right"}
            />
          </div>
        }
      >
        <div>
          <div
            class="fluid-text text-sm pb-[40px]"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Collapsable>
    </>
  );
};

export default Description;
