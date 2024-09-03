import styled, { css } from "styled-components";
import { DeleteCheckIconWrapper } from "./MyChatBox/styled";
import { ChatMessageType } from "~/@types/chat.types";

export const UserInfoAlarmWrapper = styled.div`
  display: flex;
  justify-content: center;
  span {
    padding: 5px 10px;
    margin: 5px;
    background-color: #c6c6c6;
    color: white;
    font-size: var(--font-xxs);
    border-radius: 5px;
    letter-spacing: 0.01rem;
    font-weight: var(--fw-medium);
  }
`;

export const ChatContentBottomWrapper = styled.div<{
  messageType: ChatMessageType;
  isDeleteMode: boolean;
  isOthers?: boolean;
}>`
  display: flex;
  align-items: flex-end;
  height: 100%;
  transition: all ease 0.3s;
  ${(props) =>
    props.isDeleteMode &&
    props.messageType !== "DELETE" &&
    props.messageType !== "REPORT" &&
    !props.isOthers &&
    css`
      transform: translateX(-25px);
      ${DeleteCheckIconWrapper} {
        visibility: visible;
        pointer-events: auto;
        transform: translate3d(calc(-50% + 35px), calc(-50% + 2px), -2px);
      }
    `}
  :hover {
    time-tag {
      display: block;
    }
  }
  ${(props) =>
    !props.isDeleteMode &&
    props.messageType !== "DELETE" &&
    props.messageType !== "REPORT" &&
    css`
      :hover {
        span {
          opacity: 1;
          visibility: visible;
        }
        span.time-tag {
          display: none;
        }
      }
    `}
`;
export const ChatContentMenu = styled.div<{
  type: "RIGHT" | "LEFT";
  reportDisabled?: boolean;
}>`
  position: absolute;
  display: flex;
  padding: 5px;
  height: 100%;
  align-items: center;

  ${(props) =>
    props.type === "RIGHT" &&
    css`
      top: 50%;
      right: 100%;
      transform: translate(calc(-50% + 65px), calc(-50%));
    `}
  ${(props) =>
    props.type === "LEFT" &&
    css`
      top: 50%;
      left: 100%;
      transform: translate(calc(-50% + 65px), calc(-50%));
    `}
      span.report-box {
    svg {
      width: 15px;
      height: 15px;
    }
  }
  ${(props) =>
    !props.reportDisabled &&
    css`
      span.report-box {
        svg {
          color: #9a8aff;
          width: 15px;
          height: 15px;
        }
        :hover {
          background-color: #dad3ff;
        }
      }
    `}

  span.heart-box {
    svg {
      color: var(--pink-heart);
      width: 12px;
      height: 12px;
    }
    :hover {
      background-color: #ffdddd;
    }
  }
  span.reply-box {
    svg {
      width: 13px;
      height: 13px;
    }
    :hover {
      background-color: var(--black-300);
    }
  }
  span.trash-box {
    svg {
      color: var(--pink-heart);
      width: 12px;
      height: 12px;
    }
    :hover {
      background-color: #ffdddd;
    }
  }
  span.setting-box {
    svg {
      color: #9a8aff;
      width: 15px;
      height: 15px;
    }
    :hover {
      background-color: #dad3ff;
    }
  }
`;

export const ChatContentMenuItem = styled.span<{ reportDisabled?: boolean }>`
  transition: all ease 0.1s;
  visibility: hidden;
  opacity: 0;
  width: 30px;
  height: 30px;
  padding: 8px;
  border-radius: 50%;
  background-color: var(--black-275);
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 5px !important;
  :hover {
    cursor: pointer;
  }
  ::after {
    position: absolute;
    transform: translate(37px, -18px);
    display: none;
    content: "이미 신고한 메시지입니다";
    font-size: var(--font-xxs);
    color: var(--black-600);
    padding: 5px;
    white-space: nowrap;
    background-color: transparent;
  }
  ${(props) =>
    props.reportDisabled &&
    css`
      svg {
        color: var(--black-600);
      }
      :hover {
        cursor: default;
      }
      :hover::after {
        display: block;
      }
    `}
`;

export const ChatContentWrapper = styled.div<{
  direction: "RIGHT" | "LEFT";
}>`
  margin-left: 7px;
  display: flex;
  flex-direction: column;
  align-items: ${(props) =>
    props.direction === "RIGHT" ? "flex-end" : "flex-start"};
`;

export const ReactionTagSpan = styled.span<{
  isVoted?: boolean;
  isOthers?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 17px;
  padding: 0 6px 0 3px;
  margin: 3px 0 1px 0px !important;
  border-radius: 7px;
  background-color: ${(props) => (props.isVoted ? "#ffdddd" : "white")};
  color: var(--black-900) !important;
  font-weight: var(--fw-medium);
  border: ${(props) =>
    props.isVoted ? "0.5px solid #ffd5d5" : "0.5px solid var(--black-300)"};
  svg {
    width: 17px;
    color: var(--pink-heart);
  }
  :hover {
    cursor: ${(props) => (props.isOthers ? "pointer" : "default")};
  }
`;

export const ChatContentDiv = styled.div<{
  type: "first" | "notFirst";
  messageType: ChatMessageType;
}>`
  word-break: break-all;
  font-size: var(--font-xs);
  letter-spacing: 0.03rem;
  line-height: 1.05rem;
  background-color: white;
  margin-top: ${(props) => (props.type === "first" ? "3px" : "0")};
  border-radius: ${(props) =>
    props.type === "first" ? "0px 8px 8px 8px" : "8px"};
  padding: 7px 12px;
  color: var(--black-900);
  max-width: 210px;
  position: relative;
  ${(props) =>
    (props.messageType === "DELETE" || props.messageType === "REPORT") &&
    css`
      color: var(--black-600);
    `}
`;

export const ChatCreatedDateDiv = styled.div<{ showChatDate: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-xxs);
  color: white;
  padding: 20px 0 5px 0;
  white-space: nowrap;
  position: sticky;
  top: -100px;
  ${(props) =>
    props.showChatDate &&
    css`
      top: 0px;
    `}
  z-index: var(--zi-five);
  span {
    margin: 0 10px 0 14px;
    background-color: var(--black-500);
    padding: 4px 7px;
    border-radius: var(--br-m);
  }
`;
