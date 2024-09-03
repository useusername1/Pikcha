import styled from "styled-components";
import { OverlayProps } from "./types";

interface PaddingProps {
  padding: string;
}

interface TextProps {
  fontSize: string;
  color: string;
  fontweight: string;
  divider?: boolean;
  textDecoration?: string;
  cursor?: string;
  margin?: string;
}

interface TopContainerProps {
  padding?: string;
}

export const Signincontainer = styled.div<OverlayProps>`
  box-shadow: 0px 0px 35px -4px rgba(227, 227, 227, 0.75);
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
  z-index: ${(props) => (props.overlay ? "1" : "0")};
  transform: ${(props) =>
    props.overlay ? "translateX(-50%)" : "translateX(50%)"};
  box-shadow: ${(props) =>
    props.overlay
      ? "0px 0px 35px -4px rgba(227,227,227,0.75)"
      : "0px 0px 35px -4px rgba(227,227,227,0.75)"};
`;

export const CustomPadding = styled.div<PaddingProps>`
  padding: ${(props) => props.padding};
`;
export const Logo = styled.img`
  width: 200px;
  height: 50px;
  font-size: 40px;
  margin-top: 15px;
  cursor: pointer;
`;

export const TopConatiner = styled.section<TopContainerProps>`
  width: 100%;
  padding: ${(props) => (props.padding ? props.padding : "10% 0")};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const TextStyle = styled.div<TextProps>`
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontweight};
  padding-top: 10px;
  margin: ${(props) => (props.margin ? props.margin : "")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: ${(props) => (props.cursor ? props.cursor : "")};
  ${(props) =>
    props.textDecoration &&
    `
    text-decoration: ${props.textDecoration};
    text-underline-position: under; 
  `}
  ${(props) => {
    const textColor = props.color;
    return (
      props.divider &&
      `
      &::before, &::after {
        content: '';
        width:20px;
        height: 0.5px;
        background: ${textColor};  
        margin: 0 10px;
      }
      `
    );
  }};
`;

export const InputStyle = styled.input`
  width: 75%;
  height: 40px;
  border: 0px;
  border-bottom: 1px solid var(--black-300);
  padding-top: 15px;
  font-size: 15px;
  margin-bottom: 5px;
  &:focus {
    outline: none;
    border-bottom: 1px solid var(--black-600);
  }
  &::placeholder {
    color: var(--black-600);
  }
`;

export const ErrMsg = styled.div<TextProps>`
  width: 75%;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontweight};
`;
