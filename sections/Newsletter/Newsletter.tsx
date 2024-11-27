import { AppContext } from "../../apps/site.ts";
import Icon from "../../components/ui/Icon.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";
import { usePlatform } from "../../sdk/usePlatform.tsx";
import { useComponent } from "../Component.tsx";
import { type SectionProps } from "@deco/deco";
import { useScript } from "@deco/deco/hooks";
interface NoticeProps {
  title?: string;
  description?: string;
}
export interface Props {
  empty?: NoticeProps;
  success?: NoticeProps;
  failed?: NoticeProps;
  /** @description Signup label */
  label?: string;
  /** @description Input placeholder */
  emailPlaceholder?: string;
  namePlaceholder?: string;
  birthdayPlaceholder?: string;
  textLegal?: string;
  /** @hide true */
  status?: "success" | "failed";
}
const onLoad = () => {
  (document.getElementById("birthday") as HTMLInputElement).oninput = (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, "");
    if (value.length > 2 && value.length <= 4) {
      target.value = value.replace(/(\d{2})(\d{1,2})/, "$1/$2").substring(
        0,
        10,
      );
    } else if (value.length > 4) {
      target.value = value.replace(
        /(\d{2})(\d{2})(\d{1,4})/,
        "$1/$2/$3",
      ).substring(0, 10);
    }
  };
};
export async function action(props: Props, req: Request, ctx: AppContext) {
  const form = await req.formData();
  const email = `${form.get("email") ?? ""}`;
  const fullName = `${form.get("name") ?? ""}`;
  const firstSpaceIndex = fullName.indexOf(" ");
  const firstName = fullName.substring(0, firstSpaceIndex);
  const restOfName = fullName.substring(firstSpaceIndex + 1);
  const birthday = `${form.get("birthday") ?? ""}`;
  const [day, month, year] = birthday.split('/');
  const birthDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
  const data = {
    firstName,
    lastName: restOfName,
    email,
    birthDate,
  };
  // deno-lint-ignore no-explicit-any
  await (ctx as any).invoke(
    "vtex.actions.masterdata.createDocument",
    {
      acronym: "CL",
      data,
    }
  );
  return { ...props, status: "success" };
}
export function loader(props: Props) {
  return { ...props, status: undefined };
}
function Notice({ title, description }: {
  title?: string;
  description?: string;
}) {
  return (
    <div class="flex flex-col justify-center items-start gap-2 max-w-sm">
      <span class="text-xl font-semibold text-center sm:text-start text-white">
        {title}
      </span>
      <span class="text-xs font-normal text-base-300 text-start text-white">
        {description}
      </span>
    </div>
  );
}
function Newsletter({
  empty = {
    title: "Assine nossa Newsletter",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et massa mi. Aliquam in hendrerit urna.",
  },
  success = {
    title: "Obrigado por se inscrever!",
    description:
      "Agora você está inscrito para receber as últimas notícias, tendências e promoções exclusivas diretamente em sua caixa de entrada. Fique atento!",
  },
  failed = {
    title: "Ops. Algo deu errado!",
    description:
      "Algo deu errado. Por favor, tente novamente. Se o problema persistir, entre em contato conosco.",
  },
  label = "Cadastrar",
  emailPlaceholder = "E-mail",
  namePlaceholder = "Nome completo",
  birthdayPlaceholder = "Data de Nascimento",
  status,
  textLegal =
    "*Ao clicar em Cadastrar você declara que aceita os <a target='_blank' class='underline' href='https://sac.allever.com/hc/pt-br/articles/10326086768788-Termos-de-Uso'>Termos de Privacidade</a>",
}: SectionProps<typeof loader, typeof action>) {
  if (status === "success" || status === "failed") {
    return (
      <div class="bg-primary p-14 flex flex-col sm:flex-row items-center justify-center gap-5 sm:gap-10">
        <Icon
          size={80}
          class={clx(status === "success" ? "text-success" : "text-error")}
          id={status === "success" ? "check-circle" : "error"}
        />
        <Notice {...status === "success" ? success : failed} />
      </div>
    );
  }
  return (
    <>
      <div class="bg-primary">
        <Section.Container>
          <div class="flex space-between flex-col lg:flex-row items-center px-5 py-11 gap-5">
            <Notice {...empty} />
            <form
              class="flex justify-center flex-col lg:gap-4 w-full"
              hx-swap="outerHTML"
              hx-post={useComponent(import.meta.url)}
              hx-target="closest section"
            >
              <div class="flex gap-[13px] lg:gap-[10px] flex-col lg:flex-row">
                <input
                  name="name"
                  class="p-4 border border-white rounded-[20px] bg-transparent placeholder-white outline-0 text-white"
                  type="text"
                  placeholder={namePlaceholder}
                  pattern="^[a-zA-ZÀ-ÿ\s'-]{2,}$"
                />

                <input
                  name="email"
                  class="p-4 border border-white rounded-[20px] bg-transparent placeholder-white outline-0 text-white"
                  type="email"
                  placeholder={emailPlaceholder}
                  pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                />
                <input
                  id="birthday"
                  name="birthday"
                  class="p-4 border border-white rounded-[20px] bg-transparent placeholder-white outline-0 text-white"
                  type="text"
                  pattern="^(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[0-2])/(19|20)\d\d$"
                  maxLength={10}
                  placeholder={birthdayPlaceholder}
                />
                <button
                  class="bg-black rounded-[20px] px-[21px] py-[13px] "
                  type="submit"
                >
                  <span class="[.htmx-request_&]:hidden inline text-white">
                    {label}
                  </span>
                  <span class="[.htmx-request_&]:inline-block hidden loading loading-spinner text-white" />
                </button>
              </div>
              <p
                class="text-white text-[13px] mt-[13px] lg:mt-0"
                dangerouslySetInnerHTML={{ __html: textLegal }}
              >
              </p>
            </form>
          </div>
        </Section.Container>
      </div>
      <script
        type="text/javascript"
        defer
        dangerouslySetInnerHTML={{
          __html: useScript(onLoad),
        }}
      />
    </>
  );
}
export default Newsletter;
