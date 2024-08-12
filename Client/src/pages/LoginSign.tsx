import styled from "styled-components";
import Overlay from "../components/Login_Sign/Overlay";
import LoginSide from "../components/Login_Sign/LoginSide";
import SignSide from "../components/Login_Sign/SignSide";
import * as s from "../components/Login_Sign/LoginSignStyle";

const Body = styled.div`
  width: 83.5%;
  margin: 0 auto;
  height: 100vh;
`;

function LoginSign() {
  return (
    <>
      <Body>
        <s.Wrapper>
          <SignSide />
          <LoginSide />
          <Overlay direction="left" />
          <Overlay direction="right" />
        </s.Wrapper>
      </Body>
    </>
  );
}

export default LoginSign;
