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
        class="px-6 bg-white rounded-[35px]"
        title={
          <div class="flex space-between items-center">
            <span class="text-base py-5 font-semibold">
              Descrição do Produto
            </span>
            <Icon
              class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
              size={13}
              id="arrow-down"
            />
          </div>
        }
      >
        <div>
          <div
            class="text-sm sm:text-base pb-5"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </Collapsable>
    </>
  );
};

export default Description;
