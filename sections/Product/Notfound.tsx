import Icon from "../../components/ui/Icon.tsx";

interface Props {
  /** @title Titulo */
  title?: string;
  /** @title Conteúdo */
  content?: string;
  /** @title Ajuda */
  help?: string;
  /** @title Botão */
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
            <p class="text-[32px] lg:text-[64px] text-middle-gray text-start lg:text-center mx-auto  py-[35px]">
              {title}
            </p>
          </div>
        )}
      <div class={`mx-auto flex flex-col items-center px-5`}>
        <p
          class={`text-black font-normal justify-center text-start lg:text-center text-base lg:text-[30px] w-full gap-1 lg:leading-[45px] ${
            !title && "border-b-2 border-middle-gray"
          }`}
          dangerouslySetInnerHTML={{ __html: content }}
        >
        </p>
      </div>
    </div>
  );
};

export default Notfound;
