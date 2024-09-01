import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { deletePostComment } from "../../../api/BlogDetail/Delete/Delete";
import { modifiedComment } from "../../../api/BlogDetail/Patch/Patch";
import { UserDataAtomFamily } from "../../../recoil/auth";
import * as poc from "./styled";
import * as shared from "../styled";
import ReComment from "../Recomment";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { handleCommentSubmit } from "../../../api/BlogDetail/Post/Post";
import { CommentType, ReCommentType } from "../../../utils/d";
import { isModalVisible } from "../../../recoil/setOverlay";

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
  const [_, setIsModal] = useRecoilState(isModalVisible);
  const { id } = useParams();

  return (
    <>
      {comments && (
        <poc.PostCommentWrapper key={comments.commentId}>
          <shared.PostCommentBox>
            <shared.PostCommentTitle>
              <shared.PostCommentImg
                alt="userImg"
                src={comments.memberPicture}
              />
              <shared.PostCommentUserName
                writer={postWriter === comments.memberId ? "writer" : ""}
              >
                {comments.username}
              </shared.PostCommentUserName>
              <shared.PostCommentDate>
                {comments.createdAt.slice(0, 4)}년{" "}
                {comments.createdAt.slice(5, 7)}월{" "}
                {comments.createdAt.slice(8, 10)}일
              </shared.PostCommentDate>
              <shared.PostManageButton
                onClick={() => {
                  setIsRecomment(!isRecomment);
                  setCommentIdx(comments.commentId);
                }}
              >
                {isRecomment && commentIdx === comments.commentId
                  ? "답글 취소"
                  : "답글 쓰기"}
              </shared.PostManageButton>
            </shared.PostCommentTitle>
            {memberId === comments.memberId || memberId === 1 ? (
              <shared.PostManageButtonContainer>
                {isEdit && commentIdx === comments.commentId ? (
                  <shared.PostManageButton
                    onClick={() =>
                      modifiedComment(comments.commentId, editcommentContent)
                    }
                  >
                    완료
                  </shared.PostManageButton>
                ) : (
                  <shared.PostManageButton
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setCommentIdx(comments.commentId);
                    }}
                  >
                    수정
                  </shared.PostManageButton>
                )}
                {isEdit && commentIdx === comments.commentId ? (
                  <shared.PostManageButton onClick={() => setIsEdit(!isEdit)}>
                    취소
                  </shared.PostManageButton>
                ) : (
                  <shared.PostManageButton
                    onClick={() => deletePostComment(comments.commentId)}
                  >
                    삭제
                  </shared.PostManageButton>
                )}
              </shared.PostManageButtonContainer>
            ) : null}
          </shared.PostCommentBox>
          {isEdit && commentIdx === comments.commentId ? (
            <shared.PostCommentInputContainer
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
            </shared.PostCommentInputContainer>
          ) : (
            <poc.PostCommentContentContainer>
              {comments.commentContent}
              {isRecomment && commentIdx === comments.commentId ? (
                <shared.PostCommentInputContainer
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
                      if (!memberId) setIsModal(true);
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
                </shared.PostCommentInputContainer>
              ) : null}
              {comments.children.length !== 0 ? (
                <poc.PostCommentisMoreRecommentContainer
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
                </poc.PostCommentisMoreRecommentContainer>
              ) : null}
              {isMoreRecomment && commentIdx === comments.commentId
                ? comments.children.map((recomments: ReCommentType) => (
                    <ReComment
                      key={recomments.commentId}
                      recomments={recomments}
                      postWriter={postWriter}
                    />
                  ))
                : null}
            </poc.PostCommentContentContainer>
          )}
        </poc.PostCommentWrapper>
      )}
    </>
  );
};

export default Comment;
