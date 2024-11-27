import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface Card {
  content: string;
  label: HTML;
}

interface Props {
  title?: HTML;
  firstCard?: Card;
  secondCard?: Card;
  thirdCard?: Card;
}

const FirstSeller = (props: Props) => {
  return (
    <>
      <section class="text-start container px-5">
        <div
          class="fluid-text mb-8"
          dangerouslySetInnerHTML={{
            __html: props?.title || "",
          }}
        />
        <div class="flex justify-start lg:justify-around items-start lg:items-center flex-col gap-[24px] lg:gap-[0] lg:flex-row">
          <div class="flex flex-row lg:flex-col gap-4 lg:gap-0 lg:space-between items-center max-w-[340px] w-full">
            <div class="shrink-0 bg-primary text-white rounded-full w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center text-2xl font-bold">
              <p class="text-base lg:text-4xl">
                {props?.firstCard?.content}
              </p>
            </div>
            <div class="lg:mt-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: props?.firstCard?.label || "",
                }}
                class="fluid-text text-left lg:text-center"
              />
            </div>
          </div>

          <div class="flex flex-row lg:flex-col gap-4 lg:gap-0 lg:space-between items-center max-w-[340px] w-full">
            <div class="shrink-0 bg-primary text-white rounded-full w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center text-2xl font-bold">
              <p class="text-base lg:text-4xl">
                {props?.secondCard?.content}
              </p>
            </div>
            <div class="lg:mt-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: props?.secondCard?.label || "",
                }}
                class="fluid-text text-left lg:text-center"
              />
            </div>
          </div>
          <div class="flex flex-row lg:flex-col gap-4 lg:gap-0 lg:space-between items-center max-w-[340px] w-full">
            <div class="shrink-0 bg-primary text-white rounded-full w-20 h-20 lg:w-32 lg:h-32 flex items-center justify-center text-2xl font-bold">
              <p class="text-base lg:text-4xl">
                {props?.thirdCard?.content}
              </p>
            </div>
            <div class="lg:mt-4">
              <div
                dangerouslySetInnerHTML={{
                  __html: props?.thirdCard?.label || "",
                }}
                class="fluid-text text-left lg:text-center"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FirstSeller;
