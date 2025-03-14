import Image from "next/image";

function Avatar({ src }) {
  const imageSrc = src && src.startsWith('http') ? src : '/images/avatar.png';
  return (
    <div className="relative w-10 h-10 overflow-hidden rounded-full">
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
