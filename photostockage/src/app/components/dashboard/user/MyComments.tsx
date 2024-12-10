import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface CommentWithPhoto {
  comment_id: string;
  content: string;
  photo_id: string;
  id_user: string;
  status: boolean;
  photo: {
    name: string;
    path: string;
  };
}

const MyComments = () => {
  const [comments, setComments] = useState<CommentWithPhoto[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("User ID not found");
        }

        // First fetch all comments by the user
        const commentsResponse = await fetch(
          `http://localhost:3000/comments/user/${userId}`,
          {
            headers: {
              Accept: "application/json",
            },
            credentials: "include",
          }
        );

        if (!commentsResponse.ok) {
          throw new Error(`HTTP error! status: ${commentsResponse.status}`);
        }

        const commentsData = await commentsResponse.json();

        // Then fetch photo details for each comment
        const commentsWithPhotos = await Promise.all(
          commentsData.map(async (comment: CommentWithPhoto) => {
            const photoResponse = await fetch(
              `http://localhost:3000/photos/photo/${comment.photo_id}`,
              {
                headers: {
                  Accept: "application/json",
                },
              }
            );

            if (!photoResponse.ok) {
              throw new Error(
                `Failed to fetch photo for comment ${comment.comment_id}`
              );
            }

            const photoData = await photoResponse.json();
            return {
              ...comment,
              photo: {
                name: photoData.name,
                path: photoData.path,
              },
            };
          })
        );

        setComments(commentsWithPhotos);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch comments"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!comments.length) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600 mb-4">
          You haven&apos;t made any comments yet.
        </p>
        <Link
          href="/"
          className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors duration-200"
        >
          Browse Photos
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4">
      {comments.map((comment) => (
        <div
          key={comment.comment_id}
          className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row gap-6"
        >
          <div className="w-full md:w-1/4">
            <Link href={`/photo/${comment.photo_id}`}>
              <div className="relative w-full pt-[100%]">
                <Image
                  src={comment.photo.path}
                  alt={comment.photo.name}
                  fill
                  className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
                />
              </div>
            </Link>
          </div>

          <div className="flex-1">
            <Link
              href={`/photo/${comment.photo_id}`}
              className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 mb-2 block"
            >
              {comment.photo.name}
            </Link>
            <p className="text-gray-700 mt-2">{comment.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyComments;
