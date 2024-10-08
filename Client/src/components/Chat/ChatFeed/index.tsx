import MyChatBox from "./MyChatBox";
import OtherChatBox from "./OtherChatBox";
import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  incomingMessageAtom,
  scrollTargetChatIdAtom,
  showNewMessageToastAtom,
  chatDataAtom,
} from "~/recoil/chat/atoms";
import LoadMoreButton from "./LoadMoreButton";
import { scrollFlagRef } from "../ChatPanel";
import * as S from "./styled";
import { UserDataAtomFamily } from "~/recoil/auth";
import * as C from "../styled";

interface ChatFeedProps {
  deleteMessage: (message: Set<number> | number[]) => void;
  topChatMessage: (node: HTMLDivElement) => void;
  chatBoxRef: React.MutableRefObject<HTMLDivElement | null>;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}
const ChatFeed = ({
  deleteMessage,
  topChatMessage,
  chatBoxRef,
  chatDataMapRef,
}: ChatFeedProps) => {
  const [showChatDate, setShowChatDate] = useState(false);
  const chatData = useRecoilValue(chatDataAtom);
  const scrollTargetChatId = useRecoilValue(scrollTargetChatIdAtom);
  const incomingMessage = useRecoilValue(incomingMessageAtom);
  const myMemberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);
  const setShowNewMessageBox = useSetRecoilState(showNewMessageToastAtom);
  const scrollPositionRef = useRef<number | undefined>(undefined);
  const timeoutIdRef = useRef<NodeJS.Timeout | null>(null);
  const newMessageObserverRef = useRef<IntersectionObserver | null>(null);

  const options = {
    root: chatBoxRef.current,
    rootMargin: "0px",
    threshold: 0,
  };

  const newMessage = useCallback(
    (node: HTMLDivElement) => {
      if (!node) return;
      if (newMessageObserverRef.current)
        newMessageObserverRef.current.disconnect();
      newMessageObserverRef.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setShowNewMessageBox(false);
        }
      }, options);
      newMessageObserverRef.current.observe(node);
    },
    [options, chatBoxRef.current]
  );

  useEffect(() => {
    if (!incomingMessage) return;
    if (
      (chatBoxRef.current as HTMLDivElement).scrollHeight -
        (chatBoxRef.current as HTMLDivElement).scrollTop -
        (chatBoxRef.current as HTMLDivElement).clientHeight <
      300
    ) {
      scrollFlagRef.current = false; //created by script
      chatDataMapRef.current
        ?.get(incomingMessage.message.chatId)
        ?.node.scrollIntoView();
    } else {
      setShowNewMessageBox(true);
      newMessage(
        chatDataMapRef.current?.get(incomingMessage.message.chatId)
          ?.node as HTMLDivElement
      );
    }
  }, [incomingMessage]); //새 메시지 도착 시 이동

  function getMap() {
    if (!chatDataMapRef.current) {
      chatDataMapRef.current = new Map();
    }
    return chatDataMapRef.current;
  }

  const handleScroll = (event: Event) => {
    if (scrollPositionRef.current === undefined) {
      scrollPositionRef.current = chatBoxRef.current?.scrollTop;
      return;
    }

    if (!scrollFlagRef.current) {
      scrollFlagRef.current = true;
      return;
    }
    if (scrollPositionRef.current !== chatBoxRef.current?.scrollTop) {
      if (timeoutIdRef.current) {
        clearTimeout(timeoutIdRef.current);
      }
      setShowChatDate(true);
      scrollPositionRef.current = chatBoxRef.current?.scrollTop;
      timeoutIdRef.current = setTimeout(() => {
        setShowChatDate(false);
      }, 300);
    }
  };

  useEffect(() => {
    (chatBoxRef.current as HTMLDivElement).addEventListener(
      "scroll",
      handleScroll
    );
    return () => {
      (chatBoxRef.current as HTMLDivElement)?.removeEventListener(
        "scroll",
        handleScroll
      );
    };
  }, []);

  return (
    <C.ChatMessageWrapper>
      {chatData.map((el, i, arr) => {
        if (el.type === "LEAVE") {
          return (
            <S.UserInfoAlarmWrapper key={Math.random()}>
              <span>{el.username}님이 나갔습니다</span>
            </S.UserInfoAlarmWrapper>
          );
        } else if (el.type === "JOIN") {
          return (
            <S.UserInfoAlarmWrapper key={Math.random()}>
              <span>
                {el.username}
                {myMemberId === el.memberId && `(나)`}님이 들어왔습니다
              </span>
            </S.UserInfoAlarmWrapper>
          );
        } else if (el.type === "LOADMORE") {
          return (
            <LoadMoreButton key={Math.random()} chatIdRange={[i - 1, i + 1]} />
          );
        }
        const timeStampFlagForDate =
          el.createdAt.slice(0, 10) !== arr[i - 1]?.createdAt.slice(0, 10) ||
          el.chatId === 1;
        const memberIdFlag =
          el.memberId !== arr[i - 1]?.memberId ||
          timeStampFlagForDate ||
          arr[i - 1].type !== ("CHAT" || "REPLY"); //앞의 메시지와 같지 않다면 무조건 true
        const timeStampFlagForRadius =
          memberIdFlag ||
          arr[i - 1]?.createdAt.slice(0, 16) !== el.createdAt.slice(0, 16);
        let timeStampFlagForTime =
          el.createdAt.slice(0, 16) !== arr[i + 1]?.createdAt.slice(0, 16) ||
          (el.createdAt.slice(0, 16) === arr[i + 1]?.createdAt.slice(0, 16) &&
            el.memberId !== arr[i + 1]?.memberId);
        //다음 메시지와 시간이 다른경우 && 시간이 같지만 멤버아이디가 다른 경우
        return (
          <Fragment key={el.createdAt}>
            {timeStampFlagForDate && (
              <S.ChatCreatedDateDiv showChatDate={showChatDate}>
                <span>
                  {new Intl.DateTimeFormat("ko", { dateStyle: "long" }).format(
                    new Date(el.createdAt)
                  )}
                </span>
              </S.ChatCreatedDateDiv>
            )}
            {el.memberId === myMemberId ? (
              <MyChatBox
                lastChatMessageRef={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(el.chatId, { node, idx: i });
                  } else {
                    map.delete(el.chatId);
                  }
                  if (i === 0) {
                    topChatMessage(node);
                    return;
                  }
                  return null;
                }}
                key={el.createdAt}
                chatData={el}
                timeStampFlagForTime={timeStampFlagForTime}
                timeStampFlagForRadius={timeStampFlagForRadius}
                deleteMessage={deleteMessage}
                searchTargetAnimation={scrollTargetChatId === el.chatId}
                chatDataMapRef={chatDataMapRef}
              />
            ) : (
              <OtherChatBox
                lastChatMessageRef={(node) => {
                  const map = getMap();
                  if (node) {
                    map.set(el.chatId, { node, idx: i });
                  } else {
                    map.delete(el.chatId);
                  }
                  if (i === 0) {
                    topChatMessage(node);
                    return;
                  }
                  return null;
                }}
                key={el.createdAt}
                chatData={el}
                timeStampFlagForTime={timeStampFlagForTime}
                timeStampFlagForRadius={timeStampFlagForRadius}
                memberIdFlag={memberIdFlag}
                searchTargetAnimation={scrollTargetChatId === el.chatId}
                chatDataMapRef={chatDataMapRef}
              />
            )}
          </Fragment>
        );
      })}
    </C.ChatMessageWrapper>
  );
};
export default ChatFeed;
