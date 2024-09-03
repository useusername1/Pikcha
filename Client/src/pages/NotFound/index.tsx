import UnavailableNotice from "~/components/@common/UnavailableNotice";
import { Link } from "react-router-dom";
import * as S from "./styled";

const NoAddress = () => {
  return (
    <S.EmptyNotificationContainer>
      <S.EmptyNotificationWrapper>
        <UnavailableNotice
          type="NOT_FOUND"
          message="존재하지 않는 주소입니다"
        />
        <Link to={"/"}>홈으로 돌아가기</Link>
      </S.EmptyNotificationWrapper>
    </S.EmptyNotificationContainer>
  );
};
export default NoAddress;
