"use client";
import React, { useState, useEffect, useCallback } from "react";
import { Comment, User } from "../utils/interfaces";
import SlateEditor from "./SlateEditor";

interface CommentWithUser extends Comment {
  username?: string;
}

export const Comments = ({ photo_id }: { photo_id: string }) => {
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
      const tokenExpires = localStorage.getItem("tokenExpires");
      const isAuthenticated =
        isLoggedIn && tokenExpires && Number(tokenExpires) > Date.now();

      setIsAuthenticated(Boolean(isAuthenticated));
    };

    checkAuth();
    window.addEventListener("storage", checkAuth);
    window.addEventListener("logoutEvent", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
      window.removeEventListener("logoutEvent", checkAuth);
    };
  }, []);

  const fetchData = useCallback(async () => {
    if (!photo_id) return;

    try {
      const [commentsResponse, usersResponse] = await Promise.all([
        fetch(`http://localhost:3000/comments/photo/${photo_id}`, {
          headers: { Accept: "application/json" },
        }),
        fetch(`http://localhost:3000/user/users`, {
          headers: { Accept: "application/json" },
        }),
      ]);

      if (!commentsResponse.ok || !usersResponse.ok) {
        throw new Error(`HTTP error! status: ${commentsResponse.status}`);
      }

      const commentsData = await commentsResponse.json();
      const usersData: User[] = await usersResponse.json();

      const userMap = new Map(
        usersData.map((user) => [user.id, user.username])
      );

      const commentsWithUsernames = commentsData.map((comment: Comment) => ({
        ...comment,
        username: userMap.get(comment.id_user) || "Unknown User",
      }));

      setComments(commentsWithUsernames);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error instanceof Error ? error.message : "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  }, [photo_id]); // Dependency array ensures fetchData is recreated only when photo_id changes.

  useEffect(() => {
    fetchData();
  }, [fetchData]); // No warning now!

  const handleCommentSubmit = async (content: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/comments/add/${photo_id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ content }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to post comment");
      }

      // Refresh comments after successful submission
      await fetchData();
    } catch (error) {
      console.error("Error posting comment:", error);
      setError(
        error instanceof Error ? error.message : "Failed to post comment"
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="">
      <div className="mx-auto max-w-xl mb-8">Comments</div>
      {comments.map((comment, index) => (
        <div
          key={`${comment.id}-${index}`}
          className={`${
            index % 2 === 0 ? "bg-[#6366F1] bg-opacity-10" : ""
          } max-w-xl mx-auto border border-1 border-gray-200 rounded-md p-4 flex flex-col mt-4`}
        >
          <div className={`${index % 2 === 0 ? "text-left" : "text-right"}`}>
            {comment.content}
          </div>
          <div className={`${index % 2 === 0 ? "text-right" : "text-left"}`}>
            {" "}
            {comment.username}
          </div>
        </div>
      ))}
      {isAuthenticated ? (
        <div className="mt-8 max-w-xl mx-auto">
          <SlateEditor onSubmit={handleCommentSubmit} />
        </div>
      ) : (
        <div className="mt-8 max-w-xl mx-auto text-center text-gray-500">
          Please log in to leave a comment.
        </div>
      )}
    </div>
  );
};
