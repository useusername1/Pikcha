import { chatDatatype } from "~/@types/chat.types";

export const emptyMessage: chatDatatype = {
  chatId: -1,
  content: "",
  createdAt: "",
  memberId: -1,
  picture: undefined,
  type: "CHAT",
  username: "",
  verifyKey: "",
  targetContent: null,
  targetChatId: null,
  targetMemberId: null,
  targetPicture: null,
  targetUsername: null,
  isVoted: false,
  likes: 0,
  isReported: false,
};
