interface searchedMessageType {
  chatId: number;
  content: string;
  memberId: number;
  username: string;
  picture?: string;
  createdAt?: string;
}

export type { searchedMessageType };
