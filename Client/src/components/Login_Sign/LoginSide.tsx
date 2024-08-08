import React, { useState } from "react";
import ButtonForm from "../Button";
import axios from "../../api/axiosInstance";
import { useRecoilState, useSetRecoilState } from "recoil";
import { UserDataAtomFamily, UserStateKeys } from "../../recoil/auth";
import { setOverlay } from "../../recoil/setOverlay";
import * as l from "./LoginSignStyle";
import { FcGoogle as GoogleIcon } from "react-icons/fc";
import { RiKakaoTalkFill as KakaoIcon } from "react-icons/ri";
import useAuthPostMessage from "../../hooks/useAuthPostMessage";
import { flushSync } from "react-dom";
import useNavigateToStoredLocation from "../../hooks/useNavigateToStoredLocation";

const LoginSide = () => {
  const [overlays, setOverlays] = useRecoilState<boolean>(setOverlay);
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

    return axios
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
            setOverlays(false);
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
      if (overlays === false) {
        loginHandle();
      }
    }
  };

  const onClickBtn = (e: React.MouseEvent<HTMLDivElement>) => {
    setOverlays(!overlays);
  };

  const googleLogin = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/oauth2/authorization/google`;
  };
  const kakaoLogin = () => {
    window.location.href = `${process.env.REACT_APP_HOST}/oauth2/authorization/kakao`;
  };

  return (
    <l.Logincontainer overlay={overlays}>
      <l.TopConatiner>
        <l.LoginHeaderContainer>
          <l.TextStyle
            color="var(--black-900)"
            fontSize="23px"
            fontweight="bold"
          >
            로그인
          </l.TextStyle>
        </l.LoginHeaderContainer>
        <l.LoginInputContainer>
          <l.InputStyle
            placeholder="이메일을 입력하세요."
            onChange={handleLoginEmailChange}
            onKeyDown={onPressEnter}
          ></l.InputStyle>
          {loginemailErr && loginemail.length !== 0 ? (
            <l.ErrMsg color="red" fontSize="12px" fontweight="normal">
              올바른 이메일 형식이 아닙니다.
            </l.ErrMsg>
          ) : null}
          <l.InputStyle
            placeholder="비밀번호를 입력하세요."
            onChange={handleLoginPasswordChange}
            type="password"
            onKeyDown={onPressEnter}
          ></l.InputStyle>
        </l.LoginInputContainer>
        <ButtonForm
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
        ></ButtonForm>
      </l.TopConatiner>
      <l.TextStyle
        color="var(--black-700)"
        fontSize="var(--font-sm)"
        fontweight="var(--fw-medium)"
        divider
      >
        SNS 간편 회원가입/로그인
      </l.TextStyle>
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
      <l.TextStyle
        color="var(--black-700)"
        fontSize="var(--font-xs)"
        fontweight="var(--fw-bold)"
        textDecoration="underline"
        onClick={onClickBtn}
        cursor="pointer"
      >
        이메일로 회원가입하기
      </l.TextStyle>
    </l.Logincontainer>
  );
};

export default LoginSide;
