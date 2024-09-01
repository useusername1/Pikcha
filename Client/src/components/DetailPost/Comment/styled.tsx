import styled from "styled-components";

const PostCommentWrapper = styled.div`
  width: 70%;
  margin: 20px auto;
`;

const PostCommentisMoreRecommentContainer = styled.div`
  width: 80px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: var(--font-sm);
  margin-top: 10px;
  &:hover {
    color: var(--purple-300);
  }
`;

const PostCommentContentContainer = styled.div`
  padding-left: 2.5em;
  border-bottom: 1px solid var(--black-600);
  padding-bottom: 20px;
  word-break: break-all;
`;

export {
  PostCommentWrapper,
  PostCommentisMoreRecommentContainer,
  PostCommentContentContainer,
};
