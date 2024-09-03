import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  chatMemberCountAtom,
  chatStatusAtom,
  showSearchBoxAtom,
  incomingMessageAtom,
} from "~/recoil/chat/atoms";
import * as S from "./styled";
import { HiOutlineSearch as SearchIcon } from "react-icons/hi";
import { MdOutlineLogout as GoOutIcon } from "react-icons/md";
import { FaRegWindowMinimize as WindowMinIcon } from "react-icons/fa";
import { ReactComponent as PikchaIcon } from "~/assets/LogoLetter.svg";
import { ReactComponent as Logo } from "~/assets/Logo.svg";

const ChatHeader = () => {
  const [showSearchBox, setShowSearchBox] = useRecoilState(showSearchBoxAtom);
  const onlineNumOfUsers = useRecoilValue(chatMemberCountAtom);
  const setChatStatus = useSetRecoilState(chatStatusAtom);
  const setNewMessageArrived = useSetRecoilState(incomingMessageAtom);
  const handleMinClick = () => {
    setNewMessageArrived((p) => (!p ? p : { ...p, count: 0 }));
    setChatStatus("MINIMIZED");
  };
  return (
    <S.ChatHeaderWrapper showSearchBox={showSearchBox}>
      <S.LogoIconWrapper>
        <PikchaIcon />
      </S.LogoIconWrapper>
      <S.ChatInfoWrapper>
        <Logo />
        <div>
          <span>{onlineNumOfUsers}</span> online
        </div>
      </S.ChatInfoWrapper>
      <S.ChatControllWrapper>
        <span className="tooltip-iconwrapper" onClick={handleMinClick}>
          <WindowMinIcon className="window-icon" />
          <S.Tooltip>최소화</S.Tooltip>
        </span>
        <span
          className="tooltip-iconwrapper"
          onClick={() => setShowSearchBox((p) => !p)}
        >
          <SearchIcon className="search-icon" />
          <S.Tooltip>검색</S.Tooltip>
        </span>
        <span
          className="tooltip-iconwrapper"
          onClick={() => setChatStatus("EXITED")}
        >
          <GoOutIcon className="out-icon" />
          <S.Tooltip>나가기</S.Tooltip>
        </span>
      </S.ChatControllWrapper>
    </S.ChatHeaderWrapper>
  );
};
export default ChatHeader;
