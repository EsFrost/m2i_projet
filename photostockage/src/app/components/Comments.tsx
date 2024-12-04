"use client";
import React, { useState, useEffect } from "react";
import { Comment, User } from "../utils/interfaces";

interface CommentWithUser extends Comment {
  username?: string;
}

export const Comments = ({ photo_id }: { photo_id: string }) => {
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!photo_id) return;

      try {
        // Fetch both comments and users in parallel with correct endpoint
        const [commentsResponse, usersResponse] = await Promise.all([
          fetch(`http://localhost:3000/comments/photo/${photo_id}`, {
            headers: { Accept: "application/json" },
          }),
          fetch(`http://localhost:3000/user/users`, {
            // Corrected URL
            headers: { Accept: "application/json" },
          }),
        ]);

        if (!commentsResponse.ok || !usersResponse.ok) {
          throw new Error(`HTTP error! status: ${commentsResponse.status}`);
        }

        const commentsData = await commentsResponse.json();
        const usersData: User[] = await usersResponse.json();

        // Create a map of user IDs to usernames for O(1) lookup
        const userMap = new Map(
          usersData.map((user) => [user.id, user.username])
        );

        // Combine comments with usernames
        const commentsWithUsernames = commentsData.map((comment: Comment) => ({
          ...comment,
          username: userMap.get(comment.id_user) || "Unknown User",
        }));

        setComments(commentsWithUsernames);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error instanceof Error ? error.message : "Failed to fetch data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [photo_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!loading) console.log(comments);

  return (
    <div>
      <div>Comments</div>
      {comments.map((comment) => (
        <div key={comment.id}>
          {comment.content} {comment.username}
        </div>
      ))}
    </div>
  );
};
