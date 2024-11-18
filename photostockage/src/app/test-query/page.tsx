"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface Photo {
  id: string;
  user_id: string;
  name: string;
  description: string;
  path: string;
  status: boolean;
}

export const TestQuery = () => {
  const [photo, setPhoto] = useState<Photo>({
    id: "",
    user_id: "",
    name: "",
    description: "",
    path: "",
    status: false,
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPhoto = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/photos/photo/660e8400-e29b-41d4-a716-446655440004",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    );
  }

  if (!photo) {
    return <div className="p-4">No photo found</div>;
  }

  return photo.status ? (
    <>
      <div className="mx-auto mt-8">
        <Image
          src={photo.path}
          alt="Picture"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full object-scale-down max-w-[80vw] max-h-[80vh] mx-auto"
          unoptimized
        />
        <div className="p-4">{photo.description}</div>
      </div>
    </>
  ) : (
    <>
      <div>
        <p>This photo has been made private.</p>
      </div>
    </>
  );
};

export default TestQuery;
