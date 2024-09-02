import { useState } from "react";
import { flushSync } from "react-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import Button from "~/components/@common/Button";
import useAuthPostMessage from "~/hooks/useAuthPostMessage";
import useNavigateToStoredLocation from "~/hooks/useNavigateToStoredLocation";
import { UserDataAtomFamily } from "~/recoil/auth";
import { isOverlayLeftAtom } from "~/recoil/loginSignUp/atoms";
import { apiClient } from "~/api/axiosInstance";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { RiKakaoTalkFill as KakaoIcon } from "react-icons/ri";
import * as l from "./styled";
import * as shared from "../styled";

const LoginSide = () => {
  const [isOverlayLeft, setIsOverlayLeft] =
    useRecoilState<boolean>(isOverlayLeftAtom);
  const [loginemail, setLoginEmail] = useState<string>("");
  const [loginpassword, setLoginPassword] = useState<string>("");
  const [loginemailErr, setLoginEmailErr] = useState<boolean>(true);
  const [loginpasswordErr, setLoginPasswordErr] = useState<boolean>(true);
  const setIslogin = useSetRecoilState(UserDataAtomFamily.LOGIN_STATE);
  const setAuth = useSetRecoilState(UserDataAtomFamily.AUTH_TOKEN);
  const setLoggedUser = useSetRecoilState(UserDataAtomFamily.LOGGED_USER);
  const setMemberId = useSetRecoilState(UserDataAtomFamily.MEMBER_ID);
  const { postLogin } = useAuthPostMessage();
  const navigateToStoredLocation = useNavigateToStoredLocation();

  const handleLoginEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const EMAIL_REGEX = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
    setLoginEmailErr(!EMAIL_REGEX.test(e.target.value));
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setLoginPasswordErr(!(e.target.value.length >= 8));
    setLoginPassword(e.target.value);
  };

  const onClickLogin = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    loginHandle();
  };

  const loginHandle = () => {
    if (loginemailErr || loginpasswordErr) {
      alert("로그인 양식을 지켜주세요.");
      return;
    }

    return apiClient
      .post(`/login`, {
        username: loginemail,
        password: loginpassword,
      })
      .then((res) => {
        if (res.status === 200) {
          const { memberId, accessToken, email } = res.data.data;
          flushSync(() => {
            setIslogin(true);
            setLoggedUser(email);
            setMemberId(memberId);
            setIsOverlayLeft(false);
            setAuth(accessToken);
          });
          postLogin();
          navigateToStoredLocation();
        }
      })
      .catch((err) => {
        console.error(err);
        alert("회원이 아닙니다.");
      });
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isOverlayLeft === false) {
        loginHandle();
      }
    }
  };

  const onClickBtn = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOverlayLeft(!isOverlayLeft);
  };

  const googleLogin = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/oauth2/authorization/google`;
  };
  const kakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/oauth2/authorization/kakao`;
  };

  return (
    <l.Logincontainer overlay={isOverlayLeft}>
      <shared.TopConatiner>
        <l.LoginHeaderContainer>
          <shared.TextStyle
            color="var(--black-900)"
            fontSize="23px"
            fontweight="bold"
          >
            로그인
          </shared.TextStyle>
        </l.LoginHeaderContainer>
        <l.LoginInputContainer>
          <shared.InputStyle
            placeholder="이메일을 입력하세요."
            onChange={handleLoginEmailChange}
            onKeyDown={onPressEnter}
          ></shared.InputStyle>
          {loginemailErr && loginemail.length !== 0 ? (
            <shared.ErrMsg color="red" fontSize="12px" fontweight="normal">
              올바른 이메일 형식이 아닙니다.
            </shared.ErrMsg>
          ) : null}
          <shared.InputStyle
            placeholder="비밀번호를 입력하세요."
            onChange={handleLoginPasswordChange}
            type="password"
            onKeyDown={onPressEnter}
          ></shared.InputStyle>
        </l.LoginInputContainer>
        <Button
          width="60%"
          height="38px"
          fontsize="15px"
          text="로그인"
          color="var(--black-200)"
          borderRadius="var(--br-s)"
          backgroundColor="var(--black-900)"
          hoverBackgroundColor="black"
          type="custom"
          onClick={onClickLogin}
        ></Button>
      </shared.TopConatiner>
      <shared.TextStyle
        color="var(--black-700)"
        fontSize="var(--font-sm)"
        fontweight="var(--fw-medium)"
        divider
      >
        SNS 간편 회원가입/로그인
      </shared.TextStyle>
      <l.SocialLoginContainer>
        <l.OauthBtn
          border="0.5px solid var(--black-400)"
          backgroundcolor="white"
          hoverbackgroundcolor="var(--black-200)"
          onClick={googleLogin}
        >
          <GoogleIcon />
        </l.OauthBtn>
        <l.OauthBtn
          backgroundcolor="var(--kakao-color)"
          hoverbackgroundcolor="var(--kakao-hover)"
          onClick={kakaoLogin}
        >
          <KakaoIcon />
        </l.OauthBtn>
      </l.SocialLoginContainer>
      <shared.TextStyle
        color="var(--black-700)"
        fontSize="var(--font-xs)"
        fontweight="var(--fw-bold)"
        textDecoration="underline"
        onClick={onClickBtn}
        cursor="pointer"
      >
        이메일로 회원가입하기
      </shared.TextStyle>
    </l.Logincontainer>
  );
};

export default LoginSide;
