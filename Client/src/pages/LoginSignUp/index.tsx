import { LoginSide, SignUpSide, Overlay } from "~/components/LoginSignUp";
import * as l from "./styled";

function LoginSignUp() {
  return (
    <>
      <l.LoginSignUpContainer>
        <l.LoginSignUpWrapper>
          <SignUpSide />
          <LoginSide />
          <Overlay direction="left" />
          <Overlay direction="right" />
        </l.LoginSignUpWrapper>
      </l.LoginSignUpContainer>
    </>
  );
}

export default LoginSignUp;
