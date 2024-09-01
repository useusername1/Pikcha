import { useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { useNavigate } from "react-router-dom";
import { getTime } from "~/utils/utils";
import { isEditMode, UserData } from "~/recoil/myPageState";
import { MyPostsType } from "~/utils/d";
import { apiClient } from "~/api/axiosInstance";
import { MdDeleteForever as DeleteIcon } from "react-icons/md";
import { MdModeEditOutline as EditIcon } from "react-icons/md";
import * as mpc from "./styled";
interface MyPagePostCardItemProps {
  postInfo: MyPostsType;
}

const MyPagePostCardItem = ({ postInfo }: MyPagePostCardItemProps) => {
  const navigate = useNavigate();
  const editPosts = useRecoilValue(isEditMode);
  const [startDeleteAnimation, setStartDeleteAnimation] = useState(false);
  const [userData, setUserData] = useRecoilState(UserData);

  const { postId, postTitle, pictureUrl, views, likes, createdAt, modifiedAt } =
    postInfo;
  const URL_FOR_POSTS = `/posts/detail/${postId}`;

  const handleDeleteClick = () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      apiClient
        .delete(`/posts/delete/${postId}`)
        .then((res) => {
          if (res.status === 204 && userData) {
            setStartDeleteAnimation(true);
            setTimeout(
              () =>
                setUserData({
                  ...userData,
                  posts: userData.posts.filter(
                    (el: MyPostsType) => el.postId !== postId
                  ) as typeof userData.posts,
                  totalMyPosts: userData.totalMyPosts - 1,
                }),
              500
            );
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <mpc.MyPagePostCardItemWrapper
      EditMode={editPosts}
      startTransition={startDeleteAnimation}
    >
      <mpc.PostImg src={pictureUrl} onClick={() => navigate(URL_FOR_POSTS)} />
      <mpc.MyPagePostTextInfoLeftContainer>
        <h2 onClick={() => navigate(URL_FOR_POSTS)}>{postTitle}</h2>
        <mpc.PostTextInfoBottom>
          <span>{`조회수 ${views}`}</span>
          <span>{`좋아요 ${likes}`}</span>
        </mpc.PostTextInfoBottom>
      </mpc.MyPagePostTextInfoLeftContainer>
      {editPosts ? (
        <mpc.IconWrapper>
          <EditIcon
            className="edit-icon"
            onClick={() => navigate(`/edit/${postId}`)}
          />
          <DeleteIcon className="delete-icon" onClick={handleDeleteClick} />
        </mpc.IconWrapper>
      ) : (
        <mpc.MyPagePostTextInfoRightContainer>
          <span>{` ${getTime(createdAt)} 작성`}</span>
          {createdAt.slice(0, 16) !== modifiedAt.slice(0, 16) && (
            <span className="modifiedAt">{` ${getTime(modifiedAt)} 수정`}</span>
          )}
        </mpc.MyPagePostTextInfoRightContainer>
      )}
    </mpc.MyPagePostCardItemWrapper>
  );
};
export default MyPagePostCardItem;
