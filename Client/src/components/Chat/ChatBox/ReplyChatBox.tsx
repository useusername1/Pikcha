import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatDatatype } from "../Chat";
import { ReplyMessageBoxDiv } from "./ChatBoxStyled";
import { ScrollTargetChatIdState } from "../../../recoil/chatState";
import { scrollFlagRef } from "../ChatPanel";
import { UserDataAtomFamily } from "../../../recoil/auth";

interface ReplyMessageBoxProps {
  chatData: chatDatatype;
  textColor?: string;
  chatDataMapRef?: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}
const ReplyMessageBox = ({
  chatData,
  textColor,
  chatDataMapRef,
}: ReplyMessageBoxProps) => {
  const memberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);
  const setScrollTargetChatId = useSetRecoilState(ScrollTargetChatIdState);
  const handleClick = () => {
    if (!chatDataMapRef) return;
    scrollFlagRef.current = false;
    chatDataMapRef.current
      ?.get(chatData.targetChatId as number)
      ?.node.scrollIntoView();
    setScrollTargetChatId(chatData.targetChatId);
  };
  return (
    <ReplyMessageBoxDiv textColor={textColor} onClick={handleClick}>
      <img src={chatData.targetPicture as string} alt="target-user" />
      <div className="target-info">
        <span className="targetuser-info">
          {memberId === chatData.targetMemberId
            ? "나"
            : `${chatData.targetUsername}님`}
          에게 답장
        </span>
        <span>{chatData.targetContent}</span>
      </div>
    </ReplyMessageBoxDiv>
  );
};
export default ReplyMessageBox;
