/**callback함수가 다음 이벤트 루프 주기에서 실행되도록 함 */
export function runNextTick(callback: () => void) {
  setTimeout(callback, 0);
}
