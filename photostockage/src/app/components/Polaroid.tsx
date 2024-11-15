import React from "react";
import Image from "next/image";
import Link from "next/link";

export const Polaroid = () => {
  return (
    <div className="flex flex-wrap justify-around gap-[30px] mt-5 mx-2 md:mx-8">
      {[...Array(18)].map((_, index) => (
        <div
          key={index}
          className="
          border-solid border-1 border-gray-900 
          p-[15px] pb-[60px] 
          shadow-[5px_15px_15px_rgb(225,225,225)] 
          h-full relative
          hover:shadow-[-5px_15px_15px_rgb(225,225,225)] 
          hover:scale-[1.1] 
          transition-all duration-500 
          after:content-[attr(polaroid-caption)] 
          after:absolute after:bottom-0 after:left-0 
          after:w-full after:text-center 
          after:p-[10px] after:text-[30px]
          after:transition-all after:opacity-50 
          after:hover:opacity-100 after:duration-1000
          mx-auto"
          polaroid-caption={`Image ${(index % 2) + 1}`}
        >
          <Link href="/">
            <Image
              src={
                index % 2 === 0
                  ? "https://images.pexels.com/photos/20412111/pexels-photo-20412111/free-photo-of-cactus.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  : "https://images.pexels.com/photos/346529/pexels-photo-346529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              }
              width={0}
              height={0}
              alt="Picture"
              sizes="100vw"
              className="max-w-[250px] min-w-[250px] w-auto h-auto opacity-50 hover:opacity-100 transition-all duration-500 mx-auto"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
