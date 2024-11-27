export type Props = {
  name: string;
  text: string;
  value: string;
  id?: string;
  selected: null | string;
  changeHandler: (e: Event) => void;
  type?: "modal" | "cart";
};

export default function Radio(
  { name, text, value, selected, changeHandler, type = "modal", id }: Props,
) {
  if (type === "cart") {
    return (
      <div class="flex gap-2 cursor-pointer group">
        <input
          value={value}
          onChange={changeHandler}
          name={name}
          type="radio"
          id={id || value}
          class="hidden peer"
        />
        <label
          for={id || value}
          class="h-8 w-full text-xs text-dark group-hover:text-green select-none cursor-pointer flex items-center"
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </div>
    );
  }

  if (type === "modal") {
    return (
      <div
        class={`flex items-center justify-between border-2 rounded-md px-4 py-4 sm:py-5 ${
          selected === value
            ? "border-green bg-white"
            : "border-light-gray-200 bg-ice"
        }`}
      >
        <div class="flex items-center gap-2">
          <div class="custom-radio">
            <input
              id={value}
              name={name}
              type="radio"
              value={value}
              onChange={changeHandler}
            />
            <span class="custom-radio-mark" />
          </div>
          <label
            for={value}
            class="text-xs sm:text-sm"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    );
  }

  return null;
}
