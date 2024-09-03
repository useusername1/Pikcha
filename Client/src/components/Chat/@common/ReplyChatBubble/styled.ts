import styled from "styled-components";

export const ReplyMessageBoxDiv = styled.div<{ textColor?: string }>`
  display: flex;
  align-items: flex-start;
  border-radius: 12px;
  padding: 0 2px 5px 0;
  img {
    width: 27px;
    height: 27px;
    object-fit: cover;
    border-radius: 50%;
    margin: 4px 10px 0 0;
  }
  div.target-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      color: ${(props) =>
        props.textColor ? props.textColor : "var(--black-200)"};
      font-size: var(--font-xxs);
      margin: 2px 0 0 0;
      letter-spacing: 0.03rem;
      word-break: break-all;
    }
    span.targetuser-info {
      font-weight: var(--fw-bold);
      color: ${(props) => (props.textColor ? "props.textColor" : "white")};
    }
  }
  :hover {
    cursor: pointer;
  }
`;
