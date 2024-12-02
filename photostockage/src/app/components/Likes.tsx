"use client";
import React, { useState, useEffect } from "react";
import { FcLikePlaceholder, FcLike, FcDislike } from "react-icons/fc";

export const Likes = ({ photo_id }: { photo_id: string }) => {
  const [likes, setLikes] = useState<{ count: number }[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const test = 1;

  useEffect(() => {
    const fetchLikes = async () => {
      if (!photo_id) return;

      try {
        const response = await fetch(
          `http://localhost:3000/likes/likes/${photo_id}`,
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
        setLikes(data);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch likes."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLikes();
  }, [photo_id]);

  if (loading) {
    return <div># Likes</div>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex gap-2 items-center">
      <div className="relative">
        {/* <FcLikePlaceholder className="w-12 h-12" /> */}
        {test === 1 && <FcLikePlaceholder className="w-12 h-12" />}
        <div className="absolute inset-0 flex items-center justify-center text-[#6366F1]">
          {likes.length > 0 ? likes[0].count : 0}
        </div>
      </div>

      <p className="text-xl">Likes</p>
    </div>
  );
};
