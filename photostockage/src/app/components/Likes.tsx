"use client";
import React, { useState, useEffect } from "react";
import { FcLike, FcDislike } from "react-icons/fc";

export const Likes = ({ photo_id }: { photo_id: string }) => {
  const [likes, setLikes] = useState<{ count: string }[]>([]);
  const [liked, setLiked] = useState<{ hasLiked: boolean }>({
    hasLiked: false,
  });
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

        const likeResponse = await fetch(
          `http://localhost:3000/likes/check/${photo_id}`,
          {
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok && !likeResponse.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setLikes(data);
        const likeData = await likeResponse.json();
        setLiked(likeData);
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
      <div className="relative group cursor-pointer">
        <FcLike
          className={`w-12 h-12 ${
            liked.hasLiked ? "opacity-100" : "opacity-30"
          } group-hover:opacity-100 duration-300 transition-all group-hover:scale-[1.2]`}
        />
      </div>

      {likes.length > 0 && likes[0].count === "1" ? (
        <p className="text-xl">{likes[0].count} Like</p>
      ) : (
        <p className="text-xl">{likes[0].count} Likes</p>
      )}
    </div>
  );
};
