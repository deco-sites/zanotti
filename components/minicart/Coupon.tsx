import { MINICART_FORM_ID } from "../../constants.ts";
import Icon from "../ui/Icon.tsx";
export interface Props {
  coupon?: string;
}

function Coupon({ coupon }: Props) {
  return (
    <div class="flex gap-2 justify-between items-center px-4 pt-[10px] pb-5">
      <span class="text-sm lg:text-base text-black">
        Cupom
      </span>

      {/* Displayed when checkbox is checked=true */}
      <div class="join">
        <input
          form={MINICART_FORM_ID}
          name="coupon"
          class="max-w-full h-[34px] w-full rounded-full border border-dark-gray pl-3"
          type="text"
          value={coupon ?? ""}
        />
      </div>
      <button
        form={MINICART_FORM_ID}
        class="px-[12px] py-[5px] bg-primary rounded-full text-white"
        name="action"
        value="set-coupon"
      >
        {">"}
      </button>
    </div>
  );
}

export default Coupon;
