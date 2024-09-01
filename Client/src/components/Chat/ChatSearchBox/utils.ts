import { chatDatatype } from "~/@types/chat.types";

/** 일치하는 chatId가 있으면 found:true 반환 chatId에 해당하는 위치의 인덱스 반환
일치하는 chatId가 없으면 found:false && chatId에 해당하는 위치의 앞뒤 인덱스 반환
*/
function chatIdSearch(chatMessage: chatDatatype[], targetId: number) {
  let first = 0;
  let last = chatMessage.length - 1;
  let mid;
  while (first <= last) {
    mid = Math.floor((first + last) / 2);
    if (chatMessage[mid].chatId === targetId)
      return { found: true, targetIdIndex: mid };
    else if (chatMessage[mid].chatId < targetId) first = mid + 1;
    else last = mid - 1;
  }
  return {
    found: false,
    targetIdIndex: [Math.min(first, last), Math.max(first, last)],
  };
}

export { chatIdSearch };
