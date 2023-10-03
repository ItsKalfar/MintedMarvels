import { StaticImageData } from "next/image";
import Image from "next/image";
import Link from "next/link";

export const CategoryCard: React.FC<{
  categoryName: string;
  imageUrl: string | StaticImageData;
  url: string;
}> = ({ categoryName, imageUrl, url }) => {
  return (
    <Link href={url}>
      <div className="relative group rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300">
        <div className="relative h-40 w-60 bg-cover bg-center">
          <Image src={imageUrl} alt={categoryName} />
        </div>
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
        <div className="absolute inset-0 flex items-center justify-center text-white text-2xl font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {categoryName}
        </div>
      </div>
    </Link>
  );
};
