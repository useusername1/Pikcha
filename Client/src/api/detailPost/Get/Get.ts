import { ArrayCommentType } from "~/@types/detailPost.types";
import { apiClient } from "~/api/axiosInstance";

export const getPostCommentList = async (id: string | undefined) => {
  let result: ArrayCommentType = [];
  await apiClient
    .get(`/comments/listof/${id}`)
    .then((res) => {
      result = res.data.data;
    })
    .catch((err) => console.error(err));
  return result;
};
