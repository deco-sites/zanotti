import Icon from "../../components/ui/Icon.tsx";

interface Props {
  title?: string;
  timeline: {
    firstLabel?: string;
    secondLabel?: string;
    thirdLabel?: string;
  };
}

const TimelineSeller = ({ title = "É Fácil", timeline }: Props) => {
  return (
    <>
      <section class="text-start container px-5">
        <h3 class="text-xl lg:text-3xl font-bold text-black text-start mb-4 lg:mb-8">
          {title}
        </h3>
        <div class="flex flex-col lg:flex-row w-full justify-start lg:justify-between gap-4 lg:gap-16">
          <div class="flex items-center gap-4 lg:flex-col lg:items-end">
            <div class="mr-0 lg:-mr-4 relative z-10 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl">
              <div class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                <Icon id="check" size={30} />
              </div>
            </div>
            <div class="text-sm text-start lg:text-end flex gap-2 lg:gap-4 flex-col mt-8">
              <p class="text-primary font-bold text-base lg:text-3xl">
                01.
              </p>
              <p class="text-black text-base lg:text-xl">
                {timeline?.firstLabel}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 lg:flex-col relative grow">
            <div class="absolute w-16 lg:w-[calc(100%+128px+32px)] top-1/2 lg:top-0 left-0 lg:left-1/2 -translate-y-1/2 lg:-translate-y-0 lg:-translate-x-1/2 h-[calc(100%+128px)] lg:h-16 bg-white" />
            <div class="relative z-10 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl">
              <div class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                <Icon id="check" size={30} />
              </div>
            </div>
            <div class="text-sm text-start lg:text-center flex gap-2 lg:gap-4 flex-col mt-8">
              <p class="text-primary font-bold text-base lg:text-3xl">
                02.
              </p>
              <p class="text-black text-base lg:text-xl">
                {timeline?.secondLabel}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4 lg:flex-col lg:items-start">
            <div class="mr-0 lg:-ml-4 relative z-10 flex flex-col items-center justify-center w-16 h-16 bg-white rounded-full shadow-xl">
              <div class="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                <Icon id="check" size={30} />
              </div>
            </div>
            <div class="text-sm text-start flex gap-2 lg:gap-4 flex-col mt-8">
              <p class="text-primary font-bold text-base lg:text-3xl">
                03.
              </p>
              <p class="text-black text-base lg:text-xl">
                {timeline?.thirdLabel}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TimelineSeller;
