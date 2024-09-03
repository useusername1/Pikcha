import styled, { css } from "styled-components";
import { ChatMessageType } from "~/@types/chat.types";

const DividerLine = styled.hr<{
  width?: string;
  margin?: string;
  color?: string;
}>`
  width: ${(props) => (props.width ? props.width : "98%")};
  margin: ${(props) =>
    props.margin ? `${props.margin} 0 5px 0` : "0 0 var(--sb-padding) 0"};
  border: ${(props) =>
    props.color
      ? `0.5px solid ${props.color}`
      : "0.5px solid var(--black-300)"};
  text-align: center;
  transform: translateX(1%);
`;

const ChatContentMyDiv = styled.div<{
  type: "first" | "notFirst";
  messageType: ChatMessageType;
}>`
  word-break: break-all;
  font-size: var(--font-xs);
  letter-spacing: 0.03rem;
  background-color: var(--chat-messagebox);
  margin-top: ${(props) => (props.type === "first" ? "7px" : "0")};
  border-radius: ${(props) =>
    props.type === "first" ? "8px 0 8px 8px" : "8px"};
  padding: 7px 12px;
  color: var(--black-200);
  display: inline;
  max-width: 210px;
  line-height: 1.05rem;
  position: relative;
  transform-style: preserve-3d;
  ${(props) =>
    (props.messageType === "DELETE" || props.messageType === "REPORT") &&
    css`
      color: var(--delete-message);
    `}
`;

const ChatMessageDiv = styled.div<{
  type: "LEFT" | "RIGHT";
  isFirst?: boolean;
  searchTargetAnimation?: boolean;
}>`
  transform: translate(0, 0);
  display: flex;
  justify-content: ${(props) =>
    props.type === "RIGHT" ? "flex-end" : "flex-start"};
  align-items: ${(props) =>
    props.type === "RIGHT" ? "flex-end" : "flex-start"};
  margin: ${(props) => (props.isFirst ? "20px 10px 2.5px 10px" : "2.5px 10px")};
  animation: ${(props) =>
    props.searchTargetAnimation ? " chatShake 0.2s 2 linear;" : "none"};
  @keyframes chatShake {
    0% {
      transform: translate(-3px, 0);
    }
    50% {
      transform: translate(4px, 0);
    }
    100% {
      transform: translate(0, 0);
    }
  }
  span {
    font-size: var(--font-xxs);
    margin: 5px 5px 1px 5px;
    color: var(--black-700);
  }
`;

const ChatMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
`;
export { DividerLine, ChatContentMyDiv, ChatMessageDiv, ChatMessageWrapper };
