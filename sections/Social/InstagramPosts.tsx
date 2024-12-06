import Image from "apps/website/components/Image.tsx";
import {
  type Props as SectionHeaderProps,
} from "../../components/ui/Section.tsx";
import { type SectionProps } from "@deco/deco";
export interface Data {
  id: string;
  permalink: string;
  media_type: string;
  media_url: string;
}
export interface Props extends SectionHeaderProps {
  /**
   * @description Get it in Facebook app. Expires every 90 days.
   */
  facebookToken: string;
  /**
   * @title Number of posts
   */
  nposts: number;
}
const FIELDS = "media_url,media_type,permalink";
const fetchPosts = async (token: string): Promise<Data[]> => {
  try {
    const response = await fetch(
      `https://graph.instagram.com/me/media?access_token=${token}&fields=${FIELDS}`,
    );
    if (!response.ok) {
      throw new Error(await response.text());
    }
    const json = await response.json();
    console.log(json);
    return json.data;
  } catch (error) {
    console.error("Instagram API returned the following error:", error);
    return [
      {
        id: "placeholderInsta",
        permalink: "#",
        media_type: "IMAGE",
        media_url:
          "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/zanotti/d2ceb863-2e85-45a7-a6bc-6245d1207222/image-3-(1).png",
      },
      {
        id: "placeholderInsta",
        permalink: "#",
        media_type: "IMAGE",
        media_url:
          "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/zanotti/d2ceb863-2e85-45a7-a6bc-6245d1207222/image-3-(1).png",
      },
      {
        id: "placeholderInsta",
        permalink: "",
        media_type: "IMAGE",
        media_url:
          "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/zanotti/d2ceb863-2e85-45a7-a6bc-6245d1207222/image-3-(1).png",
      },
      {
        id: "placeholderInsta",
        permalink: "",
        media_type: "IMAGE",
        media_url:
          "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/zanotti/d2ceb863-2e85-45a7-a6bc-6245d1207222/image-3-(1).png",
      },
      {
        id: "placeholderInsta",
        permalink: "",
        media_type: "IMAGE",
        media_url:
          "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/zanotti/d2ceb863-2e85-45a7-a6bc-6245d1207222/image-3-(1).png",
      },
      {
        id: "placeholderInsta",
        permalink: "",
        media_type: "IMAGE",
        media_url:
          "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/zanotti/d2ceb863-2e85-45a7-a6bc-6245d1207222/image-3-(1).png",
      },
    ];
  }
};
export async function loader(
  { facebookToken, nposts, ...rest }: Props,
  _req: Request,
) {
  const posts = await fetchPosts(facebookToken);
  return {
    ...rest,
    posts: posts.slice(0, nposts ?? 12),
  };
}
export default function InstagramPosts({
  title,
  posts = [
    {
      id: "placeholderInsta",
      permalink: "#",
      media_type: "IMAGE",
      media_url:
        "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/zanotti/d2ceb863-2e85-45a7-a6bc-6245d1207222/image-3-(1).png",
    },
    {
      id: "placeholderInsta",
      permalink: "#",
      media_type: "IMAGE",
      media_url:
        "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/zanotti/d2ceb863-2e85-45a7-a6bc-6245d1207222/image-3-(1).png",
    },
    {
      id: "placeholderInsta",
      permalink: "#",
      media_type: "IMAGE",
      media_url:
        "https://deco-sites-assets.s3.sa-east-1.amazonaws.com/zanotti/d2ceb863-2e85-45a7-a6bc-6245d1207222/image-3-(1).png",
    },
  ],
}: SectionProps<typeof loader>) {
  return (
    <div class="container">
      <div class="mb-3">
        <span class="text-lg lg:text-xl font-semibold font-secondary">{title}</span>
      </div>
      <div class="grid grid-cols-2 lg:grid-cols-6 gap-3 lg:gap-4 ">
        {posts.map((item) => (
          <a href={item.permalink} target="_blank">
            {item.media_type === "IMAGE"
              ? (
                <Image
                  loading="lazy"
                  class="max-w-full max-h-full object-cover rounded-lg"
                  style={{ aspectRatio: "1 / 1" }}
                  src={item.media_url ?? ""}
                  width={320}
                  height={320}
                />
              )
              : (
                <video controls class="max-w-full max-h-full object-cover">
                  <source src={item.media_url}></source>
                </video>
              )}
          </a>
        ))}
      </div>
    </div>
  );
}
