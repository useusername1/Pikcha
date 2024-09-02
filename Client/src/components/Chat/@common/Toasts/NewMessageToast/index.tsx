import { useRecoilValue } from "recoil";

import {
  incomingMessageAtom,
  showNewMessageToastAtom,
} from "~/recoil/chat/atoms";
import { scrollFlagRef } from "~/components/Chat/ChatPanel";
import { NewMessageBoxWrapper } from "./styled";
interface NewMessageBoxProps {
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}
const NewMessageToast = ({ chatDataMapRef }: NewMessageBoxProps) => {
  const incomingMessage = useRecoilValue(incomingMessageAtom);
  const showNewMessageToast = useRecoilValue(showNewMessageToastAtom);

  const handleClick = () => {
    if (incomingMessage) {
      scrollFlagRef.current = false;
      chatDataMapRef.current
        ?.get(incomingMessage.message.chatId)
        ?.node.scrollIntoView();
    }
  };
  return (
    <NewMessageBoxWrapper
      showNewMessageBox={showNewMessageToast}
      onClick={handleClick}
    >
      <img src={incomingMessage?.message.picture} alt="user profile" />
      <div className="message-content">
        <span className="username">{incomingMessage?.message.username}</span>
        <span className="message">{incomingMessage?.message.content}</span>
      </div>
    </NewMessageBoxWrapper>
  );
};
export default NewMessageToast;
