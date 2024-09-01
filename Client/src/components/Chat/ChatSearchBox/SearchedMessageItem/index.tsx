import { flushSync } from "react-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { chatDatatype } from "~/@types/chat.types";
import { emptyMessage } from "~/data/chatData";
import { chatDataState, ScrollTargetChatIdState } from "~/recoil/chatState";
import { scrollFlagRef } from "../../ChatPanel";
import { searchedMessageType } from "../types";
import { chatIdSearch } from "../utils";
import { SearchedMessageWrapper, SearchedMessageContent } from "./styled";
import { apiClient } from "~/api/axiosInstance";

interface SearcheMessageProps {
  messageData: searchedMessageType;
  lastChatIdRef: React.MutableRefObject<number | undefined>;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}

const SearchedMessageItem = ({
  messageData,
  lastChatIdRef,
  chatDataMapRef,
}: SearcheMessageProps) => {
  const [chatData, setChatData] = useRecoilState(chatDataState);
  const setScrollTargetChatId = useSetRecoilState(ScrollTargetChatIdState);
  const handleSearchedMessageClick = (chatId: number) => {
    scrollFlagRef.current = false;
    //1.chatData에 존재하는 경우
    if (chatDataMapRef.current?.has(chatId)) {
      chatDataMapRef.current?.get(chatId)?.node.scrollIntoView();
      setScrollTargetChatId(chatId);
      return;
    }
    //2.chatData에 존재하지 않는 경우
    const searchResult = chatIdSearch(chatData, chatId);

    const [beforeChatIdx, nextChatIdx] =
      searchResult.targetIdIndex as Array<number>;
    apiClient
      .get(`/app/load?gte=${chatId}&lte=${chatData[nextChatIdx].chatId}`)
      .then((res) => {
        const loadMoreMessage: chatDatatype = {
          ...emptyMessage,
          type: "LOADMORE",
        };
        /*
          데이터 추가 데이터
          추가 안하는 경우: 이미 load more버튼이 양옆으로 존재할때
          */
        let newChatData = [...res.data.data.slice(1)];
        if (chatData[nextChatIdx].type !== "LOADMORE" && res.data.hasNext) {
          newChatData = [
            ...newChatData,
            {
              ...loadMoreMessage,
              chatId: newChatData[newChatData.length - 1].chatId,
            },
          ];
        }
        if (
          beforeChatIdx !== -1 &&
          chatData[beforeChatIdx].type !== "LOADMORE" &&
          res.data.data[0].chatId !== chatData[beforeChatIdx].chatId
        ) {
          newChatData = [
            { ...loadMoreMessage, chatId: newChatData[0].chatId },
            ...newChatData,
          ];
        }
        const updateChatData = [
          ...chatData.slice(0, beforeChatIdx + 1),
          ...newChatData,
          ...chatData.slice(beforeChatIdx + 1),
        ];
        flushSync(() => {
          setChatData(updateChatData);
        });
        lastChatIdRef.current = updateChatData[0].chatId;
        chatDataMapRef.current?.get(chatId)?.node.scrollIntoView();
        setScrollTargetChatId(chatId);
        /*chatId제거 타이밍? */
      })
      .catch(console.log);
  };
  return (
    <SearchedMessageWrapper
      onClick={() => handleSearchedMessageClick(messageData.chatId)}
    >
      <img src={messageData.picture} alt="profile" />
      <SearchedMessageContent>
        <div className="username">{messageData.username}</div>
        <div className="content">{messageData.content}</div>
      </SearchedMessageContent>
      <div className="createdAt">
        <span className="createdAt">
          {new Intl.DateTimeFormat("ko-KR")
            .format(new Date(messageData.createdAt as string))
            .slice(0, -1)}
        </span>
      </div>
    </SearchedMessageWrapper>
  );
};
export default SearchedMessageItem;
