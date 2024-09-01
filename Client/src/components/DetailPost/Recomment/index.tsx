import { useState } from "react";
import { ReCommentType } from "../../../utils/d";
import * as shared from "../styled";
import { useRecoilState } from "recoil";
import { UserDataAtomFamily } from "../../../recoil/auth";
import { deletePostComment } from "../../../api/BlogDetail/Delete/Delete";
import { modifiedComment } from "../../../api/BlogDetail/Patch/Patch";

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
          <shared.PostCommentBox>
            <shared.PostCommentTitle>
              <shared.PostCommentImg
                alt="userImg"
                src={recomments.memberPicture}
              />
              <div>
                <shared.PostCommentUserName
                  writer={postWriter === recomments.memberId ? "writer" : ""}
                >
                  {recomments.username}
                </shared.PostCommentUserName>
                <shared.PostCommentDate>
                  {recomments.createdAt.slice(0, 4)}년{" "}
                  {recomments.createdAt.slice(5, 7)}월{" "}
                  {recomments.createdAt.slice(8, 10)}일
                </shared.PostCommentDate>
              </div>
            </shared.PostCommentTitle>
            {memberId === recomments.memberId || memberId === 1 ? (
              <shared.PostManageButtonContainer>
                <shared.PostManageButton
                  onClick={() => {
                    setIsRecomment(!isRecomment);
                    setRecommentIdx(recomments.commentId);
                  }}
                ></shared.PostManageButton>
                {isEdit && recommentIdx === recomments.commentId ? (
                  <shared.PostManageButton
                    onClick={() =>
                      modifiedComment(recomments.commentId, recommentContent)
                    }
                  >
                    완료
                  </shared.PostManageButton>
                ) : (
                  <shared.PostManageButton
                    onClick={() => {
                      setIsEdit(!isEdit);
                      setRecommentIdx(recomments.commentId);
                    }}
                  >
                    수정
                  </shared.PostManageButton>
                )}
                {isEdit && recommentIdx === recomments.commentId ? (
                  <shared.PostManageButton onClick={() => setIsEdit(!isEdit)}>
                    취소
                  </shared.PostManageButton>
                ) : (
                  <shared.PostManageButton
                    onClick={() => deletePostComment(recomments.commentId)}
                  >
                    삭제
                  </shared.PostManageButton>
                )}
              </shared.PostManageButtonContainer>
            ) : null}
          </shared.PostCommentBox>
          {isEdit && recommentIdx === recomments.commentId ? (
            <shared.PostCommentInputContainer
              padding="20px 40px"
              width="100%"
              height="100px"
            >
              <textarea
                defaultValue={recomments.commentContent}
                onChange={(e) => setRecommentContent(e.target.value)}
              ></textarea>
            </shared.PostCommentInputContainer>
          ) : (
            <>{recomments.commentContent}</>
          )}
        </div>
      )}
    </>
  );
};

export default Recomment;
