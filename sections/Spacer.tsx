import { useDevice } from "@deco/deco/hooks";

export function LoadingFallback() {
  return (
    <div
      style={{ height: "2rem" }}
    />
  );
}
export default function Spacer() {
  const device = useDevice();

  return (
    <div
      style={{
        height: device === "mobile" ? "1rem" : "2rem",
      }}
    />
  );
}
