import Image from "next/image";

function Avatar({ src ,size}) {
  const imageSrc = src && src.startsWith("http") ? src : "/images/avatar.png";
  return (
    <div className={`relative w-${size} h-${size} overflow-hidden rounded-full`}>
      <Image
        src={imageSrc}
        alt="user's avatar"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

export default Avatar;
