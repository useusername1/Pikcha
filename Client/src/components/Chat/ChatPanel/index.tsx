import { useRef, useEffect, useCallback } from "react";
import { flushSync } from "react-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { ChatPanelStatusType } from "~/@types/chat.types";
import useWebsocket from "~/hooks/useWebsocket";
import { UserDataAtomFamily } from "~/recoil/auth";
import {
  isDeleteModeAtom,
  showConfirmModalAtom,
  showReportModalAtom,
  chatDataAtom,
  showSearchBoxAtom,
} from "~/recoil/chat/atoms";
import {
  ConfirmDeleteModal,
  ReportModal,
  DeleteAllConfirmModal,
} from "../@common/Modals";
import { ConfirmationToast } from "../@common/Toasts";
import ChatFeed from "../ChatFeed";
import ChatHeader from "../ChatHeader";
import MySentChatBox from "../MySentChatBox";
import ChatInputBar from "../ChatInputBar";
import ChatSearchBox from "../ChatSearchBox";
import { ChatBoxDiv, ChatBoxWrapper } from "./styled";
import { apiClient } from "~/api/axiosInstance";

const URL = `${process.env.REACT_APP_HOST}/stomp-websocket-sockjs`;
const TOPIC = "/topic/messages"; //topic주소

interface ChatPanelProps {
  chatStatus: ChatPanelStatusType;
}

export const scrollFlagRef: { current: boolean | null } = { current: null }; //constant

const ChatPanel = ({ chatStatus }: ChatPanelProps) => {
  const chatDataMapRef = useRef<Map<
    number,
    { node: HTMLElement; idx: number }
  > | null>(null);
  //{node:,idx:}
  const {
    clientRef,
    sendMessage,
    chatBuffer,
    setChatBuffer,
    deleteMessage,
    replyMessage,
    lastChatIdRef,
  } = useWebsocket(URL, TOPIC, chatDataMapRef);

  const isDeleteMode = useRecoilValue(isDeleteModeAtom); //삭제모드
  const showConfirmModal = useRecoilValue(showConfirmModalAtom); //삭제승인 모달
  const showReportModal = useRecoilValue(showReportModalAtom); //신고 모달
  const setChatData = useSetRecoilState(chatDataAtom);
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const sendChatBoxRef = useRef<HTMLDivElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const chatBoxRef = useRef<HTMLDivElement | null>(null);

  const showSearchBox = useRecoilValue(showSearchBoxAtom);
  //enter가 join보다 먼저 응답=> enter응답 받은 후 activate
  useEffect(() => {
    if (!isLogin) return;
    apiClient
      .get(`/app/enter`)
      .then((res) => {
        scrollFlagRef.current = false;
        clientRef.current?.activate();
        flushSync(() => {
          setChatData(res.data.data);
        });
        lastChatIdRef.current = res.data.data[0].chatId;
        (chatBoxRef.current as HTMLDivElement).scrollTop = (
          chatBoxRef.current as HTMLDivElement
        ).scrollHeight;
      })
      .catch((err) => {
        console.log(err);
      });
  }, [isLogin]);

  const scrollIntoBottom = () => {
    scrollFlagRef.current = false;
    sendChatBoxRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const options = {
    root: chatBoxRef.current,
    rootMargin: "100px 0px",
    threshold: 0,
  };

  const topChatMessage = useCallback(
    (node: HTMLDivElement) => {
      if (!node) return;
      if (observerRef.current) observerRef.current.disconnect();
      observerRef.current = new IntersectionObserver((entries) => {
        if (lastChatIdRef.current === 1) {
          return;
        }
        if (entries[0].isIntersecting) {
          apiClient
            .get(`/app/load/${lastChatIdRef.current}`)
            .then((res) => {
              const scrollTemp =
                (chatBoxRef.current as HTMLDivElement).scrollHeight -
                (chatBoxRef.current as HTMLDivElement).scrollTop;
              flushSync(() => {
                setChatData((p) => [...res.data.data, ...p]);
              });
              scrollFlagRef.current = false;
              (chatBoxRef.current as HTMLDivElement).scrollTop =
                (chatBoxRef.current as HTMLDivElement).scrollHeight -
                scrollTemp;

              lastChatIdRef.current = res.data.data[0].chatId;
            })
            .catch((err) => console.error(err));
        }
      }, options);

      observerRef.current.observe(node);
    },
    [options, chatBoxRef.current]
  );
  return (
    <ChatBoxDiv chatStatus={chatStatus}>
      {showConfirmModal && <ConfirmDeleteModal deleteMessage={deleteMessage} />}
      {showReportModal && <ReportModal setChatData={setChatData} />}
      <ConfirmationToast />
      {showSearchBox && (
        <ChatSearchBox
          lastChatIdRef={lastChatIdRef}
          chatDataMapRef={chatDataMapRef}
        />
      )}
      <ChatHeader />
      <ChatBoxWrapper ref={chatBoxRef}>
        <ChatFeed
          chatBoxRef={chatBoxRef}
          topChatMessage={topChatMessage}
          deleteMessage={deleteMessage}
          chatDataMapRef={chatDataMapRef}
        />
        {!!chatBuffer.length && (
          <MySentChatBox
            chatBuffer={chatBuffer}
            setChatBuffer={setChatBuffer}
            sendChatBoxRef={sendChatBoxRef}
            sendMessage={sendMessage}
            replyMessage={replyMessage}
          />
        )}
      </ChatBoxWrapper>
      {isDeleteMode ? (
        <DeleteAllConfirmModal />
      ) : (
        <ChatInputBar
          sendMessage={sendMessage}
          replyMessage={replyMessage}
          scrollIntoBottom={scrollIntoBottom}
          chatDataMapRef={chatDataMapRef}
        />
      )}
    </ChatBoxDiv>
  );
};
export default ChatPanel;
