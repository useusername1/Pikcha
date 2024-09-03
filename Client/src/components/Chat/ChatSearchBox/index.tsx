import { useRef, useState } from "react";
import { apiClient } from "~/api/axiosInstance";
import { useSetRecoilState } from "recoil";
import { showSearchBoxAtom } from "~/recoil/chat/atoms";
import ChatSearchTimeSelector from "./ChatSearchTimeSelector";
import SearchedMessage from "./SearchedMessageItem";
import * as S from "./styled";
import { HiOutlineSearch as SearchIcon } from "react-icons/hi";
import { BsArrowCounterclockwise as ResetIcon } from "react-icons/bs";
import { IoClose as CloseIcon } from "react-icons/io5";
import { searchedMessageType } from "./types";

interface ChatSearchBoxProps {
  lastChatIdRef: React.MutableRefObject<number | undefined>;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}
const ChatSearchBox = ({
  lastChatIdRef,
  chatDataMapRef,
}: ChatSearchBoxProps) => {
  const [searchValue, setSearchValue] = useState("");
  const setShowSearchBox = useSetRecoilState(showSearchBoxAtom);

  const [searchedMessages, setSearchedMessages] = useState<
    searchedMessageType[] | null
  >(null);
  const [showYMSelctor, setShowYMSelector] = useState(false);
  const [showGuideAnimation, setShowGuideAnimation] = useState(false);
  const searchBarRef = useRef<HTMLInputElement | null>(null);

  function getSearchResult(
    yearMonth = new Date().toISOString().slice(0, 7).split("-").join("")
  ) {
    setShowYMSelector(true);
    if (searchValue.length < 2) return;
    const payload = { content: searchValue, yearAndMonth: yearMonth };
    apiClient
      .get(`/app/search`, { params: payload })
      .then((res) => {
        setSearchedMessages(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const handleSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const handleResetClick = () => {
    if (showYMSelctor) setShowYMSelector(false);
    setSearchValue("");
    setSearchedMessages(null);
    searchBarRef.current?.focus();
    //검색 결과 초기화;
  };
  const handleCloseClick = () => {
    setShowSearchBox(false);
  };
  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchValue.trim().length < 2) {
      setShowGuideAnimation(true);
      setTimeout(() => {
        setShowGuideAnimation(false);
      }, 500);
    }
    if (e.key === "Enter" && searchValue.length > 1) {
      getSearchResult();
    }
  };
  const handleSearchClick = () => {
    getSearchResult();
  };

  return (
    <S.SearchBoxWrapper>
      <S.ChatSearchBoxHeaderDiv>
        <CloseIcon className="close-icon" onClick={handleCloseClick} />
      </S.ChatSearchBoxHeaderDiv>
      <S.ChatSearchBarWrapper
        search_disabled={searchValue.length <= 1}
        showGuide={!!searchValue && searchValue.trim().length < 2}
        showGuideAnimation={showGuideAnimation}
      >
        <S.ChatSearchBar
          ref={searchBarRef}
          placeholder="채팅 검색하기"
          value={searchValue}
          onChange={handleSearchValue}
          onKeyDown={handleInputKeyDown}
        />
        <SearchIcon className="search-icon" onClick={handleSearchClick} />
        {!!searchValue.length && (
          <ResetIcon className="reset-icon" onClick={handleResetClick} />
        )}
        {searchValue && searchValue.trim().length < 2 && (
          <span>2글자 이상 입력해주세요</span>
        )}
      </S.ChatSearchBarWrapper>

      {showYMSelctor && (
        <ChatSearchTimeSelector getSearchResult={getSearchResult} />
      )}
      <S.SearchedMessageContainer>
        {searchedMessages &&
          searchedMessages.length > 0 &&
          searchedMessages.map((el) => (
            <SearchedMessage
              key={el.createdAt}
              messageData={el}
              lastChatIdRef={lastChatIdRef}
              chatDataMapRef={chatDataMapRef}
            />
          ))}
        {searchedMessages && searchedMessages.length === 0 && (
          <S.EmptyChatResultDiv>검색 결과가 없습니다</S.EmptyChatResultDiv>
        )}
      </S.SearchedMessageContainer>
    </S.SearchBoxWrapper>
  );
};
export default ChatSearchBox;
