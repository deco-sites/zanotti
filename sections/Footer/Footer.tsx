import { type ImageWidget } from "apps/admin/widgets.ts";
import { Head } from "$fresh/runtime.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "./PoweredByDeco.tsx";
import PoweredByVtex from "./PoweredByVtex.tsx";
import PoweredByBetoven from "./PoweredByBetoven.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Collapsable from "../../components/ui/Collapsable.tsx";
import { useDevice, useScript } from "@deco/deco/hooks";
/** @titleBy title */
interface Item {
  /**
   * @title Titulo do item
   */
  title: string;
  /**
   * @title Link do item
   */
  href?: string;
}
/** @titleBy title */
interface Link extends Item {
  /**
   * @title Adicionar subitem?
   */
  children: Item[];
}
/** @titleBy alt */
export interface Social {
  /**
   * @title Titulo da rede social
   */
  title?: string;
  /**
   * @title Texto alternativo da rede social
   */
  alt?: string;
  /**
   * @title Link da rede social
   */
  href?: string;
  /**
   * @title Icone da rede social desktop
   */
  imageDesktop: ImageWidget;
  /**
   * @title Icone da rede social Mobile
   */
  imageMobile: ImageWidget;
}
interface Props {
  /**
   * @title Adicionar novos itens?
   */
  links?: Link[];
  /**
   * @title Adicionar nova rede social?
   */
  social?: Social[];
  /**
   * @title Texto de apoio das redes sociais
   */
  label?: string;
  /**
   * @title Texto de copyright
   */
  copyright?: string;
  /**
   * @title Metodo de pagamento
   */
  paymentMethods?: PaymentsProps;
  /**
   * @title Sac
   */
  service?: Service;
  /**
   * @title Certificados de segurança
   */
  certified?: CertifiedProps;
}
interface Payments {
  /**
   * @title Texto alternativo
   * @titleBy alt
   */
  alt?: string;
  /**
   * @title Adicionar imagem?
   */
  image: ImageWidget;
}
interface PaymentsProps {
  /**
   * @title Titulo da sessão de metodos de pagamento
   */
  title?: string;
  /**
   * @title Adicionar novos metodos?
   */
  paymentMethods?: Payments[];
}
interface Service {
  /**
   * @title Titulo do serviço
   * @titleBy title
   */
  title?: string;
  label?: string;
  button?: {
    label?: string;
    link?: string;
  };
}
interface CertifiedProps {
  /**
   * @title Titulo da sessão de certificados
   */
  title?: string;
  /**
   * @title Adicionar novos certificados?
   */
  certifieds?: Certified[];
}
interface Certified {
  /**
   * @title Adicionar nova imagem?
   */
  image: ImageWidget;
  /**
   * @title Texto alternativo
   * @titleBy alt
   */
  alt?: string;
  /**
   * @title Link da imagem
   */
  link?: string;
  /**
   * @title Largura imagem
   */
  width?: number;
  /**
   * @title Altura imagem
   */
  height?: number;
}
function CertifiedComponent({ title, certifieds }: CertifiedProps) {
  return (
    <div class="">
      {title && <p class="text-base font-normal mb-[10px]">{title}</p>}
      <div class="flex flex-col  gap-3">
        <div class="flex flex-row gap-4">
          {certifieds?.slice(0, 2).map((
            { image, alt, link, width, height },
            index,
          ) => (
            <div
              key={index}
              class="rounded flex justify-center items-center cursor-pointer"
            >
              <a href={link} target="_blank">
                <Image
                  src={image}
                  alt={alt || "Certified image"}
                  width={width || 53}
                  height={height || 34}
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
        <div class="flex flex-row gap-4">
          {certifieds?.slice(2, 4).map((
            { image, alt, link, width, height },
            index,
          ) => (
            <div
              key={index}
              class="rounded flex justify-center items-center cursor-pointer"
            >
              <a href={link} target="_blank">
                <Image
                  src={image}
                  alt={alt || "Certified image"}
                  width={width || 53}
                  height={height || 34}
                  loading="lazy"
                />
              </a>
            </div>
          ))}
        </div>
        <div data-trustvox-certificate-fixed="data-trustvox-certificate-fixed">
          <a
            href="https://certificados.trustvox.com.br/www.eletrotrafo.com.br?hidden=false"
            class="trustvox-certificate__modal-btn-js"
            target="_blank"
          >
            <span class="trustvox-certificate__fixed trustvox-certificate__fixed-full-left">
            </span>
          </a>
        </div>
        <script
          type="text/javascript"
          defer
          dangerouslySetInnerHTML={{
            __html: useScript(() => {
              const script = document.createElement("script");
              script.type = "text/javascript";
              script.src = "//certificate.trustvox.com.br/widget.js";
              script.defer = false;
              document.body.appendChild(script);
            }),
          }}
        />
      </div>
    </div>
  );
}
function Service({ title, label, button }: Service) {
  return (
    <div class="flex gap-[21px] flex-col max-w-[200px]">
      {title && <p class="text-base font-normal">{title}</p>}
      {label && <p class="text-base font-normal text-base">{label}</p>}
      {button?.label && button?.link && (
        <a
          href={button.link}
          target="_blank"
          class="flex justify-center gap-[10px] px-5 py-[13px] bg-primary text-white rounded-[20px] hover:bg-blue-600 text-center"
        >
          <Icon id="contact-white" />
          {button.label}
        </a>
      )}
    </div>
  );
}
function Payments({ title, paymentMethods }: PaymentsProps) {
  return (
    <>
      {title && (
        <p class="text-base text-sm font-semibold lg:text-base-200 lg:font-semibold font-secondary lg:text-base">
          {title}
        </p>
      )}
      <ul class="flex flex-wrap gap-4 lg:gap-2">
        {paymentMethods?.map(({ image, alt }, index) => (
          <li
            key={index}
            class="rounded flex justify-center items-center"
          >
            <Image
              src={image}
              alt={alt || "Payment method image"}
              width={53}
              height={34}
              loading="lazy"
            />
          </li>
        ))}
      </ul>
    </>
  );
}
function Footer(
  {
    links = [],
    social = [],
    paymentMethods,
    copyright,
    service,
    certified,
    label = "Redes Sociais",
  }: Props,
) {
  const device = useDevice();
  return (
    <>
      {device === "desktop" && (
        <footer class="footer px-5 sm:px-0 pt-10 pb-14 flex flex-col bg-primary">
          <div class=" container flex flex-col gap-5 sm:gap-10 py-10">
            <div class="grid grid-cols-5">
              {links.map((link, index) => (
                <div
                  key={index}
                  class=" flex flex-col gap-4"
                >
                  {link && (
                    <>
                      <a
                        class="text-base-200 text-base font-semibold font-secondary"
                        target="_blank"
                        href={link.href}
                      >
                        {link.title}
                      </a>
                      {link.children && (
                        <ul class="flex flex-col gap-3">
                          {link.children.map(({ title, href }, subIndex) => (
                            <li key={subIndex}>
                              <a
                                class="text-base-200 font-light  family-secondary text-sm"
                                href={href}
                              >
                                {title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </>
                  )}
                </div>
              ))}
              <div class="footer__payment-methods">
                {links[3] && (
                  <div class="flex flex-col gap-4">
                    <Payments
                      title="Formas de Pagamento"
                      paymentMethods={paymentMethods?.paymentMethods}
                    />
                    <div class="flex flex-col gap-4">
                      <p class="text-base-200 font-semibold text-base font-secondary">
                        {label}
                      </p>
                      <ul class="flex items-center gap-6">
                        {social.map(({ imageDesktop, href, alt }, index) => (
                          <li
                            key={index}
                            class="rounded-full"
                          >
                            <a href={href} target="_blank">
                              <Image
                                src={imageDesktop}
                                alt={alt}
                                loading="lazy"
                                width={27}
                                height={25}
                              />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div class="container flex flex-col lg:gap-10 justify-between">
            <p class="text-base-200 text-xs px-5 py-0 family-secondary text-center">
              {copyright}
            </p>
            <div class="flex mx-auto gap-5 px-5">
              <PoweredByBetoven />
              <PoweredByDeco />
              <PoweredByVtex />
            </div>
          </div>
        </footer>
      )}
      {device === "mobile" &&
        (
          <div class="container px-5 pb-5 mt-6">
            <div>
              {links.map(({ title, children }, index) => (
                <ul key={index} class="flex flex-col gap-2 mb-[10px]">
                  <Collapsable
                    class="bg-base-200 py-3 rounded"
                    title={
                      <div class="px-5 flex flex-row space-between items-center py-2">
                        <div class="text-sm font-semibold font-secondary">
                          {title}
                        </div>
                        {children && children.length > 0 && (
                          <Icon
                            class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                            size={13}
                            id="arrow-down"
                          />
                        )}
                      </div>
                    }
                  >
                    <div class="flex flex-col gap-1 mt-2">
                      {children &&
                        children.map(({ title, href }) => (
                          <li
                            class="flex flex-row gap-1 px-5"
                            key={href}
                          >
                            <a
                              class="text-xs font-normal text-base family-secondary bg-gray-medium py-4 w-full rounded px-2"
                              target="_blank"
                              href={href}
                            >
                              {title}
                            </a>
                          </li>
                        ))}
                    </div>
                  </Collapsable>
                </ul>
              ))}
            </div>
            <div class="flex flex-col bg-base-200 rounded">
              <div class="px-5 py-4 flex flex-col gap-3 ">
                <Payments
                  title={paymentMethods?.title}
                  paymentMethods={paymentMethods?.paymentMethods}
                />

                <div class="flex flex-col gap-3">
                  <p class="text-sm font-semibold font-secondary">{label}</p>
                  <div class="flex flex-row items-center gap-3">
                    {social.map(({ imageMobile, href, alt }) => (
                      <div>
                        <a href={href} target="_blank">
                          <Image
                            src={imageMobile}
                            alt={alt}
                            loading="lazy"
                            width={25}
                            height={25}
                          />
                        </a>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div>
              <p class="text-middle-gray family-secondary text-xs py-5 ">
                {copyright}
              </p>
            </div>
            <div class="flex flex-nowrap items-center justify-start gap-5">
              <PoweredByBetoven />
              <PoweredByDeco />
              <PoweredByVtex />
            </div>
          </div>
        )}
    </>
  );
}
export default Footer;
