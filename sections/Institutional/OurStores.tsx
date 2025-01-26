import { useDevice } from "@deco/deco/hooks";

/** @titleBy title */
interface Cards {
    /**
     * @title Nome da loja
     */
    title?: string;
    /**
     * @title Conteudo de apoio
     */
    content?: string;
    /**
     * @title Endereço
     */
    adress?: Adress;
     /**
     * @title CTA
     */
    cta?: CTA;
}
interface CTA{
        /**
     * @title Label do cta
     */
    label?:string;
        /**
     * @title Link do cta
     */
    link?:string;
         /**
     * @title Marque para abrir em nova aba
     */
    openNewTab?:boolean;
}
interface Adress {
    /**
     * @title Nome da rua
     */
    street?: string;
    /**
     * @title Numero
     */
    number?: string;
    /**
     * @title CEP
     */
    zipCode?: string;
    /**
     * @title Telefone
     */
    phone?: string;
}

interface Props {
    /**
     * @title Clique no + para adicionar um novo card de loja
     */
    props?: Cards[];
}

function OurStores({ props }: Props) {
    return (
        <div class="container">
            {props?.map((card, index) => (
                <CardOurStores
                    key={index}
                    {...card}
                />
            ))}
        </div>
    );
}

function CardOurStores({ ...cards }: Cards) {
    const buildGoogleMapsUrl = (
        street?: string,
        number?: string,
        zipCode?: string,
    ) => {
        if (!street || !number || !zipCode) return null;
        const query = `${street}, ${number}, ${zipCode}`;
        return `https://www.google.com/maps?q=${
            encodeURIComponent(query)
        }&output=embed`;
    };

    const mapUrl = buildGoogleMapsUrl(
        cards?.adress?.street,
        cards?.adress?.number,
        cards?.adress?.zipCode,
    );
    const isMobile = useDevice();
    return (
        <section className="mb-6">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-gray-800 font-secondary">
                    {cards?.title}
                </h2>
                <p className="text-sm">{cards?.content}</p>
            </div>
            <div className="flex flex-col lg:flex-row items-stretch">
                {/* Mapa */}
                <div className="">
                    {mapUrl
                        ? (
                            <iframe
                                src={mapUrl}
                                width={isMobile ? "100%" : "258"}
                                height="149"
                                className="rounded-lg border-0"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            >
                            </iframe>
                        )
                        : (
                            <p className="text-sm text-red-500">
                                Endereço incompleto. Não foi possível gerar o
                                mapa.
                            </p>
                        )}
                </div>
                {/* Informações */}
                <div className="bg-white p-4 flex flex-col justify-center">
                    <p className="text-sm text-gray-800 mb-2 font-semibold">
                        {cards?.adress?.street}
                    </p>
                    <p className="text-sm text-gray-800 mb-4">
                        Fone:{" "}
                        <a
                            href={`tel:${cards?.adress?.phone}`}
                            className="underline"
                        >
                            {cards?.adress?.phone}
                        </a>
                    </p>
                    <a

                        class="bg-black rounded-full py-2 text-white w-full uppercase px-10 text-center"
                        href={cards?.cta?.link}
                        target={cards?.cta?.openNewTab && "_blank"}
                    >
                      {cards?.cta?.label || "Ir até a loja"}
                    </a>
                </div>
            </div>
        </section>
    );
}

export default OurStores;
