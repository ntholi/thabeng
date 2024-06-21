import React from "react";
import Image from "next/image";

export default function Header() {
  const banner = "/images/test-image.jpg";

  return (
    <div className="relative">
      <Image
        src={banner}
        width={1920}
        height={1080}
        alt="Banner"
        className="h-[50vh] w-full object-cover"
      />
      <div className="absolute inset-0 flex h-full flex-col justify-between bg-black/30 px-6 py-5 text-center text-white sm:px-20">
        <h1 className="text-5xl font-bold sm:text-7xl">Thabeng Hotel</h1>
        <p className="text-xl text-white">
          Savor exquisite flavors with our diverse and delightful menu.
        </p>
      </div>
    </div>
  );
}
