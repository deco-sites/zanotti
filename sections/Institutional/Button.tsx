interface Props {
  label?: string;
  link?: string;
  background?: "primary" | "black";
}

const Button = ({ link, label, background }: Props) => {
  return (
    <div class="container px-5">
      <a
        href={link}
        class={`bg-${background}  py-[13px] text-white my-[15px]  lg:max-w-[350px] w-full flex justify-center rounded-[30px] `}
      >
        {label}
      </a>
    </div>
  );
};

export default Button;
