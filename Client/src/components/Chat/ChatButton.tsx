import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { ChatStatus, NewMessageArrivedState } from "../../recoil/chatState";
import { ChatExpandableButton } from "./ChatStyled";
import { BsFillChatLeftDotsFill as ChatIcon } from "react-icons/bs";
import { UserDataAtomFamily } from "../../recoil/auth";
import { isModalVisible } from "../../recoil/setOverlay";

const ChatButton = () => {
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const [chatStatus, setChatStatus] = useRecoilState(ChatStatus);
  const newMessageArrived = useRecoilValue(NewMessageArrivedState);
  const setIsModal = useSetRecoilState(isModalVisible);

  const handleButtonClick = () => {
    if (!isLogin) {
      setIsModal(true);
      return;
    }
    setChatStatus("JOINED");
  };

  return (
    <>
      <ChatExpandableButton
        onClick={handleButtonClick}
        connected={false}
        chatStatus={chatStatus}
      >
        <ChatIcon />
        {!!newMessageArrived?.count && (
          <span>
            {newMessageArrived.count > 99 ? "99+" : newMessageArrived.count}
          </span>
        )}
      </ChatExpandableButton>
    </>
  );
};
export default ChatButton;
