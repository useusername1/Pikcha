import styled from "styled-components";
import { ChatPanelStatusType } from "~/@types/chat.types";

const ChatExpandableButton = styled.button<{
  connected: boolean;
  chatStatus: ChatPanelStatusType;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 55px;
  border-radius: var(--br-l);
  box-shadow: 0px 2px 15px 0px rgba(161, 161, 161, 0.322);
  background-color: white;
  z-index: var(--zi-four);
  position: fixed;
  bottom: 40px;
  right: 40px;
  border: ${(props) =>
    props.chatStatus === "EXITED" ? "none" : "1px solid var(--purple-300)"};
  cursor: pointer;
  svg {
    color: ${(props) =>
      props.chatStatus === "EXITED" ? "var(--black-900)" : "var(--purple-300)"};
    width: 20px;
    height: 20px;
  }
  span {
    font-size: var(--font-xxs);
    position: absolute;
    transform: translate(20px, -22px);
    background-color: var(--purple-300);
    color: var(--black-200);
    padding: 3px 6px;
    border-radius: 50%;
  }
`;

export { ChatExpandableButton };
