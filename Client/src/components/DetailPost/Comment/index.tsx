import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Recomment from "../Recomment";
import { deletePostComment } from "~/api/detailPost/Delete/Delete";
import { modifiedComment } from "~/api/detailPost/Patch/Patch";
import { handleCommentSubmit } from "~/api/detailPost/Post/Post";
import { UserDataAtomFamily } from "~/recoil/auth";
import { isLoginModalVisibleAtom } from "~/recoil/modal/atoms";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import * as S from "./styled";
import * as DP from "../styled";
import { CommentType } from "~/@types/detailPost.types";
import { ReCommentType } from "../types";

const Comment = ({
  comments,
  postWriter,
}: {
  comments: CommentType;
  postWriter: number | undefined;
}) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isRecomment, setIsRecomment] = useState(false);
  const [commentIdx, setCommentIdx] = useState(0);
  const [content, setContent] = useState({
    recommentContent: "",
    editcommentContent: "",
  });
  const { recommentContent, editcommentContent } = content;
  const [isMoreRecomment, setIsMoreReomment] = useState(false);
  const [memberId] = useRecoilState(UserDataAtomFamily.MEMBER_ID);
  const setIsLoginModalVisible = useSetRecoilState(isLoginModalVisibleAtom);
  const { id } = useParams();

  return (
    <>
      {comments && (
        <S.PostCommentWrapper key={comments.commentId}>
          <DP.PostCommentBox>
            <DP.PostCommentTitle>
              <DP.PostCommentImg alt="userImg" src={comments.memberPicture} />
              <DP.PostCommentUserName
                writer={postWriter === comments.memberId ? "writer" : ""}
              >
                {comments.username}
              </DP.PostCommentUserName>
              <DP.PostCommentDate>
                {comments.createdAt.slice(0, 4)}년{" "}
                {comments.createdAt.slice(5, 7)}월{" "}
                {comments.createdAt.slice(8, 10)}일
              </DP.PostCommentDate>
              <DP.PostManageButton
                onClick={() => {
                  setIsRecomment(!isRecomment);
                  setCommentIdx(comments.commentId);
                }}
              >
                {isRecomment && commentIdx === comments.commentId
                  ? "답글 취소"
                  : "답글 쓰기"}
              </DP.PostManageButton>
            </DP.PostCommentTitle>
            {memberId === comments.memberId || memberId === 1 ? (
              <DP.PostManageButtonContainer>
                {isEdit && commentIdx === comments.commentId ? (
                  <DP.PostManageButton
                    onClick={() =>
                      modifiedComment(comments.commentId, editcommentContent)
                    }
                  >
                    완료
                  </DP.PostManageButton>
                ) : (
                  <DP.PostManageButton
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setCommentIdx(comments.commentId);
                    }}
                  >
                    수정
                  </DP.PostManageButton>
                )}
                {isEdit && commentIdx === comments.commentId ? (
                  <DP.PostManageButton onClick={() => setIsEdit(!isEdit)}>
                    취소
                  </DP.PostManageButton>
                ) : (
                  <DP.PostManageButton
                    onClick={() => deletePostComment(comments.commentId)}
                  >
                    삭제
                  </DP.PostManageButton>
                )}
              </DP.PostManageButtonContainer>
            ) : null}
          </DP.PostCommentBox>
          {isEdit && commentIdx === comments.commentId ? (
            <DP.PostCommentInputContainer
              padding="20px 40px"
              width="100%"
              height="100px"
            >
              <textarea
                defaultValue={comments.commentContent}
                onChange={(e) =>
                  setContent({
                    ...content,
                    editcommentContent: e.target.value,
                  })
                }
              ></textarea>
            </DP.PostCommentInputContainer>
          ) : (
            <S.PostCommentContentContainer>
              {comments.commentContent}
              {isRecomment && commentIdx === comments.commentId ? (
                <DP.PostCommentInputContainer
                  padding="20px 0"
                  width="70%"
                  height="45px"
                >
                  <textarea
                    value={recommentContent}
                    onChange={(e) =>
                      setContent({
                        ...content,
                        recommentContent: e.target.value,
                      })
                    }
                    placeholder={
                      memberId
                        ? "답글을 작성하세요."
                        : "로그인 후 사용해주세요."
                    }
                    onClick={() => {
                      if (!memberId) setIsLoginModalVisible(true);
                    }}
                  />
                  <button
                    onClick={(e) =>
                      handleCommentSubmit(
                        id,
                        recommentContent,
                        e,
                        comments.commentId
                      )
                    }
                  >
                    작성
                  </button>
                </DP.PostCommentInputContainer>
              ) : null}
              {comments.children.length !== 0 ? (
                <S.PostCommentisMoreRecommentContainer
                  onClick={() => {
                    setIsMoreReomment(!isMoreRecomment);
                    setCommentIdx(comments.commentId);
                  }}
                >
                  {isMoreRecomment && commentIdx === comments.commentId ? (
                    <IoMdArrowDropup size={"20px"} />
                  ) : (
                    <IoMdArrowDropdown size={"20px"} />
                  )}
                  답글 {comments.children.length}개
                </S.PostCommentisMoreRecommentContainer>
              ) : null}
              {isMoreRecomment && commentIdx === comments.commentId
                ? comments.children.map((recomments: ReCommentType) => (
                    <Recomment
                      key={recomments.commentId}
                      recomments={recomments}
                      postWriter={postWriter}
                    />
                  ))
                : null}
            </S.PostCommentContentContainer>
          )}
        </S.PostCommentWrapper>
      )}
    </>
  );
};

export default Comment;
