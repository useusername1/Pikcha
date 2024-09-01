import styled, { css } from "styled-components";
import { SendBarFrameDiv } from "~/components/Chat/ChatInputBar/styled";
import { ChatInputBarStyleType } from "~/components/Chat/types";

const ConfirmBarDiv = styled(SendBarFrameDiv)<{
  styleProps: ChatInputBarStyleType;
}>`
  display: flex;
  justify-content: space-between;
`;

const CancelAllButton = styled.button`
  height: calc(var(--sb-lineheight) + var(--sb-padding) * 2);
  border-radius: 15px;
  width: 48.5%;
  border: none;
  background-color: var(--grey-background);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all ease 0.1s;
  cursor: pointer;
  span {
    padding-bottom: 1px;
    color: var(--pink-heart);
  }
  :hover {
    background-color: var(--black-250);
  }
`;

const DeleteAllButton = styled(CancelAllButton)<{
  disabled: boolean;
}>`
  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      span {
        display: none;
      }
    `}
  :hover {
    background-color: ${(props) =>
      props.disabled ? "var(--black-250)" : "#ffeeee"};
  }
`;

export { ConfirmBarDiv, CancelAllButton, DeleteAllButton };
