import { ReactComponent as NoAddressIcon } from "~/assets/NoAddressillustration.svg";
import { ReactComponent as NotFoundIcon } from "~/assets/NotFound.svg";
import * as S from "./styled";

interface NotificationProps {
  type: "NOT_FOUND" | "NO_CONTENT";
  message: string;
}

const UnavailableNotice = ({ type, message }: NotificationProps) => {
  return (
    <S.EmptyNotificationWrapper>
      {type === "NOT_FOUND" && <NoAddressIcon />}
      {type === "NO_CONTENT" && <NotFoundIcon />}
      <h2>{message}</h2>
    </S.EmptyNotificationWrapper>
  );
};
export default UnavailableNotice;
