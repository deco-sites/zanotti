import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Button {
  link: string;
  label: HTML;
}

interface Props {
  text?: HTML;
  title?: HTML;
  button?: Button;
}

const SecondSeller = (props: Props) => {
  return (
    <>
      <section class="text-start container px-5">
        <div
          dangerouslySetInnerHTML={{
            __html: props?.title || "",
          }}
          class="fluid-text mb-4"
        />
        <a
          dangerouslySetInnerHTML={{
            __html: props?.button?.label || "",
          }}
          href={props?.button?.link}
          class="bg-black text-white text-sm lg:text-base font-bold py-3 lg:py-4 px-5 mb-8 inline-block w-full rounded-full text-center"
        />
      </section>

      <section class="container px-5">
        <div
          dangerouslySetInnerHTML={{ __html: props?.text || "" }}
          class="fluid-text text-left"
        />
      </section>
    </>
  );
};

export default SecondSeller;
