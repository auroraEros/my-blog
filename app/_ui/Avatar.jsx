import Image from "next/image";

function Avatar({ src }) {
  return (
    <div className="relative w-10 h-10 overflow-hidden rounded-full">
      <Image
        src={src || "/images/avatar.png"}
        alt="user's avatar"
        layout="fill"
        objectFit="cover"
      />
    </div>
  );
}

export default Avatar;
