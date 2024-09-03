import styled from "styled-components";

export const PostCommentBox = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

export const PostCommentTitle = styled.div`
  display: flex;
  align-items: center;
`;

export const PostCommentImg = styled.img`
  width: 30px;
  height: 30px;
  border-radius: var(--br-l);
  margin-right: 10px;
`;

export const PostCommentUserName = styled.span<{ writer: string }>`
  font-size: var(--font-sm);
  font-weight: var(--fw-bold);
  margin-right: 5px;
  color: ${(props) => (props.writer === "writer" ? "var(--purple-400)" : "")};
`;

export const PostCommentDate = styled.span`
  font-size: var(--font-xxs);
`;

export const PostManageButtonContainer = styled.div`
  display: flex;
`;

export const PostManageButton = styled.button`
  min-width: 30px;
  font-size: var(--font-xs);
  margin-left: 10px;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: var(--black-700);
  }
`;

export const PostCommentInputContainer = styled.form<{
  padding: string;
  width: string;
  height: string;
}>`
  display: flex;
  align-items: center;
  padding: ${(props) => props.padding};
  > textarea {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    display: flex;
    resize: none;
    padding: 10px;
    border-radius: var(--br-m);
    border-color: var(--purple-300);
    font-size: var(--font-base);
    &:focus {
      outline-color: var(--purple-400);
      box-shadow: 0 0 6px var(--purple-300);
    }
  }

  > button {
    margin-left: 10px;
    width: 30px;
    height: 30px;
    border: none;
    background-color: transparent;
    cursor: pointer;
    &:hover {
      color: var(--black-700);
    }
  }
`;
