import styled from "styled-components";

const SearchedMessageContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  flex-direction: column;
  font-size: var(--font-xs);

  margin-left: 5px;
  letter-spacing: 0.02rem;
  height: 100%;
  width: 60%;
  div {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  div.username {
  }
  div.content {
    color: var(--black-600);
    margin-right: 5px;
  }
`;

const SearchedMessageWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 57px;
  margin: 8px 0;
  padding: 3px 10px;
  border-radius: var(--br-m);
  :hover {
    background-color: var(--black-250);
    cursor: pointer;
  }
  img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 10px 10px 10px 0;
  }
  span.createdAt {
    font-size: var(--font-xs);
    color: var(--black-600);
  }
  div.createdAt {
    margin-left: auto;
    margin-bottom: 17px;
    display: flex;
    align-items: end;
    height: 100%;
  }
`;

export { SearchedMessageContent, SearchedMessageWrapper };
