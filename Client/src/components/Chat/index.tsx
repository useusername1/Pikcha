import ChatButton from "./ChatButton";
import ChatPanel from "./ChatPanel";
import { useRecoilValue } from "recoil";
import { chatStatusAtom } from "~/recoil/chat/atoms";

const Chat = () => {
  const chatStatus = useRecoilValue(chatStatusAtom);

  return (
    <>
      {(chatStatus === "EXITED" || chatStatus === "MINIMIZED") && (
        <ChatButton />
      )}
      {chatStatus !== "EXITED" && <ChatPanel chatStatus={chatStatus} />}
    </>
  );
};
export default Chat;
/*minimized에서는 새메시지 도착하면 버튼 변경 */
