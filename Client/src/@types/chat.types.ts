export type ToastMessageType =
  | "REPORT_COMPLETE"
  | "CHECK_NETWORK"
  | "DELETE_ERROR";

export interface ToastInfo {
  id: number;
  message: ToastMessageType;
}

export type ChatPanelStatusType = "EXITED" | "MINIMIZED" | "JOINED";

export type ChatMessageType =
  | "CHAT"
  | "JOIN"
  | "LEAVE"
  | "DELETE"
  | "REPORT"
  | "REPLY"
  | "LOADMORE";

export interface chatDatatype {
  chatId: number;
  content: string;
  createdAt: string;
  memberId: number;
  picture: string | undefined;
  type: ChatMessageType;
  username: string;
  verifyKey: string;
  targetContent: string | null;
  targetChatId: number | null;
  targetMemberId: number | null;
  targetPicture: string | null;
  targetUsername: string | null;
  isVoted: boolean;
  likes: number;
  status?: "SENDING" | "FAIL";
  isReported: boolean;
}
