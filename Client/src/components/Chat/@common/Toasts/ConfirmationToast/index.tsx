import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { AlertQueueState } from "../../../../../recoil/chatState";
import { ConfirmationToastWrapper } from "./styled";
import ToastItem from "./ConfirmationToastItem";

const ConfirmationToast = () => {
  const [alertQueueState, setAlertQueueState] = useRecoilState(AlertQueueState);

  useEffect(() => {
    setAlertQueueState((p) => {
      if (p.length > 3) return [...p.slice(0, p.length - 1)];
      return p;
    });
  }, [alertQueueState]);

  return (
    <>
      <ConfirmationToastWrapper>
        {alertQueueState.map((el) => (
          <ToastItem key={el.id} alertData={el} />
        ))}
      </ConfirmationToastWrapper>
    </>
  );
};
export default ConfirmationToast;

/*
1.메세지 삭제 실패
2.중복 신고
3.네트워크 연결 오류
*/
