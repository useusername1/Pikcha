import { atom } from "recoil";
import {
  ToastInfo,
  chatDatatype,
  ChatPanelStatusType,
} from "../../@types/chat.types";

export const chatDataAtom = atom<chatDatatype[]>({
  key: "chatDataAtom",
  default: [],
});
//채팅 데이터
export const isDeleteModeAtom = atom<boolean>({
  key: "isDeleteModeAtom",
  default: false,
});
//삭제모드
export const showConfirmModalAtom = atom<boolean>({
  key: "showConfirmModalAtom",
  default: false,
});
//취소 승인 모달-완료
export const showReportModalAtom = atom<boolean>({
  key: "showReportModalAtom",
  default: false,
});
//신고 모달
export const itemsToDeleteAtom = atom<Set<number>>({
  key: "itemsToDeleteAtom",
  default: new Set(),
});
//삭제할 메시지 deleteItemsAtom => itemsToDeleteAtom

export const messageToReplyAtom = atom<chatDatatype | null>({
  key: "messageToReplyAtom",
  default: null,
});
//답글 달 메시지 저장 isReplyMessageAtom => messageToReplyAtom

export const messageToReportAtom = atom<chatDatatype | null>({
  key: "messageToReportAtom",
  default: null,
});
//신고 메시지 저장 reportChatDataAtom=>messageToReportAtom
export const chatMemberCountAtom = atom<number>({
  key: "chatMemberCountAtom",
  default: 0,
});
//채팅 참가 인원 onlinenumberofuserAtom=>chatMemberCount

export const toastQueueAtom = atom<Array<ToastInfo>>({
  key: "toastQueueAtom",
  default: [],
});
//알림 메시지 큐

export const chatStatusAtom = atom<ChatPanelStatusType>({
  key: "chatStatusAtom",
  default: "EXITED",
});
//채팅 상태

export const showSearchBoxAtom = atom<boolean>({
  key: "showSearchBoxAtom",
  default: false,
});
//검색 박스
export const scrollTargetChatIdAtom = atom<number | null>({
  key: "scrollTargetChatIdAtom",
  default: null,
});
//클릭한 검색 메시지
export const incomingMessageAtom = atom<{
  message: chatDatatype;
  count: number;
} | null>({
  key: "incomingMessageAtom",
  default: null,
});
//새로 도착한 메시지 newMessageArrivedAtom=>incomingMessageAtom

export const showNewMessageToastAtom = atom<boolean>({
  key: "showNewMessageToastAtom",
  default: false,
});
//새 메시지 알림 모달 showNewMessageBoxAtom=>showNewMessageToastAtom

export const newMessageCountAtom = atom<number>({
  key: "newMessageCountAtom",
  default: 0,
});
//최소화 상태에서 새 메시지 개수 countnewmessageatom=>newMessageCountAtom
