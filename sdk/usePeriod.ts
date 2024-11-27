import { PERIODICITY } from "../constants.ts";

export const usePeriod = (str: string) => {
  if (!str) return "";
  const [value, period] = str.trim().split(" ");
  if (value && period) {
    if (period === "month") {
      if (parseInt(value) === 1) return PERIODICITY[period];
      if (parseInt(value) >= 2) {
        return PERIODICITY.months.replace("__count__", value);
      }
    }

    if (period === "year") return PERIODICITY[period];
  }

  return "";
};
