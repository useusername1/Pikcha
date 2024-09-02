import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { chatStatusAtom, incomingMessageAtom } from "~/recoil/chat/atoms";
import { ChatExpandableButton } from "./styled";
import { BsFillChatLeftDotsFill as ChatIcon } from "react-icons/bs";
import { UserDataAtomFamily } from "~/recoil/auth";
import { isLoginModalVisibleAtom } from "~/recoil/modal/atoms";

const ChatButton = () => {
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const [chatStatus, setChatStatus] = useRecoilState(chatStatusAtom);
  const incomingMessage = useRecoilValue(incomingMessageAtom);
  const setIsLoginModalVisible = useSetRecoilState(isLoginModalVisibleAtom);

  const handleButtonClick = () => {
    if (!isLogin) {
      setIsLoginModalVisible(true);
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
        {!!incomingMessage?.count && (
          <span>
            {incomingMessage.count > 99 ? "99+" : incomingMessage.count}
          </span>
        )}
      </ChatExpandableButton>
    </>
  );
};
export default ChatButton;
