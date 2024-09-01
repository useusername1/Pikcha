import styled from "styled-components";
import { ChatPanelStatusType } from "../../../@types/chat.types";

const ChatBoxDiv = styled.div<{
  chatStatus: ChatPanelStatusType;
}>`
  width: 400px;
  height: 580px;
  position: fixed;
  bottom: 40px;
  right: 55px;
  border-radius: var(--br-l);
  z-index: ${(props) =>
    props.chatStatus === "MINIMIZED" ? "var(--zi-m-four)" : "var(--zi-five)"};
  background-color: var(--chatbox-background);
  box-shadow: 0 2px 10px rgb(0 0 0 / 15%);
  display: ${(props) => (props.chatStatus === "EXITED" ? "none" : "flex")};
  opacity: ${(props) => (props.chatStatus === "MINIMIZED" ? "0" : "1")};
  flex-direction: column;
  transform-style: preserve-3d;
`;

const ChatBoxWrapper = styled.div`
  overflow-x: hidden;
  overflow-y: auto;
  scrollbar-gutter: stable;
  padding-bottom: 5px;
  height: 100%;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::webkit-scrollbar-gutter {
    scrollbar-gutter: auto;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--chatbox-background);
    border-radius: 5px;
  }
  :hover::-webkit-scrollbar-thumb {
    background-color: var(--black-400);
  }
`;

export { ChatBoxDiv, ChatBoxWrapper };
