import Image, { ImageProps } from "next/image";

const PromoBanner = ({src, alt}: ImageProps) => {
  return ( 
    <Image 
      src={src}
      alt={alt}
      className="w-full h-auto px-5"
      sizes="100vw"
      height={0}
      width={0}
    />
   );
}
 
export default PromoBanner;