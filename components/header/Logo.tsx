import Image from "apps/website/components/Image.tsx";

interface LogoProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
}

function Logo({
  src =
    "http://localhost:8000/live/invoke/website/loaders/image.ts?src=https%3A%2F%2Fozksgdmyrqcxcwhnbepg.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Fassets%2F11097%2F3e00d53d-696d-4266-972b-c5c50c5ac2f3&fit=cover&width=188&height=40",
  alt,
  width = 100,
  height = 23,
}: LogoProps) {
  return (
    <>
      <a href="/" aria-label="Store logo">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
        />
      </a>
    </>
  );
}

export default Logo;
