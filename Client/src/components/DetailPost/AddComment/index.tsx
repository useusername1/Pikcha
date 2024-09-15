import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { handleCommentSubmit } from "~/api/detailPost/Post/Post";
import Button from "~/components/@common/Button";
import { UserDataAtomFamily } from "~/recoil/auth";
import { isLoginModalVisibleAtom } from "~/recoil/modal/atoms";
import * as S from "./styled";
import { profileImg } from "~/data/userData";

const AddComment = () => {
  const [addComment, setAddComment] = useState("");
  const [isLogin] = useRecoilState(UserDataAtomFamily.LOGIN_STATE);
  const { postId } = useParams();
  const setIsLoginModalVisible = useSetRecoilState(isLoginModalVisibleAtom);

  return (
    <S.AddCommentWrapper isLogin={isLogin}>
      <h3>댓글 남기기</h3>
      <div>
        <img src={profileImg} alt="userImg" />
        <textarea
          placeholder={
            isLogin ? "댓글을 남겨주세요!" : "로그인 후 사용해주세요."
          }
          value={addComment}
          onChange={(e) => setAddComment(e.target.value)}
          onClick={() => {
            if (!isLogin) setIsLoginModalVisible(true);
          }}
        />
        {isLogin ? (
          <Button
            type="violet"
            width="75px"
            height="30px"
            text="등록"
            onClick={(e) => handleCommentSubmit(postId, addComment, e)}
          />
        ) : (
          <Button type="gray" width="80px" height="35px" text="등록" />
        )}
      </div>
    </S.AddCommentWrapper>
  );
};

export default AddComment;
