import { RichText } from "apps/admin/widgets.ts";

interface Props {
  html?: RichText;
}

const Text = ({ html }: Props) => {
  return (
    <div class="container">
      {html && (
        <div
          class="fluid-text text-xs lg:text-sm mb-5"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      )}
    </div>
  );
};

export default Text;
