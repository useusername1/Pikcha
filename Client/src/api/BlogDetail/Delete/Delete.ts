import { apiClient } from "~/api/axiosInstance";

export const deletePostHandler = (id: string | undefined) => {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    apiClient
      .delete(`/posts/delete/${id}`)
      .then((res) => {
        if (res.status === 204) {
          alert("삭제가 완료되었습니다.");
        }
      })
      .catch((err) => console.log(err));
  }
};

export const deletePostComment = (commentId: number | undefined) => {
  if (window.confirm("정말 삭제하시겠습니까?")) {
    apiClient
      .delete(`/comments/delete/${commentId}`)
      .then((res) => {
        if (res.status === 204) {
          alert("삭제가 완료되었습니다.");
          window.location.reload();
        }
      })
      .catch((err) => console.error(err));
  }
};
