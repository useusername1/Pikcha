import styled from "styled-components";
import { OverlayProps } from "../types";

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
