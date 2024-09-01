import styled from "styled-components";

const MessageErrorControlWrapper = styled.div`
  padding: 1px 6px 1px 8px;
  background-color: var(--pink-heart);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--br-s);
  color: #ffb7b7;
  margin: 0 7px 4px 0;
  span {
    margin: 3px;
    svg {
      color: white;
      :hover {
        cursor: pointer;
      }
    }
    svg.retry-icon {
      width: 10px;
      height: 10px;
      margin-top: 2px;
    }
    svg.close-icon {
      width: 8px;
      height: 8px;
      margin-top: 2px;
    }
  }
`;

export { MessageErrorControlWrapper };
