import styled from "styled-components";
import { ButtonProps } from "./types";

export const VioletButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--purple-300);
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "var(--br-l)"};
  border: none;
  color: white;
  font-weight: var(--fw-bold);
  font-size: ${(props) => props.fontsize};
  margin: ${(props) => (props.margin ? props.margin : "")};
  cursor: pointer;
  &:hover {
    background-color: var(--purple-400);
    color: ${(props) => props.hovercolor};
  }
`;

export const WhiteButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--purple-300);
  border-radius: var(--br-l);
  border: ${(props) => (props.border ? props.border : "1px solid white")};
  color: white;
  font-weight: var(--fw-bold);
  font-size: ${(props) => props.fontsize};
  margin: ${(props) => props.margin};
  cursor: pointer;
  &:hover {
    background-color: white;
    color: var(--purple-300);
  }
`;
export const GrayButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--black-300);
  border-radius: var(--br-l);
  border: none;
  color: var(--black-650);
  font-weight: var(--fw-bold);
  font-size: ${(props) => props.fontsize};
  margin: ${(props) => props.margin};
  cursor: pointer;
  &:hover {
    background-color: var(--black-400);
    color: var(--black-650);
  }
  :disabled {
    pointer-events: none;
  }
`;

export const NoneButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: var(--black-250);
  border-radius: var(--br-l);
  border: none;
  font-weight: 400;
  color: var(--black-900);
  font-size: var(--font-sx);
  margin: ${(props) => props.margin};
  :disabled {
    pointer-events: none;
  }
`;
export const CustomButton = styled.button<ButtonProps>`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.backgroundColor};
  border-radius: ${(props) =>
    props.borderRadius ? props.borderRadius : "var(--br-m)"};
  border: none;
  font-weight: var(--fw-bold);
  color: ${(props) => (props.color ? props.color : "black")};
  font-size: var(--font-sm);
  margin: ${(props) => props.margin};
  cursor: pointer;
  :hover {
    color: ${(props) => props.hovercolor};
    background-color: ${(props) => props.hoverBackgroundColor};
  }
`;
