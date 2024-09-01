import UnavailableNotice from "../../components/@common/UnavailableNotice";
import { Link } from "react-router-dom";
import { EmptyNotificationContainer, EmptyNotificationWrapper } from "./styled";

const NoAddress = () => {
  return (
    <EmptyNotificationContainer>
      <EmptyNotificationWrapper>
        <UnavailableNotice
          type="NOT_FOUND"
          message="존재하지 않는 주소입니다"
        />
        <Link to={"/"}>홈으로 돌아가기</Link>
      </EmptyNotificationWrapper>
    </EmptyNotificationContainer>
  );
};
export default NoAddress;
