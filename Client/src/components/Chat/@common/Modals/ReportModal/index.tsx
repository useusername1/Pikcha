import { apiClient } from "~/api/axiosInstance";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  toastQueueAtom,
  messageToReportAtom,
  showReportModalAtom,
} from "~/recoil/chat/atoms";
import * as C from "~/components/Chat/styled";
import * as M from "../styled";
import * as S from "./styled";
import { RiAlarmWarningFill as AlarmIcon } from "react-icons/ri";
import { chatDatatype } from "~/@types/chat.types";

interface ReportModalProps {
  setChatData: React.Dispatch<React.SetStateAction<chatDatatype[]>>;
}
const ReportModal = ({ setChatData }: ReportModalProps) => {
  const setShowReportModal = useSetRecoilState(showReportModalAtom);
  const [reportChatData, setReportChatData] =
    useRecoilState(messageToReportAtom);
  const setToastQueue = useSetRecoilState(toastQueueAtom);
  const handleCancelClick = () => {
    setReportChatData(null);
    setShowReportModal(false);
  };
  const handleConfirmClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!reportChatData) return;

    apiClient
      .post(`/app/report/${reportChatData.chatId}`, {})
      .then((res) => {
        setChatData((p) => {
          const index = p.findIndex(
            (el) => el.verifyKey === reportChatData.verifyKey
          );
          return [
            ...p.slice(0, index),
            { ...p[index], isReported: true },
            ...p.slice(index + 1),
          ];
        });
        setToastQueue((p) => [
          {
            id: Math.random(),
            message: "REPORT_COMPLETE",
          },
          ...p,
        ]);
      })
      .catch((err) => console.log("이미 신고한 메시지입니다"));

    setReportChatData(null);
    setShowReportModal(false);
  };
  return (
    <M.ModalWrapper>
      <S.ReportModalContainer>
        <div className="report-user">
          {reportChatData?.username}&nbsp;님의 게시글
        </div>
        <div className="report-content">{reportChatData?.content}</div>
        <C.DividerLine width="100%" margin="5px" />
        <S.ReportLabel>
          <AlarmIcon />
          신고
        </S.ReportLabel>
        <S.ReportForm id="report">
          <div>신고 사유를 선택해주세요</div>
          <div className="radio-box">
            <S.CheckboxContainer>
              <input type="checkbox" id="report1" />
              <label htmlFor="report1"></label>
              광고성 게시물
            </S.CheckboxContainer>
            <S.CheckboxContainer>
              <input type="checkbox" id="report2" />
              <label htmlFor="report2"></label>
              음란성 게시물
            </S.CheckboxContainer>
            <S.CheckboxContainer>
              <input type="checkbox" id="report3" />
              <label htmlFor="report3"></label>
              욕설, 부적절한 언어
            </S.CheckboxContainer>
            <S.CheckboxContainer>
              <input type="checkbox" id="report4" defaultChecked />
              <label htmlFor="report4"></label>
              기타
            </S.CheckboxContainer>
          </div>
          <textarea
            form="report"
            rows={3}
            placeholder="상세내용(선택)"
          ></textarea>
          <div className="modal-buttonBox">
            <button className="cancel-button" onClick={handleCancelClick}>
              취소
            </button>
            <button
              className="confirm-button"
              onClick={(e) => handleConfirmClick(e)}
            >
              확인
            </button>
          </div>
        </S.ReportForm>
      </S.ReportModalContainer>
    </M.ModalWrapper>
  );
};
export default ReportModal;
