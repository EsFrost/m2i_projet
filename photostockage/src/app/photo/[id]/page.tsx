"use client";
import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Photo } from "../../utils/interfaces";
import { Likes } from "@/app/components/Likes";
import { Comments } from "@/app/components/Comments";

export const SinglePhoto = () => {
  const [photo, setPhoto] = useState<Photo>({
    id: "",
    user_id: "",
    name: "",
    description: "",
    path: "",
    status: false,
  });

  const pathname = usePathname();
  const id = pathname?.split("/").pop();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      if (!id) return;

      try {
        const response = await fetch(
          `http://localhost:3000/photos/photo/${id}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error status: ${response.status}`);
        }

        const data = await response.json();
        setPhoto(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch photo."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPhoto();
  }, [id]);

  if (loading) {
    return <div className="mt-[5rem] text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="mt-[5rem] text-center">
        <p>{error}</p>
      </div>
    );
  }

  if (!photo) {
    return <div className="mt-[5rem] text-center">No photo found</div>;
  }

  return photo.status ? (
    <>
      <div className="mt-[5rem] min-h-screen md:min-h-0 mx-auto">
        <div
          className="
          border-solid
          p-[15px] pb-[60px] 
          shadow-[5px_15px_15px_rgb(225,225,225)] 
          h-full relative
          hover:shadow-[-5px_15px_15px_rgb(225,225,225)] 
          transition-all duration-500
          after:content-[attr(polaroid-caption)] 
          after:absolute after:bottom-0 after:left-0 
          after:w-full after:text-center 
          after:p-[10px] after:text-[30px]
          border border-1 border-gray-100
        "
          polaroid-caption={photo.name}
        >
          <Image
            src={photo.path}
            alt={photo.name}
            sizes="100vw"
            width={0}
            height={0}
            quality={100}
            className="w-full h-auto object-scale-down max-w-[80vw] max-h-[80vh] mx-auto"
            unoptimized
          />
        </div>
        <div className="mt-8">
          <Likes photo_id={photo.id} />
        </div>
      </div>

      <div className="mx-[10rem] mt-8">{photo.description}</div>

      <div className="mt-8">
        <Comments photo_id={photo.id} />
      </div>
    </>
  ) : (
    <div className="mt-[5rem] text-center">
      <p>This photo has been made private.</p>
    </div>
  );
};

export default SinglePhoto;
