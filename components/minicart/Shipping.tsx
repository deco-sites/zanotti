import { useEffect, useState } from "preact/hooks";

interface Props {
  shippingValue: number | null;
  setShippingValue: (value: number | null) => void;
}

function Shipping({ shippingValue }: Props) {
  const [postalCode, setPostalCode] = useState<string | null>(null);

  useEffect(() => {
    const storedPostalCode = localStorage.getItem("postalCode");
    if (storedPostalCode) {
      setPostalCode(storedPostalCode);
    }
  }, []);

  return (
    <div class="flex flex-col items-start px-4 mt-2">
      <span class="text-base text-dark-gray">
        {postalCode || "Não definido"}
      </span>
    </div>
  );
}

export default Shipping;
