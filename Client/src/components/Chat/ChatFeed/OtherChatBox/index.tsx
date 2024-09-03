import { apiClient } from "~/api/axiosInstance";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { chatDatatype } from "~/@types/chat.types";
import {
  isDeleteModeAtom,
  showReportModalAtom,
  messageToReplyAtom,
  messageToReportAtom,
} from "~/recoil/chat/atoms";
import ReplyChatBubble from "../../@common/ReplyChatBubble";
import * as C from "../../styled";
import * as CF from "../styled";
import * as S from "./styled";
import { FaHeart as HeartIcon } from "react-icons/fa";
import {
  MdReport as ReportIcon,
  MdSubdirectoryArrowRight as ReplyIcon,
} from "react-icons/md";
interface MyChatBoxProps {
  chatData: chatDatatype;
  timeStampFlagForTime: boolean;
  timeStampFlagForRadius: boolean;
  memberIdFlag: boolean;
  lastChatMessageRef:
    | ((node: HTMLDivElement) => void)
    | React.MutableRefObject<HTMLDivElement | null>
    | null;
  searchTargetAnimation: boolean;
  chatDataMapRef: React.MutableRefObject<Map<
    number,
    {
      node: HTMLElement;
      idx: number;
    }
  > | null>;
}

const OtherChatBox = ({
  chatData,
  timeStampFlagForTime,
  timeStampFlagForRadius,
  memberIdFlag,
  lastChatMessageRef,
  searchTargetAnimation,
  chatDataMapRef,
}: MyChatBoxProps) => {
  const isDeleteMode = useRecoilValue(isDeleteModeAtom);
  const setShowReportModal = useSetRecoilState(showReportModalAtom);
  const setIsReplyMessage = useSetRecoilState(messageToReplyAtom);
  const setReportChatData = useSetRecoilState(messageToReportAtom);
  const handleReplyClick = () => {
    setIsReplyMessage(chatData);
  };
  const handleHeartClick = () => {
    apiClient
      .post(`/app/likes/${chatData.chatId}`, {})
      .then((res) => console.log(res.data, "좋아요 반영"))
      .catch((err) => console.log(err));
  };
  const handleReportClick = (isReported: boolean) => {
    if (isReported) return;
    setReportChatData(chatData);
    setShowReportModal(true);
  };
  return (
    <C.ChatMessageDiv
      key={chatData.createdAt}
      type="LEFT"
      ref={lastChatMessageRef}
      isFirst={timeStampFlagForRadius && memberIdFlag}
      searchTargetAnimation={searchTargetAnimation}
    >
      <S.ChatProfileWrapper showProfile={memberIdFlag}>
        {memberIdFlag && <img src={chatData.picture} alt="chat profile" />}
      </S.ChatProfileWrapper>
      <CF.ChatContentWrapper direction="LEFT">
        {memberIdFlag && <S.UsernameDiv>{chatData.username}</S.UsernameDiv>}
        <CF.ChatContentBottomWrapper
          messageType={chatData.type}
          isDeleteMode={isDeleteMode}
          isOthers={true}
        >
          <CF.ChatContentDiv
            type={timeStampFlagForRadius ? "first" : "notFirst"}
            messageType={chatData.type}
          >
            {chatData.type === "REPLY" && (
              <>
                <ReplyChatBubble
                  chatData={chatData}
                  textColor="var(--black-800)"
                  chatDataMapRef={chatDataMapRef}
                />
                <C.DividerLine margin="3px" color="var(--black-275)" />
              </>
            )}
            {chatData.type === "DELETE"
              ? "삭제된 메시지입니다"
              : chatData.type === "REPORT"
              ? "3회 이상 신고된 메시지입니다"
              : chatData.content}
            {chatData.type !== "DELETE" && chatData.type !== "REPORT" && (
              <CF.ChatContentMenu
                type="LEFT"
                reportDisabled={chatData.isReported}
              >
                <CF.ChatContentMenuItem
                  className="report-box"
                  onClick={() => handleReportClick(chatData.isReported)}
                  reportDisabled={chatData.isReported}
                >
                  <ReportIcon className="report-icon" />
                </CF.ChatContentMenuItem>
                <CF.ChatContentMenuItem
                  className="reply-box"
                  onClick={handleReplyClick}
                >
                  <ReplyIcon className="reply-icon" />
                </CF.ChatContentMenuItem>
                <CF.ChatContentMenuItem
                  className="heart-box"
                  onClick={handleHeartClick}
                >
                  <HeartIcon className="heart-icon" />
                </CF.ChatContentMenuItem>
              </CF.ChatContentMenu>
            )}
          </CF.ChatContentDiv>

          {timeStampFlagForTime && (
            <span className="time-tag">
              {new Date(chatData.createdAt).toLocaleTimeString("ko-KR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </CF.ChatContentBottomWrapper>
        {chatData.type !== "DELETE" && !!chatData.likes && (
          <CF.ReactionTagSpan
            isVoted={chatData.isVoted}
            onClick={handleHeartClick}
            isOthers={true}
          >
            <HeartIcon />
            {chatData.likes}
          </CF.ReactionTagSpan>
        )}
      </CF.ChatContentWrapper>
    </C.ChatMessageDiv>
  );
};
export default OtherChatBox;
