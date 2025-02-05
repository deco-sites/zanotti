import { HTMLWidget } from "apps/admin/widgets.ts";
import Section, {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";

/** @titleBy question */
export interface Question {
  /** @title Pergunta */
  question: string;
  /** @title Resposta */
  /** @format rich-text */
  answer: string;
}

export interface Contact {
  title?: string;
  link?: {
    text: string;
    href: string;
  };
}

export interface Props extends SectionHeaderProps {
  questions?: Question[];
}

function Question({ question, answer }: Question) {
  return (
    <details class="collapse collapse-arrow border-t border-base-200">
      <summary class="collapse-title text-xs lg:text-sm font-medium bg-white">
        {question}
      </summary>
      <div
        class="collapse-content bg-white text-xs lg:text-sm "
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </details>
  );
}

export default function FAQ({
  title,
  questions = [
    {
      question: "Como faço para acompanhar o meu pedido?",
      answer:
        "Acompanhar o seu pedido é fácil! Assim que o seu pedido for enviado, enviaremos um e-mail de confirmação com um número de rastreamento. Basta clicar no número de rastreamento ou visitar o nosso site e inserir o número de rastreamento na seção designada para obter atualizações em tempo real sobre a localização e o status de entrega do seu pedido.",
    },
    {
      question: "Qual é a política de devolução?",
      answer:
        "Oferecemos uma política de devolução sem complicações. Se você não estiver completamente satisfeito(a) com a sua compra, pode devolver o item em até 30 dias após a entrega para obter um reembolso total ou troca. Certifique-se de que o item esteja sem uso, na embalagem original e acompanhado do recibo. Entre em contato com a nossa equipe de atendimento ao cliente e eles o(a) orientarão pelo processo de devolução.",
    },
  ],
  contact = {
    title: "",
    description: "",
    link: {
      text: "",
      href: "",
    },
  },
}: Props) {
  return (
    <Section.Container>
      <Section.Header title={title} />

      <ul class="w-full">
        <li class="flex flex-col gap-2">
          {questions.map((question) => <Question {...question} />)}
        </li>
      </ul>
    </Section.Container>
  );
}
