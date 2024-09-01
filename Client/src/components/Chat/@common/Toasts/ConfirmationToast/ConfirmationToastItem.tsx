import { ReactElement, useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import { AlertQueueState } from "../../../../../recoil/chatState";
import { ConfirmationToastItemContainer } from "./styled";
import { BsCheckCircleFill as CompleteIcon } from "react-icons/bs";
import {
  MdError as ErrorIcon,
  MdOutlineWifiOff as NetworkErrorIcon,
} from "react-icons/md";
import { AlertInfo, AlertMessageType } from "../../../../../@types/chat.types";

interface ChatToastItemProps {
  alertData: AlertInfo;
}
const alertMessages: { [key in AlertMessageType]: string } = {
  REPORT_COMPLETE: "신고가 완료되었습니다",
  CHECK_NETWORK: "인터넷 연결 상태를 확인해주세요",
  DELETE_ERROR: "삭제 오류가 발생했습니다",
};
const alertIcon: { [key in AlertMessageType]: Array<ReactElement> } = {
  REPORT_COMPLETE: [<CompleteIcon key={1} />],
  CHECK_NETWORK: [<NetworkErrorIcon key={2} />],
  DELETE_ERROR: [<ErrorIcon key={3} />],
};
const ConfirmationToastItem = ({ alertData }: ChatToastItemProps) => {
  const setAlertQueueState = useSetRecoilState(AlertQueueState);
  const [startAnimation, setStartAnimation] = useState(false);

  useEffect(() => {
    const timeoutNum = setTimeout(() => {
      setStartAnimation(true);
      setTimeout(() => {
        setAlertQueueState((p) => {
          const index = p.findIndex((el) => el.id === alertData.id);
          return [...p.slice(0, index), ...p.slice(index + 1)];
        });
      }, 600);
    }, 3000);
    return () => clearTimeout(timeoutNum);
  }, []);

  return (
    <ConfirmationToastItemContainer startAnimation={startAnimation}>
      {alertIcon[alertData.message]}
      {alertMessages[alertData.message]}
    </ConfirmationToastItemContainer>
  );
};

export default ConfirmationToastItem;
