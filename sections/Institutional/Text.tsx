import { RichText } from "apps/admin/widgets.ts";

interface Props {
  html?: RichText;
}

const Text = ({ html }: Props) => {
  return (
    <>
      {html && (
        <div
          class="fluid-text text-xs lg:text-sm mb-5 container px-5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </>
  );
};

export default Text;
