import { apiClient } from "~/api/axiosInstance";
import { ArrayCommentType } from "~/utils/d";

export const getPost = async (
  postId: string | undefined,
  memberId?: number | null,
  isLogin?: boolean
) => {
  try {
    const url = isLogin
      ? `/posts/details/${postId}/${memberId}`
      : `/posts/details/${postId}`;
    const response = await apiClient.get(url);
    return response.data.data;
  } catch (error) {
    console.error(error);
    return {
      attractionAddress: "",
      attractionId: 1,
      attractionName: "",
      memberId: 1,
      commentCount: 1,
      createdAt: "",
      isVoted: false,
      likes: 1,
      modifiedAt: "",
      picture: "",
      postContents: [""],
      postHashTags: [""],
      postId: 1,
      postImageUrls: [""],
      postTitle: "",
      username: "",
      views: 1,
    };
  }
};

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
