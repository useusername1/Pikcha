import React, { Dispatch, SetStateAction } from "react";
import { apiClient } from "~/api/axiosInstance";

export const handleCommentSubmit = async (
  id: string | undefined,
  addComment: string,
  e: React.MouseEvent<HTMLButtonElement>,
  parentId?: number | null
) => {
  e.preventDefault();
  apiClient
    .post(`/comments/upload/${id}`, {
      commentContent: addComment,
      parentId: parentId,
    })
    .then(() => window.location.reload())
    .catch((err) => console.error(err));
};

export const handleLikePost = (
  postId: string | undefined,
  setIsVoted: Dispatch<SetStateAction<boolean>>
) => {
  apiClient
    .post(`/posts/likes/${postId}`)
    .then((res) => setIsVoted(res.data.data.isVoted));
};
