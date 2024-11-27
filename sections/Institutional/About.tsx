import { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Text from "./Text.tsx";

interface Props {
  title?: string;
  html?: HTMLWidget;
  socials?: Social[];
}

interface Social {
  image?: ImageWidget;
  link?: string;
  alt?: string;
}

export const Social = ({ image, link, alt }: Social) => {
  return (
    <div className="rounded-[8px] bg-primary p-[10px]">
      <a href={link}>
        <img src={image} alt={alt} width={25} height={25} />
      </a>
    </div>
  );
};

const About = ({ title, html, socials }: Props) => {
  return (
    <div class="container px-5">
      {title &&
        (
          <div class="container my-8">
            <h1 class="text-[20px] font-semibold text-black">
              {title} <span class="text-primary">[allever]</span>
            </h1>
          </div>
        )}
      {html &&
        (
          <div
            class="fluid-text mb-8 container"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        )}
      {socials && socials.length > 0 && (
        <div class="mb-4">
          <p class="mb-4">Siga a [allever] nas redes sociais!</p>
          <div className="flex gap-[10px]">
            {socials.map((social, index) => (
              <Social
                key={index}
                image={social.image}
                link={social.link}
                alt={social.alt}
              />
            ))}
          </div>
        </div>
      )}
      <p class="text-xs sm:text-sm text-dark-gray">
        Allever Ltda - CNPJ: 43.757.816/0001-77 - Rua Francisco Regin, 339,
        Centro, Cornélio Procópio, PR, CEP - 86300-000 - faleconosco@allever.com
        - (11) 4200-0010
      </p>
    </div>
  );
};

export default About;
