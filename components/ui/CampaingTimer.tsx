import { useScript } from "@deco/deco/hooks";

interface CampaignTimerProps {
  id: string;
  expiresAt: string;
  type?: 1 | 2;
}

const onLoad = (
  id: string,
  expiresAt: string,
) => {
  const calculateTimeLeft = () => {
    const difference = +new Date(expiresAt) - +new Date();
    const container = document.getElementById(id);
    if (!container) return;
    const days = Math.max(Math.floor(difference / (1000 * 60 * 60 * 24)), 0);
    const hours = Math.max(Math.floor((difference / (1000 * 60 * 60)) % 24), 0);
    const minutes = Math.max(Math.floor((difference / 1000 / 60) % 60), 0);
    const seconds = Math.max(Math.floor((difference / 1000) % 60), 0);
    if (seconds === 0 && minutes === 0 && hours === 0 && days === 0) {
      container.classList.add("hidden");
    }
    container.querySelector("#days #value")!.innerHTML = formatTime(days);
    container.querySelector("#hours #value")!.innerHTML = formatTime(hours);
    container.querySelector("#minutes #value")!.innerHTML = formatTime(minutes);
    container.querySelector("#seconds #value")!.innerHTML = formatTime(seconds);
  };

  const formatTime = (time: number) => {
    return String(time).padStart(2, "0");
  };

  setInterval(calculateTimeLeft, 1000);
};

const CampaignTimer = ({
  id,
  type = 1,
  expiresAt,
}: CampaignTimerProps) => {
  return (
    <>
      <div class="flex gap-5 justify-center text-white text-center items-center">
        {["days", "hours", "minutes", "seconds"].map((i) => (
          <div>
            <p
              id={i}
              class={`${
                type === 1 ? "text-xl lg:text-4xl" : "text-lg lg:text-xl"
              } font-bold flex gap-3`}
            >
              <span id="value" />
              {i !== "seconds" && <span>:</span>}
            </p>
          </div>
        ))}
      </div>
      <script
        type="module"
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad, id, expiresAt),
        }}
      />
    </>
  );
};

export default CampaignTimer;
