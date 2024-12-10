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
        <div class="container">
            <div class="flex flex-col text-center w-full">
                <h3 class="font-semibold mb-3 text-lg lg:text-xl font-secondary">{props?.title}</h3>
                <div
                    class="text-sm lg:text-base"
                    dangerouslySetInnerHTML={{ __html: props?.content || "" }}
                />
            </div>
        </div>
    );
};

export default SeoComponent;
