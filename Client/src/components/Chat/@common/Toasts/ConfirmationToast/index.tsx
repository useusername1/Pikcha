import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { toastQueueAtom } from "~/recoil/chat/atoms";
import * as S from "./styled";
import ToastItem from "./ConfirmationToastItem";

const ConfirmationToast = () => {
  const [toastQueue, setToastQueue] = useRecoilState(toastQueueAtom);

  useEffect(() => {
    setToastQueue((p) => {
      if (p.length > 3) return [...p.slice(0, p.length - 1)];
      return p;
    });
  }, [toastQueue]);

  return (
    <>
      <S.ConfirmationToastWrapper>
        {toastQueue.map((el) => (
          <ToastItem key={el.id} alertData={el} />
        ))}
      </S.ConfirmationToastWrapper>
    </>
  );
};
export default ConfirmationToast;

/*
1.메세지 삭제 실패
2.중복 신고
3.네트워크 연결 오류
*/
