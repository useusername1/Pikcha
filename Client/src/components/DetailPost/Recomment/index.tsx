import { useState } from "react";
import { useRecoilState } from "recoil";
import { deletePostComment } from "~/api/detailPost/Delete/Delete";
import { modifiedComment } from "~/api/detailPost/Patch/Patch";
import { UserDataAtomFamily } from "~/recoil/auth";
import { ReCommentType } from "../types";
import * as DP from "../styled";

const Recomment = ({
  recomments,
  postWriter,
}: {
  recomments: ReCommentType;
  postWriter: number | undefined;
}) => {
  const [recommentContent, setRecommentContent] = useState("");
  const [recommentIdx, setRecommentIdx] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [isRecomment, setIsRecomment] = useState(false);
  const [memberId] = useRecoilState(UserDataAtomFamily.MEMBER_ID);
  return (
    <>
      {recomments && (
        <div key={recomments.commentId}>
          <DP.PostCommentBox>
            <DP.PostCommentTitle>
              <DP.PostCommentImg alt="userImg" src={recomments.memberPicture} />
              <div>
                <DP.PostCommentUserName
                  writer={postWriter === recomments.memberId ? "writer" : ""}
                >
                  {recomments.username}
                </DP.PostCommentUserName>
                <DP.PostCommentDate>
                  {recomments.createdAt.slice(0, 4)}년{" "}
                  {recomments.createdAt.slice(5, 7)}월{" "}
                  {recomments.createdAt.slice(8, 10)}일
                </DP.PostCommentDate>
              </div>
            </DP.PostCommentTitle>
            {memberId === recomments.memberId || memberId === 1 ? (
              <DP.PostManageButtonContainer>
                <DP.PostManageButton
                  onClick={() => {
                    setIsRecomment(!isRecomment);
                    setRecommentIdx(recomments.commentId);
                  }}
                ></DP.PostManageButton>
                {isEdit && recommentIdx === recomments.commentId ? (
                  <DP.PostManageButton
                    onClick={() =>
                      modifiedComment(recomments.commentId, recommentContent)
                    }
                  >
                    완료
                  </DP.PostManageButton>
                ) : (
                  <DP.PostManageButton
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setRecommentIdx(recomments.commentId);
                    }}
                  >
                    수정
                  </DP.PostManageButton>
                )}
                {isEdit && recommentIdx === recomments.commentId ? (
                  <DP.PostManageButton onClick={() => setIsEdit(!isEdit)}>
                    취소
                  </DP.PostManageButton>
                ) : (
                  <DP.PostManageButton
                    onClick={() => deletePostComment(recomments.commentId)}
                  >
                    삭제
                  </DP.PostManageButton>
                )}
              </DP.PostManageButtonContainer>
            ) : null}
          </DP.PostCommentBox>
          {isEdit && recommentIdx === recomments.commentId ? (
            <DP.PostCommentInputContainer
              padding="20px 40px"
              width="100%"
              height="100px"
            >
              <textarea
                defaultValue={recomments.commentContent}
                onChange={(e) => setRecommentContent(e.target.value)}
              ></textarea>
            </DP.PostCommentInputContainer>
          ) : (
            <>{recomments.commentContent}</>
          )}
        </div>
      )}
    </>
  );
};

export default Recomment;
