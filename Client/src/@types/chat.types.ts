export type AlertMessageType =
  | "REPORT_COMPLETE"
  | "CHECK_NETWORK"
  | "DELETE_ERROR";

export interface AlertInfo {
  id: number;
  message: AlertMessageType;
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
