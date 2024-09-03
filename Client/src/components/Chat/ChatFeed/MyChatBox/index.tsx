import { useState, useEffect } from "react";
import { useSetRecoilState, useRecoilState } from "recoil";
import { chatDatatype } from "~/@types/chat.types";
import {
  showConfirmModalAtom,
  itemsToDeleteAtom,
  messageToReplyAtom,
  isDeleteModeAtom,
} from "~/recoil/chat/atoms";
import ReplyChatBubble from "../../@common/ReplyChatBubble";
import * as C from "../../styled";
import * as CF from "../styled";
import * as S from "./styled";
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
  const setShowConfirmModal = useSetRecoilState(showConfirmModalAtom);
  const setItemsToDelete = useSetRecoilState(itemsToDeleteAtom);
  const setMessageToReply = useSetRecoilState(messageToReplyAtom);
  const [isDeleteMode, setIsDeleteMode] = useRecoilState(isDeleteModeAtom);
  const [isDeleteChecked, setIsDeleteChecked] = useState(false);
  useEffect(() => {
    if (isDeleteMode) {
      setIsDeleteChecked(false);
    }
  }, [isDeleteMode]); //

  const handleDeleteClick = (chatId: number) => {
    if (!isDeleteMode) {
      setItemsToDelete(new Set([chatId]));
      setShowConfirmModal(true);
      return;
    }
    setIsDeleteChecked((p) => !p);
    if (!isDeleteChecked) {
      setItemsToDelete((p) => new Set(p.add(chatId)));
    } else {
      setItemsToDelete((p) => {
        p.delete(chatId);
        return new Set(p);
      });
    }
  };
  const handleSettingClick = () => {
    setIsDeleteMode(true);
  };
  const handleReplyClick = () => {
    setMessageToReply(chatData);
  };
  return (
    <C.ChatMessageDiv
      key={chatData.createdAt}
      type="RIGHT"
      ref={lastChatMessageRef}
      searchTargetAnimation={searchTargetAnimation}
    >
      <CF.ChatContentWrapper direction="RIGHT">
        <CF.ChatContentBottomWrapper
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
          <C.ChatContentMyDiv
            type={timeStampFlagForRadius ? "first" : "notFirst"}
            messageType={chatData.type}
          >
            {chatData.type !== "DELETE" && chatData.type !== "REPORT" && (
              <CF.ChatContentMenu type="RIGHT">
                <CF.ChatContentMenuItem
                  className="setting-box"
                  onClick={handleSettingClick}
                >
                  <SettingIcon className="setting-icon" />
                </CF.ChatContentMenuItem>
                <CF.ChatContentMenuItem
                  className="reply-box"
                  onClick={handleReplyClick}
                >
                  <ReplyIcon className="reply-icon" />
                </CF.ChatContentMenuItem>
                <CF.ChatContentMenuItem
                  className="trash-box"
                  onClick={() => handleDeleteClick(chatData.chatId as number)}
                >
                  <TrashIcon className="trash-icon" />
                </CF.ChatContentMenuItem>
              </CF.ChatContentMenu>
            )}
            {chatData.type === "REPLY" && (
              <>
                <ReplyChatBubble
                  chatData={chatData}
                  chatDataMapRef={chatDataMapRef}
                />
                <C.DividerLine margin="3px" color="var(--reply-borderline)" />
              </>
            )}
            {chatData.type === "DELETE"
              ? "삭제된 메시지입니다"
              : chatData.type === "REPORT"
              ? "3회 이상 신고된 메시지입니다"
              : chatData.content}
            {chatData.type !== "DELETE" && (
              <S.DeleteCheckIconWrapper
                onClick={() => handleDeleteClick(chatData.chatId as number)}
                isDeleteChecked={isDeleteChecked}
              >
                <DeleteCheckIcon />
              </S.DeleteCheckIconWrapper>
            )}
          </C.ChatContentMyDiv>
        </CF.ChatContentBottomWrapper>
        {!!chatData.likes && (
          <CF.ReactionTagSpan isVoted={chatData.isVoted}>
            <HeartIcon />
            {chatData.likes}
          </CF.ReactionTagSpan>
        )}
      </CF.ChatContentWrapper>
    </C.ChatMessageDiv>
  );
};
export default MyChatBox;
