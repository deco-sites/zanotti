import { useScript } from "@deco/deco/hooks";
import { useComponent } from "../Component.tsx";
import type { AppContext } from "../../apps/site.ts";

const onLoad = () => {
  (document.getElementById("cpf") as HTMLInputElement).oninput = (e) => {
    const target = e.target as HTMLInputElement;
    const value = target.value.replace(/\D/g, "");
    if (value.length <= 11) {
      target.value = value.replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    } else {
      target.value = value.replace(/(\d{2})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1/$2")
        .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
    }
  };

  (document.getElementById("telefone") as HTMLInputElement).oninput = (e) => {
    const target = e.currentTarget as HTMLInputElement;
    const value = target.value.replace(/\D/g, "");
    if (value.length > 10) {
      target.value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else {
      target.value = value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    }
  };
};

export default function Form({
  toast = null,
  message = "Formulario enviado com sucesso!",
}) {
  return (
    <div>
      <div class="container px-5 relative">
        {toast === "success" && (
          <div class="toast toast-end z-[1]">
            <div class="alert alert-success text-white">
              <span class="text-wrap">{message}</span>
            </div>
          </div>
        )}

        {toast === "error" && (
          <div class="toast toast-end z-[1]">
            <div class="alert alert-error text-white">
              <span class="text-wrap">{message}</span>
            </div>
          </div>
        )}

        <form
          class="p-4 lg:p-5 w-full mx-auto my-5 bg-white rounded-3xl border border-light-gray"
          hx-swap="outerHTML"
          hx-post={useComponent(import.meta.url)}
          hx-target="closest section"
        >
          <div class="mb-4">
            <label
              class="block text-xs mb-1"
              htmlFor="email"
            >
              E-mail*
            </label>
            <input
              class="appearance-none border border-light-gray rounded w-full py-2 px-3 text-xs placeholder:text-middle-gray leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              name="email"
              placeholder="Digite aqui"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-xs mb-1"
              htmlFor="nome"
            >
              Nome completo*
            </label>
            <input
              class="appearance-none border border-light-gray rounded w-full py-2 px-3 text-xs placeholder:text-middle-gray leading-tight focus:outline-none focus:shadow-outline"
              id="nome"
              type="text"
              name="nome"
              placeholder="Digite aqui"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-xs mb-1"
              htmlFor="cpf"
            >
              CPF/CNPJ*
            </label>
            <input
              class="appearance-none border border-light-gray rounded w-full py-2 px-3 text-xs placeholder:text-middle-gray leading-tight focus:outline-none focus:shadow-outline"
              id="cpf"
              type="text"
              name="cpf"
              placeholder="Digite aqui"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-xs mb-1"
              htmlFor="telefone"
            >
              Telefone*
            </label>
            <input
              class="appearance-none border border-light-gray rounded w-full py-2 px-3 text-xs placeholder:text-middle-gray leading-tight focus:outline-none focus:shadow-outline"
              id="telefone"
              type="tel"
              name="telefone"
              placeholder="Digite aqui"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-xs mb-1"
              htmlFor="orderNumber"
            >
              Número do pedido (opcional)
            </label>
            <input
              class="appearance-none border border-light-gray rounded w-full py-2 px-3 text-xs placeholder:text-middle-gray leading-tight focus:outline-none focus:shadow-outline"
              id="orderNumber"
              type="text"
              name="orderNumber"
              placeholder="Digite aqui"
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-xs mb-1"
              htmlFor="reason"
            >
              Motivo do seu contato*
            </label>
            <input
              class="appearance-none border border-light-gray rounded w-full py-2 px-3 text-xs placeholder:text-middle-gray leading-tight focus:outline-none focus:shadow-outline"
              id="reason"
              type="text"
              name="reason"
              placeholder="Digite aqui"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-xs mb-1"
              htmlFor="subject"
            >
              Assunto*
            </label>
            <input
              class="appearance-none border border-light-gray rounded w-full py-2 px-3 text-xs placeholder:text-middle-gray leading-tight focus:outline-none focus:shadow-outline"
              id="subject"
              type="text"
              name="subject"
              placeholder="Digite aqui"
              required
            />
          </div>
          <div class="mb-4">
            <label
              class="block text-xs mb-1"
              htmlFor="mensagem"
            >
              Mensagem*
            </label>
            <textarea
              class="appearance-none border border-light-gray rounded min-h-[300px] w-full py-2 px-3 text-xs placeholder:text-middle-gray leading-tight focus:outline-none focus:shadow-outline"
              id="mensagem"
              name="mensagem"
              placeholder="Digite aqui"
              required
            >
            </textarea>
          </div>
          <div class="flex items-center justify-center lg:justify-start">
            <button
              class="bg-black font-bold py-3 px-4 rounded rounded-[30px] w-full focus:outline-none focus:shadow-outline"
              type="submit"
            >
              <span class="[.htmx-request_&]:hidden inline text-white ">
                ENVIAR
              </span>
              <span class="[.htmx-request_&]:inline-block hidden loading loading-spinner text-white" />
            </button>
          </div>
        </form>
        <script
          type="text/javascript"
          defer
          dangerouslySetInnerHTML={{
            __html: useScript(onLoad),
          }}
        />
      </div>
    </div>
  );
}

export const action = async (
  _props: unknown,
  req: Request,
  ctx: AppContext,
) => {
  const form = await req.formData();

  const cpf = `${form.get("cpf") ?? ""}`;
  const nome = `${form.get("nome") ?? ""}`;
  const email = `${form.get("email") ?? ""}`;
  const telefone = `${form.get("telefone") ?? ""}`;
  const mensagem = `${form.get("mensagem") ?? ""}`;
  const orderNumber = `${form.get("orderNumber") ?? ""}`;
  const reason = `${form.get("reason") ?? ""}`;
  const subject = `${form.get("subject") ?? ""}`;

  const data = {
    cpf,
    nome,
    email,
    telefone,
    mensagem,
    orderNumber,
    reason,
    subject
  };

  try {
    // deno-lint-ignore no-explicit-any
    const response = await (ctx as any).invoke(
      "vtex.actions.masterdata.createDocument",
      {
        acronym: "FC",
        data,
      },
    );
    console.log("response", response);

    return {
      toast: "success",
      message: "Menssagem enviada com sucesso!",
    };
  } catch {
    return {
      toast: "error",
      message: "Erro ao enviar a mensagem. Tente novamente mais tarde.",
    };
  }
};
