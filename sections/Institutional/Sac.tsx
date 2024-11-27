import { HTMLWidget as HTML } from "apps/admin/widgets.ts";

interface CardProps {
  label: HTML;
  link?: string;
}

interface Props {
  cards?: CardProps[];
}

const Card = ({ label, link }: CardProps) => {
  return (
    <div class="border border-primary py-[13px] rounded-[30px]">
      <a
        class="text-center"
        href={link}
        dangerouslySetInnerHTML={{ __html: label }}
      />
    </div>
  );
};

const CardList = ({ cards }: Props) => {
  return (
    <div class="container flex gap-6 flex-col px-5">
      {cards?.map((card, index) => <Card key={index} {...card} />)}
    </div>
  );
};

export default CardList;
