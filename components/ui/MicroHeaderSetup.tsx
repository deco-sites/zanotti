import { useEffect } from "preact/hooks";

interface Props {
  threshold?: number;
}

const setup = ({ threshold = 100 }: Props) => {
  const body = document.querySelector("body");

  if (!body) {
    console.warn("Unable to find body element");
    return;
  }

  const homePage = globalThis.location.pathname === "/";
  const scrollY = globalThis.scrollY;
  if (scrollY > threshold) {
    body.classList.add("is-scrolled");
  } else {
    body.classList.remove("is-scrolled");
  }

  if (homePage) {
    if (body.classList.contains("is-otherpage")) {
      body.classList.remove("is-otherpage");
    }
    body.classList.add("is-homepage");
  } else {
    if (body.classList.contains("is-homepage")) {
      body.classList.remove("is-homepage");
    }
    body.classList.add("is-otherpage");
  }

  setInterval(() => {
    const scrollY = globalThis.scrollY;
    if (scrollY > threshold) {
      body.classList.add("is-scrolled");
    } else {
      body.classList.remove("is-scrolled");
    }
  }, 100);
};

function MicroHeaderSetup({ threshold }: Props) {
  useEffect(() => setup({ threshold }));

  return <div data-micro-header-controller-js />;
}

export default MicroHeaderSetup;
