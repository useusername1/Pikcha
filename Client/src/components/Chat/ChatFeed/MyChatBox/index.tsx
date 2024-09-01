import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { chatDatatype } from "~/@types/chat.types";
import {
  showConfirmModalState,
  deleteItemsState,
  isReplyMessageState,
  isDeleteModeState,
} from "~/recoil/chatState";
import ReplyChatBubble from "../../@common/ReplyChatBubble";
import { DividerLine } from "../../styled";
import {
  ChatMessageDiv,
  ChatContentWrapper,
  ChatContentBottomWrapper,
  ChatContentMyDiv,
  ChatContentMenu,
  ChatContentMenuItem,
  ReactionTagSpan,
} from "../styled";
import { DeleteCheckIconWrapper } from "./styled";
import { FaTrashAlt as TrashIcon, FaHeart as HeartIcon } from "react-icons/fa";
import { HiOutlineCheckCircle as DeleteCheckIcon } from "react-icons/hi";
import { MdSubdirectoryArrowRight as ReplyIcon } from "react-icons/md";
import { IoMdSettings as SettingIcon } from "react-icons/io";
interface MyChatBoxProps {
  chatData: chatDatatype;
  timeStampFlagForTime: boolean;
  timeStampFlagForRadius: boolean;
  deleteMessage: (message: Set<number> | number[]) => void;
  lastChatMessageRef:
    | ((node: HTMLDivElement) => void)
    | React.MutableRefObject<HTMLDivElement | null>
    | null;
  searchTargetAnimation: boolean;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}

const MyChatBox = ({
  chatData,
  timeStampFlagForTime,
  timeStampFlagForRadius,
  deleteMessage,
  lastChatMessageRef,
  searchTargetAnimation,
  chatDataMapRef,
}: MyChatBoxProps) => {
  const setShowConfirmModal = useSetRecoilState(showConfirmModalState);
  const setDeleteItems = useSetRecoilState(deleteItemsState);
  const setIsReplyMessage = useSetRecoilState(isReplyMessageState);
  const [isDeleteMode, setIsDeleteMode] = useRecoilState(isDeleteModeState);
  const [isDeleteChecked, setIsDeleteChecked] = useState(false);
  useEffect(() => {
    if (isDeleteMode) {
      setIsDeleteChecked(false);
    }
  }, [isDeleteMode]); //

  const handleDeleteClick = (chatId: number) => {
    if (!isDeleteMode) {
      setDeleteItems(new Set([chatId]));
      setShowConfirmModal(true);
      return;
    }
    setIsDeleteChecked((p) => !p);
    if (!isDeleteChecked) {
      setDeleteItems((p) => new Set(p.add(chatId)));
    } else {
      setDeleteItems((p) => {
        p.delete(chatId);
        return new Set(p);
      });
    }
  };
  const handleSettingClick = () => {
    setIsDeleteMode(true);
  };
  const handleReplyClick = () => {
    setIsReplyMessage(chatData);
  };
  return (
    <ChatMessageDiv
      key={chatData.createdAt}
      type="RIGHT"
      ref={lastChatMessageRef}
      searchTargetAnimation={searchTargetAnimation}
    >
      <ChatContentWrapper direction="RIGHT">
        <ChatContentBottomWrapper
          messageType={chatData.type}
          isDeleteMode={isDeleteMode}
        >
          {timeStampFlagForTime && (
            <span className="time-tag">
              {new Date(chatData.createdAt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
          <ChatContentMyDiv
            type={timeStampFlagForRadius ? "first" : "notFirst"}
            messageType={chatData.type}
          >
            {chatData.type !== "DELETE" && chatData.type !== "REPORT" && (
              <ChatContentMenu type="RIGHT">
                <ChatContentMenuItem
                  className="setting-box"
                  onClick={handleSettingClick}
                >
                  <SettingIcon className="setting-icon" />
                </ChatContentMenuItem>
                <ChatContentMenuItem
                  className="reply-box"
                  onClick={handleReplyClick}
                >
                  <ReplyIcon className="reply-icon" />
                </ChatContentMenuItem>
                <ChatContentMenuItem
                  className="trash-box"
                  onClick={() => handleDeleteClick(chatData.chatId as number)}
                >
                  <TrashIcon className="trash-icon" />
                </ChatContentMenuItem>
              </ChatContentMenu>
            )}
            {chatData.type === "REPLY" && (
              <>
                <ReplyChatBubble
                  chatData={chatData}
                  chatDataMapRef={chatDataMapRef}
                />
                <DividerLine margin="3px" color="var(--reply-borderline)" />
              </>
            )}
            {chatData.type === "DELETE"
              ? "삭제된 메시지입니다"
              : chatData.type === "REPORT"
              ? "3회 이상 신고된 메시지입니다"
              : chatData.content}
            {chatData.type !== "DELETE" && (
              <DeleteCheckIconWrapper
                onClick={() => handleDeleteClick(chatData.chatId as number)}
                isDeleteChecked={isDeleteChecked}
              >
                <DeleteCheckIcon />
              </DeleteCheckIconWrapper>
            )}
          </ChatContentMyDiv>
        </ChatContentBottomWrapper>
        {!!chatData.likes && (
          <ReactionTagSpan isVoted={chatData.isVoted}>
            <HeartIcon />
            {chatData.likes}
          </ReactionTagSpan>
        )}
      </ChatContentWrapper>
    </ChatMessageDiv>
  );
};
export default MyChatBox;
