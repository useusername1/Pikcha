import styled from "styled-components";
import { OverlayProps } from "../types";

interface ButtonProps {
  backgroundcolor?: string;
  color?: string;
  hoverbackgroundcolor?: string;
  hovercolor?: string;
  border?: string;
}

export const Logincontainer = styled.div<OverlayProps>`
  width: 430px;
  height: 515px;
  border-radius: ${(props) =>
    props.overlay
      ? "var(--br-m) 0 0 var(--br-m)"
      : "0 var(--br-m) var(--br-m) 0"};
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  transition: all 0.5s;
  position: absolute;
  z-index: ${(props) => (props.overlay ? "0" : "1")};
  transform: ${(props) =>
    props.overlay ? "translateX(-50%)" : "translateX(50%)"};
  box-shadow: ${(props) =>
    props.overlay
      ? "0px 0px 35px -4px rgba(227,227,227,0.75)"
      : "0px 0px 35px -4px rgba(227,227,227,0.75)"};
`;

export const LoginHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const LoginInputContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  padding: 8% 0;
  span {
    width: 70%;
    text-align: left;
  }
`;

export const SocialLoginContainer = styled.div`
  width: 40%;
  margin: 10px 0 15px 0;
  display: flex;
  justify-content: space-evenly;
`;

export const OauthBtn = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 45px;
  border: ${(props) => (props.border ? props.border : "0px")};
  background-color: ${(props) => props.backgroundcolor};
  border-radius: 30px;
  color: ${(props) => props.color};
  font-size: 20px;
  font-weight: bold;
  margin: 10px 0px 5px 0px;
  cursor: pointer;
  &:hover {
    background-color: ${(props) => props.hoverbackgroundcolor};
  }
`;
