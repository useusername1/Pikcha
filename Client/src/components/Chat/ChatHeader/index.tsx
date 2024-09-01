import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  onlineNumberOfUserState,
  ChatStatus,
  ShowSearchBox,
  NewMessageArrivedState,
} from "~/recoil/chatState";
import {
  ChatHeaderWrapper,
  LogoIconWrapper,
  ChatInfoWrapper,
  ChatControllWrapper,
  Tooltip,
} from "./styled";
import { HiOutlineSearch as SearchIcon } from "react-icons/hi";
import { MdOutlineLogout as GoOutIcon } from "react-icons/md";
import { FaRegWindowMinimize as WindowMinIcon } from "react-icons/fa";
import { ReactComponent as PikchaIcon } from "~/assets/LogoLetter.svg";
import { ReactComponent as Logo } from "~/assets/Logo.svg";

const ChatHeader = () => {
  const onlineNumOfUsers = useRecoilValue(onlineNumberOfUserState);
  const setChatStatus = useSetRecoilState(ChatStatus);
  const setShowSearchBox = useSetRecoilState(ShowSearchBox);
  const showSearchBox = useRecoilValue(ShowSearchBox);
  const setNewMessageArrived = useSetRecoilState(NewMessageArrivedState);
  const handleMinClick = () => {
    setNewMessageArrived((p) => (!p ? p : { ...p, count: 0 }));
    setChatStatus("MINIMIZED");
  };
  return (
    <ChatHeaderWrapper showSearchBox={showSearchBox}>
      <LogoIconWrapper>
        <PikchaIcon />
      </LogoIconWrapper>
      <ChatInfoWrapper>
        <Logo />
        <div>
          <span>{onlineNumOfUsers}</span> online
        </div>
      </ChatInfoWrapper>
      <ChatControllWrapper>
        <span className="tooltip-iconwrapper" onClick={handleMinClick}>
          <WindowMinIcon className="window-icon" />
          <Tooltip>최소화</Tooltip>
        </span>
        <span
          className="tooltip-iconwrapper"
          onClick={() => setShowSearchBox((p) => !p)}
        >
          <SearchIcon className="search-icon" />
          <Tooltip>검색</Tooltip>
        </span>
        <span
          className="tooltip-iconwrapper"
          onClick={() => setChatStatus("EXITED")}
        >
          <GoOutIcon className="out-icon" />
          <Tooltip>나가기</Tooltip>
        </span>
      </ChatControllWrapper>
    </ChatHeaderWrapper>
  );
};
export default ChatHeader;
