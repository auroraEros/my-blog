import Image from "next/image";
import Link from "next/link";

function CoverImage({ coverImageUrl, slug }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md mb-6">
      <Link href={`/blogs/${slug}`}>
        <Image
          src={coverImageUrl}
          fill
          objectFit="cover"
          alt={`Image about ${slug}`}
          className="object-cover object-center hover:scale-110 transition-all duration-300 ease-out"
          quality={90}
        />
      </Link>
    </div>
  );
}

export default CoverImage;
