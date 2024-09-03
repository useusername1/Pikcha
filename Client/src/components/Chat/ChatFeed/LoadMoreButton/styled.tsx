import styled from "styled-components";

const LoadMoreButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 30px 0 15px 0;
`;

const LoadMoreButton = styled.button`
  padding-left: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--black-500);
  background-color: var(--chatbox-background);
  width: 100px;
  height: 30px;
  border-radius: var(--br-l);
  font-size: var(--font-xs);
  color: var(--black-700);
  transition: all ease 0.2s;
  svg.plus-icon {
    margin-left: 5px;
  }
  :hover {
    cursor: pointer;
    border: 1px solid var(--chat-messagebox);
    color: var(--chat-messagebox);
  }
`;

export { LoadMoreButtonWrapper, LoadMoreButton };
