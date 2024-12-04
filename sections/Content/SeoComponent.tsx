interface Props {
    /**
     * @title Titulo do componente
     */
    title?: string;
    /**
     * @title Conteudo do componente
     * @format rich-text
     */
    content?: string;
}
const SeoComponent = ({ ...props }: Props) => {
    return (
        <div class="container px-5 lg:px-0">
            <div class="flex flex-col text-center w-full">
                <h3 class="font-semibold mb-3 text-base uppercase">{props?.title}</h3>
                <div
                    class="text-center font-normal text-xs family-secondary"
                    dangerouslySetInnerHTML={{ __html: props?.content || "" }}
                />
            </div>
        </div>
    );
};

export default SeoComponent;
