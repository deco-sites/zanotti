import Collapsable from "../../components/ui/Collapsable.tsx";
import Icon from "../../components/ui/Icon.tsx";
import { RichText } from "apps/admin/widgets.ts";

/**
 * @titleBy  faq
 */
interface Props {
  faq?: Faq[];
}

/**
 * @titleBy  title
 */
interface Faq {
  title?: string;
  questions?: Questions[];
}

/**
 * @titleBy  question
 */
interface Questions {
  question?: RichText;
  response?: RichText;
}

const Faq = ({ faq }: Props) => {
  return (
    <div>
      <div className="container px-5 flex gap-4 flex-col">
        {faq?.map((item, index) => (
          <div key={index} class="">
            <p className="mb-4 font-bold text-base">
              {item?.title}
            </p>
            <div className="flex flex-col gap-4">
              {item.questions?.map((q, qIndex) => (
                <div
                  class="bg-light-gray rounded-2xl py-4 px-5"
                  key={qIndex}
                >
                  <Collapsable
                    title={
                      <div className="flex justify-between text-sm items-center">
                        <div
                          class="text-sm lg:text-base"
                          dangerouslySetInnerHTML={{
                            __html: q.question?.toString() || "",
                          }}
                        />
                        <div className="w-[14px] ml-[10px]">
                          <Icon
                            id="arrow-right"
                            className="group-open:rotate-180"
                            size={13}
                          />
                        </div>
                      </div>
                    }
                  >
                    <div
                      className="text-xs lg:text-sm fluid-text text-dark-gray mt-2"
                      dangerouslySetInnerHTML={{
                        __html: q.response?.toString() || "",
                      }}
                    >
                    </div>
                  </Collapsable>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Faq;
