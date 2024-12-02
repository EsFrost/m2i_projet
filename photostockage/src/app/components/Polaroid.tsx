"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Photo } from "../utils/interfaces";

export const Polaroid = () => {
  const [images, setImages] = useState<Photo[]>();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch("http://localhost:3000/photos/photos", {
          headers: {
            Accept: "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImages(data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <div className="flex flex-wrap justify-around gap-[30px] mt-5 mx-2 md:mx-8">
      {images?.map((image) => (
        <div
          key={image.id}
          className="
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
        mx-auto
        border border-1 border-gray-100
        "
          polaroid-caption={image.name}
        >
          <Link href={`/photo/${image.id}`}>
            <Image
              src={image.path}
              width={0}
              height={0}
              alt={image.name}
              sizes="100vw"
              className="max-w-[250px] min-w-[250px] w-auto h-auto opacity-50 hover:opacity-100 transition-all duration-500 mx-auto"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};
