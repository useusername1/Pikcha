import { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import Button from "~/components/@common/Button";
import { isOverlayLeftAtom } from "~/recoil/loginSignUp/atoms";
import DaumPostcode from "react-daum-postcode";
import * as S from "./styled";
import * as LSU from "../styled";
import { apiClient } from "~/api/axiosInstance";

const SignUpSide = () => {
  const [isOverlayLeft, setIsOverlayLeft] =
    useRecoilState<boolean>(isOverlayLeftAtom);
  const [signemail, setSignEmail] = useState<string>("");
  const [signpassword, setSignPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [phonenumber, setPhonenumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [signemailErr, setSignEmailErr] = useState<boolean>(true);
  const [signpasswordErr, setSignPasswordErr] = useState<boolean>(true);
  const [phonenumberErr, setPhonenumberErr] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const navigate = useNavigate();

  const handleSignEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const EMAIL_REGEX = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.[a-zA-Z]{2,4}$/;
    setSignEmailErr(!EMAIL_REGEX.test(e.target.value));
    setSignEmail(e.target.value);
  };

  const handleSignPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const PASSWORD_REGEX =
      /^.*(?=^.{8,20}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=()|]).*$/;
    setSignPasswordErr(!PASSWORD_REGEX.test(e.target.value));
    setSignPassword(e.target.value);
  };

  const handlePasswordConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const PHONE_REGEX = /01[016789]-[^0][0-9]{2,3}-[0-9]{4}/;
    setPhonenumberErr(!PHONE_REGEX.test(e.target.value));
    setPhonenumber(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handleAddress = {
    clickInput: () => {
      setOpenPostcode(!openPostcode);
    },
    selectAddress: (data: any) => {
      setAddress(data.address);
      setOpenPostcode(false);
    },
  };

  const onClickSignin = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    signHandle();
  };

  const signHandle = () => {
    if (signemailErr || signpasswordErr || phonenumberErr) {
      alert("회원가입 양식을 제대로 채워주세요.");
      return;
    }
    if (!signemailErr && !signpasswordErr && !phonenumberErr) {
      return apiClient
        .post("/signup", {
          email: signemail,
          password: signpassword,
          phoneNumber: phonenumber,
          address: address,
          username: username,
        })
        .then((res) => {
          if (res.status === 201) {
            setIsOverlayLeft(false);
            navigate(-1);
          }
        })
        .catch((err) => {
          console.error(err);
          alert("이미 존재하는 회원입니다.");
        });
    }
  };

  const onPressEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (isOverlayLeft === true) {
        signHandle();
      }
    }
  };

  const onClickBtn = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsOverlayLeft(!isOverlayLeft);
  };

  return (
    <S.SinUpSideWrapper>
      {openPostcode && (
        <>
          <DaumPostcode
            style={{
              display: "block",
              // position: "absolute",
              width: "500px",
              height: "500px",
              padding: "0px",
              zIndex: 10,
            }}
            onComplete={handleAddress.selectAddress} // 값을 선택할 경우 실행되는 이벤트
            autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
            defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
          />
          <S.CloseButton onClick={handleAddress.clickInput}>
            <AiOutlineCloseCircle />
          </S.CloseButton>
        </>
      )}
      <LSU.Signincontainer overlay={isOverlayLeft}>
        <LSU.TopConatiner padding="10% 0 7% 0">
          <LSU.TextStyle
            color="var(--black-900)"
            fontSize="23px"
            fontweight="bold"
            margin="0 0 10px 0"
          >
            회원가입
          </LSU.TextStyle>
          <LSU.InputStyle
            placeholder="이메일"
            defaultValue={""}
            onChange={handleSignEmailChange}
            onKeyDown={onPressEnter}
          ></LSU.InputStyle>
          {signemailErr && signemail.length !== 0 ? (
            <LSU.ErrMsg color="red" fontSize="12px" fontweight="normal">
              올바른 이메일 형식이 아닙니다.
            </LSU.ErrMsg>
          ) : null}
          <LSU.InputStyle
            placeholder="비밀번호"
            defaultValue={""}
            onChange={handleSignPasswordChange}
            onKeyDown={onPressEnter}
            type="password"
          ></LSU.InputStyle>
          {signpasswordErr && signpassword.length !== 0 ? (
            <LSU.ErrMsg color="red" fontSize="12px" fontweight="normal">
              비밀번호를 8자이상 입력해주세요.
            </LSU.ErrMsg>
          ) : null}
          <LSU.InputStyle
            placeholder="비밀번호확인"
            defaultValue={""}
            onChange={handlePasswordConfirm}
            onKeyDown={onPressEnter}
            type="password"
          ></LSU.InputStyle>
          {passwordConfirm === signpassword ? null : (
            <LSU.ErrMsg color="red" fontSize="12px" fontweight="normal">
              비밀번호가 다릅니다.
            </LSU.ErrMsg>
          )}
          <LSU.InputStyle
            placeholder="전화번호(-를 포함해서 입력해주세요)"
            defaultValue={""}
            onChange={handlePhoneChange}
            onKeyDown={onPressEnter}
          ></LSU.InputStyle>
          {phonenumberErr && phonenumber.length !== 0 ? (
            <LSU.ErrMsg color="red" fontSize="12px" fontweight="normal">
              올바른 전화번호 형식이 아닙니다.
            </LSU.ErrMsg>
          ) : null}
          <LSU.InputStyle
            placeholder="주소"
            defaultValue={address}
            onClick={handleAddress.clickInput}
            onKeyDown={handleAddress.clickInput}
            readOnly
          ></LSU.InputStyle>
          <LSU.InputStyle
            placeholder="닉네임"
            onChange={handleUsernameChange}
            onKeyDown={onPressEnter}
          ></LSU.InputStyle>
          <Button
            width="77%"
            height="38px"
            fontsize="15px"
            text="가입하기"
            color="var(--black-200)"
            borderRadius="var(--br-s)"
            backgroundColor="var(--black-900)"
            hoverBackgroundColor="black"
            type="custom"
            margin="20px 0 0 0"
            onClick={onClickSignin}
          ></Button>
        </LSU.TopConatiner>
        <S.BottomTextContainer>
          <LSU.TextStyle
            color="var(--black-700)"
            fontSize="var(--font-xs)"
            fontweight="var(--fw-medium)"
            margin="0 8px 0 0"
          >
            이미 계정이 있으신가요?
          </LSU.TextStyle>
          <LSU.TextStyle
            color="var(--black-700)"
            fontSize="var(--font-xs)"
            fontweight="var(--fw-bold)"
            textDecoration="underline"
            cursor="pointer"
            onClick={onClickBtn}
          >
            로그인하기
          </LSU.TextStyle>
        </S.BottomTextContainer>
      </LSU.Signincontainer>
    </S.SinUpSideWrapper>
  );
};

export default SignUpSide;
