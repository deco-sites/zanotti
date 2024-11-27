import Icon from "../../components/ui/Icon.tsx";

interface Props {
  /** @title Titulo */
  title?: string;
  /** @title Conteúdo */
  content?: string;
  /** @title Ajuda */
  help?: string;
  /** @title Botão */
  cta?: {
    /** @title Label do botão */
    content?: string;
    /** @title Link do botão */
    link?: string;
  };
}
const Notfound = (
  {
    title,
    content =
      "Não encontramos a página que você tentou </br> acessar. <b>Que tal fazer uma nova busca?</b>",
    help = "Precisa de ajuda? <b class='text-primary'>Fale conosco:</b>",
    cta,
  }: Props,
) => {
  return (
    <div>
      {title &&
        (
          <div class="container px-5">
            <p class="text-[32px] lg:text-[64px] text-middle-gray text-start lg:text-center mx-auto border-b-2 border-middle-gray py-[35px]">
              {title}
            </p>
          </div>
        )}
      <div class={`mx-auto flex flex-col items-center px-5`}>
        <p
          class={`text-black font-normal justify-center py-[45px] text-start lg:text-center text-base lg:text-[30px] w-full gap-1 lg:leading-[45px] ${
            !title && "border-b-2 border-middle-gray"
          }`}
          dangerouslySetInnerHTML={{ __html: content }}
        >
        </p>

        <p
          class="font-normal text-black text-start lg:text-center py-[35px] text-base lg:justify-center lg:text-[30px] w-full flex gap-1"
          dangerouslySetInnerHTML={{ __html: help }}
        >
        </p>
      </div>
      <div class="py-5 px-5 flex justify-center ">
        <a
          class="max-w-[427px] w-full bg-primary rounded-[20px] text-white text-base flex justify-center py-[13px] gap-[10px]"
          href={cta?.link}
        >
          <Icon id="contact-white" width={23} height={23.77} />
          {cta?.content}
        </a>
      </div>
    </div>
  );
};

export default Notfound;
