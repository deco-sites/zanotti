export function LoadingFallback() {
  return (
    <div class="container px-0 lg:px-5">
      <div class="flex flex-col gap-4 sm:gap-6 w-full">
        <div class="px-5 sm:px-0">
          <div class="skeleton h-[34px] lg:h-[48px] w-full" />
        </div>
        <div class="px-5 sm:px-0 lg:hidden">
          <div class="skeleton h-[44px] w-full" />
        </div>
        <div class="inline-flex gap-[0.5rem] lg:gap-5 w-full overflow-x-hidden">
          <div class="skeleton ml-5 sm:ml-0 min-w-[300px] h-[480px] lg:h-[457px]" />
          <div class="skeleton ml-5 sm:ml-0 min-w-[300px] h-[480px] lg:h-[457px]" />
          <div class="skeleton ml-5 sm:ml-0 min-w-[300px] h-[480px] lg:h-[457px]" />
          <div class="skeleton ml-5 sm:ml-0 min-w-[300px] h-[480px] lg:h-[457px]" />
          <div class="skeleton ml-5 sm:ml-0 min-w-[300px] h-[480px] lg:h-[457px]" />
        </div>
      </div>
    </div>
  );
}

export {
  default,
  loader,
} from "../../components/product/ProductShelfWithTimer.tsx";
