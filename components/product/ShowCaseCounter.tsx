import Icon from "../ui/Icon.tsx";
import ProductAd from "../product/ProductAd.tsx";
import CampaignTimer from "../ui/CampaingTimer.tsx";

import { useId } from "../../sdk/useId.ts";
import { ProductDetailsPage } from "apps/commerce/types.ts";

interface Props {
  /**
   * @title Titulo?
   */
  Title?: string;
  /**
   * @title Subtitulo
   */
  Label?: string;
  /**
   * @title Data Final
   * @format datetime
   */
  expireAt?: string;
  product: ProductDetailsPage | null;
}

const ShowCaseCounter = ({
  Title =
    "<p class='flex gap-[5px]'><span class='font-bold'>[Oferta]</span> <span class='font-semibold'> Relâmpago</span></p> ",
  Label = "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum",
  expireAt,
  product,
}: Props) => {
  const id = useId();

  if (!expireAt) {
    return null;
  }

  const difference = +new Date(expireAt) - +new Date();

  const days = Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0);
  const hours = Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0);
  const minutes = Math.max(Math.floor((difference / 1000 / 60) % 60), 0);
  const seconds = Math.max(Math.floor((difference / 1000) % 60), 0);

  if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
    return null;
  }

  return (
    <div
      id={id}
      class="lg:bg-primary px-5 lg:px-0 rounded-[10px] lg:rounded-none"
    >
      <div class="flex items-center justify-center flex-wrap container p-5 gap-x-10 gap-y-3 lg:py-[100px] bg-primary rounded-[10px] lg:rounded-none">
        <div class="flex flex-col justify-unset lg:justify-center">
          <div>
            <div class="flex justify-center items-center">
              <Icon size={32} id={"rain"} />
              <h3
                class="text-[22px] sm:text-[40px] text-white"
                dangerouslySetInnerHTML={{ __html: Title }}
              >
              </h3>
            </div>
            <p class="text-white mt-[10px] text-center break-all text-sm lg:text-[20px] mb-4">
              {Label}
            </p>
          </div>
          <CampaignTimer
            id={id}
            expiresAt={expireAt}
          />
        </div>
        <div class="bg-white max-w-[602px] rounded-[10px]">
          <ProductAd product={product} />
        </div>
      </div>
    </div>
  );
};

export default ShowCaseCounter;
