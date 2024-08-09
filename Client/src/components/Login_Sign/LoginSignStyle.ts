import styled from "styled-components";
interface TextProps {
  fontSize: string;
  color: string;
  fontweight: string;
  divider?: boolean;
  textDecoration?: string;
  cursor?: string;
  margin?: string;
}
interface PaddingProps {
  padding: string;
}
interface OverlayProps {
  overlay: boolean;
  isLeft?: boolean;
}
interface ButtonProps {
  backgroundcolor?: string;
  color?: string;
  hoverbackgroundcolor?: string;
  hovercolor?: string;
  border?: string;
}

interface TopContainerProps {
  padding?: string;
}
export const Wrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--br-m);
`;
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

export const LogoContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  svg {
    opacity: 100%;
    path {
      fill: var(--black-200);
    }
    :hover {
      cursor: pointer;
    }
  }
`;

export const StyledOverlay = styled.div<OverlayProps>`
  width: 430px;
  height: 515px;
  border-radius: ${(props) =>
    props.overlay
      ? "0 var(--br-m) var(--br-m) 0"
      : "var(--br-m) 0 0 var(--br-m)"};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--black-900);
  transition: all 0.5s;
  justify-content: center;
  color: white;
  position: absolute;
  z-index: ${(props) => (props.overlay === props.isLeft ? "1" : "0")};
  transform: ${(props) =>
    props.overlay ? "translateX(50%)" : "translateX(-50%)"};
  box-shadow: ${(props) =>
    props.overlay
      ? "0px 0px 35px -4px rgba(227,227,227,0.75)"
      : "0px 0px 35px -4px rgba(227,227,227,0.75)"};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: ${(props) =>
      props.overlay
        ? "0 var(--br-m) var(--br-m) 0"
        : "var(--br-m) 0 0 var(--br-m)"};
  }
  ${LogoContainer} {
    border-radius: ${(props) =>
      props.overlay
        ? "0 var(--br-m) var(--br-m) 0"
        : "var(--br-m) 0 0 var(--br-m)"};
  }
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

export const ErrMsg = styled.div<TextProps>`
  width: 75%;
  font-size: ${(props) => props.fontSize};
  color: ${(props) => props.color};
  font-weight: ${(props) => props.fontweight};
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
export const CloseButton = styled.button`
  z-index: 100;
  background-color: white;
  font-size: 25px;
  right: 1.6em;
  bottom: 7em;
  color: var(--black-700);
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #c3c3c3;
  }
`;

export const SocialLoginContainer = styled.div`
  width: 40%;
  margin: 10px 0 15px 0;
  display: flex;
  justify-content: space-evenly;
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

export const LoginHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TopConatiner = styled.section<TopContainerProps>`
  width: 100%;
  padding: ${(props) => (props.padding ? props.padding : "10% 0")};
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

export const BottomTextContainer = styled.div`
  display: flex;
`;
