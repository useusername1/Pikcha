import { apiClient } from "../axiosInstance";

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
