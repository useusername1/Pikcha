import { apiClient } from "~/api/axiosInstance";

export const modifiedComment = (commentId: number, commentContent: string) => {
  apiClient
    .patch(`/comments/edit/${commentId}`, {
      commentContent: commentContent,
    })
    .then(() => window.location.reload())
    .catch((err) => console.error(err));
};
