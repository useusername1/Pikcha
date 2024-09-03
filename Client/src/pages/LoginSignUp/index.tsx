import { LoginSide, SignUpSide, Overlay } from "~/components/LoginSignUp";
import * as S from "./styled";

function LoginSignUp() {
  return (
    <>
      <S.LoginSignUpContainer>
        <S.LoginSignUpWrapper>
          <SignUpSide />
          <LoginSide />
          <Overlay direction="left" />
          <Overlay direction="right" />
        </S.LoginSignUpWrapper>
      </S.LoginSignUpContainer>
    </>
  );
}

export default LoginSignUp;
