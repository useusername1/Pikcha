import { apiClient } from "~/api/axiosInstance";
import { useRecoilState } from "recoil";
import { chatDatatype } from "~/@types/chat.types";
import { emptyMessage } from "~/data/chatData";
import { chatDataAtom } from "~/recoil/chat/atoms";
import { LoadMoreButtonWrapper, StyledLoadMoreButton } from "./styled";
import { BiPlus as PlusIcon } from "react-icons/bi";
//이전 chatid, 이후 chatid받기 뒤에 loadmore 추가
interface LoadMoreButtonProps {
  chatIdRange: number[];
}
/*chatId보다 1개 더 앞의 메시지, */
const LoadMoreButton = ({ chatIdRange }: LoadMoreButtonProps) => {
  const [chatData, setChatData] = useRecoilState(chatDataAtom);
  const [prevChatId, nextChatId] = chatIdRange.map((el) => chatData[el].chatId);
  const handleButtonClick = () => {
    apiClient
      .get(`/app/load?gte=${prevChatId}&lte=${nextChatId}`)
      .then((res) => {
        const loadMoreMessage: chatDatatype = {
          ...emptyMessage,
          type: "LOADMORE",
        };
        let newChatData = [...res.data.data.slice(2)];

        if (res.data.hasNext) {
          newChatData = [
            ...newChatData,
            {
              ...loadMoreMessage,
              chatId: newChatData[newChatData.length - 1].chatId,
            },
          ];
        }
        setChatData((p) => [
          ...p.slice(0, chatIdRange[0] + 1),
          ...newChatData,
          ...p.slice(chatIdRange[1]),
        ]);
      })
      .catch(console.log);
  };
  return (
    <LoadMoreButtonWrapper>
      <StyledLoadMoreButton onClick={handleButtonClick}>
        더 불러오기
        <PlusIcon className="plus-icon" />
      </StyledLoadMoreButton>
    </LoadMoreButtonWrapper>
  );
};
export default LoadMoreButton;
