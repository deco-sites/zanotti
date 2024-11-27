import { type ImageWidget } from "apps/admin/widgets.ts";
import { Head } from "$fresh/runtime.ts";
import Image from "apps/website/components/Image.tsx";
import PoweredByDeco from "./PoweredByDeco.tsx";
import PoweredByVtex from "./PoweredByVtex.tsx";
import PoweredByWave from "./PoweredByWave.tsx";
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
   * @title Icone da rede social
   */
  image: ImageWidget;
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
   * @title Trocar logo?
   */
  logo?: ImageWidget;
  /**
   * @title Texto de apoio do logo
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
          <a href="https://certificados.trustvox.com.br/www.eletrotrafo.com.br?hidden=false" class="trustvox-certificate__modal-btn-js" target="_blank">
            <span class="trustvox-certificate__fixed trustvox-certificate__fixed-full-left"></span>
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
              console.log("script", script);
              document.body.appendChild(script);
            })
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
      {label && <p class="text-base font-normal text-dark-gray">{label}</p>}
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
      {title && <p class="text-base font-normal">{title}</p>}
      <ul class="flex flex-wrap gap-2">
        {paymentMethods?.map(({ image, alt }, index) => (
          <li
            key={index}
            class="border border-base-100 rounded flex justify-center items-center"
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
    logo,
    paymentMethods,
    copyright,
    service,
    certified,
    label = "Siga a [allever] nas redes sociais!",
  }: Props,
) {
  const device = useDevice();
  return (
    <>
      {device === "desktop" &&
        (
          <footer
            class="px-5 sm:px-0 pt-10 pb-14"
            style={{ backgroundColor: "#FFF" }}
          >
            <div class="container flex flex-col gap-5 sm:gap-10 px-5 py-10">
              <div class="flex space-between">
                <div class="flex flex-col">
                  <img
                    class="mb-[31px]"
                    loading="lazy"
                    src={logo}
                    alt={label}
                    width={143}
                  />
                  <p class="text-base max-w-[180px]">{label}</p>
                  <ul class="flex mt-5 gap-[3px]">
                    {social.map(({ image, href, alt }) => (
                      <li class="bg-primary p-2 rounded-full">
                        <a href={href} target="_blank">
                          <Image
                            src={image}
                            alt={alt}
                            loading="lazy"
                            width={19}
                            height={19}
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
                <ul class="flex w-[80%] space-between">
                  <li class="flex flex-col gap-4">
                    {links[0] && (
                      <>
                        <a
                          class="text-base font-normal"
                          target="_blank"
                          href={links[0].href}
                        >
                          {links[0].title}
                        </a>
                        <ul class="flex flex-col  gap-[21px] mb-[30px]">
                          {links[0].children &&
                            links[0].children.map(({ title, href }) => (
                              <li>
                                <a
                                  class="text-base font-normal text-dark-gray"
                                  href={href}
                                >
                                  {title}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </>
                    )}
                    {links[1] && (
                      <>
                        <a
                          class="text-base font-normal"
                          target="_blank"
                          href={links[3].href}
                        >
                          {links[3].title}
                        </a>
                        <ul class="flex flex-col gap-[21px]">
                          {links[3].children &&
                            links[3].children.map(({ title, href }) => (
                              <li>
                                <a
                                  class="text-base font-normal text-dark-gray"
                                  href={href}
                                >
                                  {title}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </>
                    )}
                  </li>

                  <li class="flex flex-col gap-4">
                    {links[2] && (
                      <div class="flex gap-4 mb-[30px] flex-col">
                        <a
                          class="text-base font-normal"
                          target="_blank"
                          href={links[1].href}
                        >
                          {links[1].title}
                        </a>
                        <ul class="flex flex-col  gap-[21px]">
                          {links[1].children &&
                            links[1].children.map(({ title, href }) => (
                              <li>
                                <a
                                  class="text-base font-normal text-dark-gray"
                                  href={href}
                                >
                                  {title}
                                </a>
                              </li>
                            ))}
                        </ul>
                      </div>
                    )}
                  </li>

                  <li class="flex flex-col gap-4">
                    {links[3] && (
                      <>
                        <div class="flex flex-col gap-[21px] pb-[30px]">
                          <a
                            class="text-base font-normal"
                            target="_blank"
                            href={links[2].href}
                          >
                            {links[2].title}
                          </a>
                          <ul class="flex flex-col gap-[21px]">
                            {links[2].children &&
                              links[2].children.map(({ title, href }) => (
                                <li>
                                  <a
                                    class="text-base font-normal text-dark-gray"
                                    href={href}
                                  >
                                    {title}
                                  </a>
                                </li>
                              ))}
                          </ul>
                        </div>
                      </>
                    )}
                  </li>
                  <li>
                    {links[3] && (
                      <div class="mb-[21px]">
                        <Payments
                          title="Formas de Pagamento"
                          paymentMethods={paymentMethods?.paymentMethods}
                        />
                      </div>
                    )}

                    {certified && (
                      <div class="mb-[21px]">
                        <CertifiedComponent
                          title={certified?.title}
                          certifieds={certified?.certifieds}
                        />
                      </div>
                    )}
                  </li>
                </ul>
              </div>
            </div>
            <div class="container flex space-between">
              <p class="text-dark-gray text-xs sm:text-sm leading-[25px] px-5 py-0 lg:max-w-[1094px]">
                {copyright}
              </p>
              <div class="flex flex-nowrap items-end justify-center gap-5 px-5">
                <PoweredByWave />
                <PoweredByDeco />
                <PoweredByVtex />
              </div>
            </div>
          </footer>
        )}
      {device === "mobile" &&
        (
          <div class="container px-5 pb-14">
            <div class="flex flex-col py-[35px] mt-5">
              <p class="text-base">{label}</p>
              <ul class="flex mt-5 gap-[10px]">
                {social.map(({ image, href, alt }) => (
                  <li class="bg-primary p-[9px] rounded-[7px]">
                    <a href={href} target="_blank">
                      <Image
                        src={image}
                        alt={alt}
                        loading="lazy"
                        width={25}
                        height={25}
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              {links.map(({ title, children }, index) => (
                <ul key={index} class="flex flex-col gap-2 mb-[10px]">
                  <Collapsable
                    class="bg-light-gray py-[29px] rounded-[20px]"
                    title={
                      <div class="px-5 flex flex-row space-between items-center">
                        <div class="text-base font-normal">{title}</div>
                        {children && children.length > 0 && (
                          <Icon
                            class="group-open:rotate-180 transition-all ease-in-out duration-[400ms]"
                            size={13}
                            id={"arrow-right"}
                          />
                        )}
                      </div>
                    }
                  >
                    {children &&
                      children.map(({ title, href }) => (
                        <li
                          class="flex flex-row gap-[10px] px-5 mt-5"
                          key={href}
                        >
                          <a
                            class="text-base font-normal text-dark-gray"
                            target="_blank"
                            href={href}
                          >
                            {title}
                          </a>
                        </li>
                      ))}
                  </Collapsable>
                </ul>
              ))}
            </div>
            <div class="flex flex-col gap-[23px] my-[23px]">
              <Payments
                title={paymentMethods?.title}
                paymentMethods={paymentMethods?.paymentMethods}
              />
            </div>
            {certified && (
              <CertifiedComponent
                title={certified?.title}
                certifieds={certified?.certifieds}
              />
            )}
            <div>
              <img loading="lazy" src={logo} alt={label} width={144} />
            </div>
            <div>
              <p class="text-dark-gray text-xs py-5 ">
                {copyright}
              </p>
            </div>
            <div class="flex flex-nowrap items-center justify-start gap-5 pb-[38px] ">
              <PoweredByWave />
              <PoweredByDeco />
              <PoweredByVtex />
            </div>
          </div>
        )}
    </>
  );
}
export default Footer;
