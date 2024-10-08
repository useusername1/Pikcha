import { useState, useRef, ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { flushSync } from "react-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { chatDatatype } from "~/@types/chat.types";
import useClickDetect from "~/hooks/useClickDetect";
import { UserDataAtomFamily } from "~/recoil/auth";
import {
  messageToReplyAtom,
  showSearchBoxAtom,
  showNewMessageToastAtom,
} from "~/recoil/chat/atoms";
import { NewMessageToast } from "../@common/Toasts";
import { scrollFlagRef } from "../ChatPanel";
import { DividerLine } from "../styled";
import { ChatInputBarStyleType } from "../types";
import * as S from "./styled";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  SuggestionMode,
} from "emoji-picker-react";
import { RiSendPlaneFill as SendIcon } from "react-icons/ri";
import { IoClose as CloseIcon } from "react-icons/io5";
import { TbArrowForward as ReplyIcon } from "react-icons/tb";
import generateRandomEmoji from "./utils";

export const sendbarStyle: ChatInputBarStyleType = {
  padding: 10,
  lineheight: 20,
};

interface SendbarProps {
  sendMessage: (text: string) => void;
  replyMessage: (text: string, targetInfo: chatDatatype) => void;
  scrollIntoBottom: () => void;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}
const ChatInputBar = ({
  sendMessage,
  replyMessage,
  scrollIntoBottom,
  chatDataMapRef,
}: SendbarProps) => {
  const {
    ref: emojiRef,
    isVisible: showEmoji,
    setIsVisible: setShowEmoji,
  } = useClickDetect();
  const [text, setText] = useState("");
  const [rowNum, setRowNum] = useState(1);
  const [emoji, setEmoji] = useState("🙂");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const [isReplyMessage, setIsReplyMessage] =
    useRecoilState(messageToReplyAtom);
  const showSearchBox = useRecoilValue(showSearchBoxAtom);
  const showNewMessageToast = useRecoilValue(showNewMessageToastAtom);
  const memberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText((e.target as HTMLTextAreaElement).value);
  };

  const clickHandler = (
    e: React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();

    flushSync(() => {
      if (text.trim().length === 0) return;
      if (isReplyMessage) {
        replyMessage(text, isReplyMessage);
        setIsReplyMessage(null);
      } else {
        sendMessage(text);
      }
      setText("");
      setRowNum(1);
    });
    scrollIntoBottom();
  };

  const handleInputKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();
      flushSync(() => {
        if (text.trim().length === 0) return;
        if (isReplyMessage) {
          replyMessage(text, isReplyMessage);
          setIsReplyMessage(null);
        } else {
          sendMessage(text);
        }
        setText("");
        setRowNum(1);
      });

      scrollIntoBottom();
    }
  };

  function handleOnInput(e: FormEvent<HTMLTextAreaElement>) {
    const target = e.target as HTMLTextAreaElement;
    scrollFlagRef.current = false;
    if (target.scrollHeight > target.clientHeight && rowNum < 5) {
      setRowNum((p) => p + 1);
      return; //다음줄로 넘어가면 row늘리기
    }
    if (target.scrollHeight === target.clientHeight && rowNum !== 1) {
      target.style.height = "0";
      const newRowNum = Math.ceil(
        (target.scrollHeight - sendbarStyle.padding * 2) /
          sendbarStyle.lineheight
      );
      target.style.cssText = "";
      if (newRowNum < rowNum) setRowNum(newRowNum);
    }
  }

  const handleEmojiClick = (emojiData: EmojiClickData, event: MouseEvent) => {
    flushSync(() => {
      setText((p) => p + emojiData.emoji);
    });

    if (
      (textareaRef.current as HTMLTextAreaElement).scrollHeight >
        (textareaRef.current as HTMLTextAreaElement).clientHeight &&
      rowNum < 5
    ) {
      scrollFlagRef.current = false;
      setRowNum((p) => p + 1);
      return; //다음줄로 넘어가면 row늘리기
    }
    (textareaRef.current as HTMLTextAreaElement).scrollTop = (
      textareaRef.current as HTMLTextAreaElement
    ).scrollHeight;
  };

  const handleMouseOver = () => {
    if (showEmoji) return;
    setEmoji(generateRandomEmoji());
  };

  const handleEmojiPickerClick = (e: React.MouseEvent) => {
    setShowEmoji((p) => !p);
  };

  const handleEmojipickerWrapperClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  const handleCloseClick = () => {
    scrollFlagRef.current = false;
    setIsReplyMessage(null);
  };
  return (
    <>
      <S.SendBarFrameDiv
        styleProps={sendbarStyle}
        showSearchBox={showSearchBox}
        showNewMessageToast={showNewMessageToast}
      >
        <NewMessageToast chatDataMapRef={chatDataMapRef} />
        {isReplyMessage !== null && (
          <>
            <S.ReplyInfoDiv>
              <div className="reply-info">
                <div className="reply-message">{isReplyMessage.content}</div>
                <div className="reply-user">
                  <ReplyIcon />
                  {memberId === isReplyMessage.memberId
                    ? "나"
                    : `${isReplyMessage.username}님`}
                  에게 답장
                </div>
              </div>
              <span onClick={handleCloseClick} className="close-icon">
                <CloseIcon />
              </span>
            </S.ReplyInfoDiv>
            <DividerLine />
          </>
        )}
        <S.ChatInputBarDiv disabled={text.trim().length === 0} rowNum={rowNum}>
          <textarea
            key={1}
            ref={textareaRef}
            rows={rowNum}
            value={text}
            onInput={handleOnInput}
            onChange={handleInputChange}
            onKeyDown={handleInputKeyDown}
          ></textarea>
          <S.ChatInputBarButton
            ref={emojiRef as React.RefObject<HTMLDivElement>}
            buttontype="emoji"
            rowNum={rowNum}
            onMouseEnter={handleMouseOver}
            onClick={handleEmojiPickerClick}
            showEmoji={showEmoji}
          >
            <div className="emoji-icon">{emoji}</div>
            <S.EmojipickerWrapper
              onClick={handleEmojipickerWrapperClick}
              rowNum={rowNum}
            >
              {showEmoji && (
                <EmojiPicker
                  height={420}
                  onEmojiClick={handleEmojiClick}
                  autoFocusSearch={false}
                  suggestedEmojisMode={SuggestionMode.RECENT}
                  lazyLoadEmojis={true}
                  emojiStyle={EmojiStyle.NATIVE}
                />
              )}
            </S.EmojipickerWrapper>
          </S.ChatInputBarButton>
          <S.ChatInputBarButton
            buttontype="send"
            rowNum={rowNum}
            onClick={(e) => clickHandler(e)}
            disabled={text.trim().length === 0}
          >
            <SendIcon className="send-icon" />
          </S.ChatInputBarButton>
        </S.ChatInputBarDiv>
      </S.SendBarFrameDiv>
    </>
  );
};
export default ChatInputBar;
