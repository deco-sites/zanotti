import Icon from "../../components/ui/Icon.tsx";
import Slider from "../ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  alerts?: string[];
  /**
   * @title Autoplay interval
   * @description time (in seconds) to start the carousel autoplay
   */
  interval?: number;
}

function Alert({ alerts = [], interval = 5 }: Props) {
  const id = useId();

  return (
    <div
      id={id}
      class="flex items-center container overflow-hidden flex-nowrap"
    >
      <Slider.PrevButton
        class="bg-blue block text-primary disabled:opacity-1 relative z-10"
        disabled
      >
        <Icon id="ArrowSlide" size={20} />
      </Slider.PrevButton>

      <div className="grow">
        <Slider class="carousel carousel-center w-full bg-green">
          {alerts.map((alert, index) => (
            <Slider.Item index={index} class="carousel-item w-full">
              <div
                class="px-5 py-2 w-full text-center text-sm"
                dangerouslySetInnerHTML={{ __html: alert }}
              />
            </Slider.Item>
          ))}
        </Slider>
      </div>

      <Slider.NextButton
        class="bg-red block text-primary disabled:opacity-1 relative z-10 top-[1px]"
        disabled={alerts.length < 2}
      >
        <Icon id="ArrowSlide" class="rotate-180" size={20} />
      </Slider.NextButton>

      <Slider.JS rootId={id} interval={interval && interval * 1000} />
    </div>
  );
}

export default Alert;
