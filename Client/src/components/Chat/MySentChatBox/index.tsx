import { MessageErrorControlWrapper } from "./styled";
import {
  ChatContentMyDiv,
  ChatMessageDiv,
  ChatMessageWrapper,
} from "../ChatFeed/styled";
import { DividerLine } from "../styled";
import { FlashingDots } from "../ChatIcons";
import ReplyChatBubble from "../@common/ReplyChatBubble";
import { TfiClose as CloseIcon } from "react-icons/tfi";
import { BsArrowCounterclockwise as RetryIcon } from "react-icons/bs";
import { RxDividerVertical as DividerIcon } from "react-icons/rx";
import { chatDatatype } from "~/@types/chat.types";

interface SendChatBoxProps {
  chatBuffer: chatDatatype[];
  setChatBuffer: React.Dispatch<React.SetStateAction<chatDatatype[]>>;
  sendChatBoxRef: React.MutableRefObject<HTMLDivElement | null>;
  sendMessage: (text: string) => void;
  replyMessage: (text: string, targetInfo: chatDatatype) => void;
}
const MySentChatBox = ({
  chatBuffer,
  setChatBuffer,
  sendChatBoxRef,
  sendMessage,
  replyMessage,
}: SendChatBoxProps) => {
  const handleDeleteClick = (key: string) => {
    setChatBuffer((p) => p.filter((el) => el.verifyKey !== key));
  };
  const handleRetryClick = (message: chatDatatype) => {
    setChatBuffer((p) => p.filter((el) => el.verifyKey !== message.verifyKey));
    if (message.targetChatId === null) {
      sendMessage(message.content);
    } else {
      const targetMessage = {
        chatId: message.targetChatId as number,
        content: message.targetContent as string,
        createdAt: "",
        memberId: -1,
        picture: message.targetPicture as string,
        type: message.type,
        username: message.targetUsername as string,
        verifyKey: "",
        targetContent: null,
        targetChatId: null,
        targetMemberId: null,
        targetPicture: null,
        targetUsername: null,
        isVoted: false,
        likes: 0,
        isReported: false,
      };
      replyMessage(message.content, targetMessage);
    }
  };
  return (
    <>
      <ChatMessageWrapper ref={sendChatBoxRef}>
        {chatBuffer.map((el) => (
          <ChatMessageDiv key={el.createdAt} type="RIGHT">
            {el.status === "SENDING" ? (
              <>
                <FlashingDots />
                <span>
                  {new Date(el.createdAt).toLocaleTimeString("ko-KR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </>
            ) : (
              <MessageErrorControlWrapper>
                <span>
                  <CloseIcon
                    className="close-icon"
                    onClick={() => {
                      handleDeleteClick(el.verifyKey);
                    }}
                  />
                </span>
                <DividerIcon />
                <span>
                  <RetryIcon
                    className="retry-icon"
                    onClick={() => handleRetryClick(el)}
                  />
                </span>
              </MessageErrorControlWrapper>
            )}

            <ChatContentMyDiv type="notFirst" messageType={el.type}>
              {el.targetChatId && (
                <>
                  <ReplyChatBubble chatData={el} />
                  <DividerLine margin="3px" color="var(--reply-borderline)" />
                </>
              )}
              {el.content}
            </ChatContentMyDiv>
          </ChatMessageDiv>
        ))}
      </ChatMessageWrapper>
    </>
  );
};
export default MySentChatBox;
