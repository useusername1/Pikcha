import styled, { css } from "styled-components";

export const NewMessageBoxWrapper = styled.div<{ showNewMessageBox: boolean }>`
  position: absolute;
  width: 95%;
  height: 50px;
  top: -55px;
  left: 200px;
  border-radius: var(--br-m);
  transition: all cubic-bezier(0.165, 0.84, 0.44, 1) 0.5s;
  transform: translate3d(-50%, 15px, -10px);
  color: var(--black-900);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 15px;
  pointer-events: none;
  transform-style: preserve-3d;
  backdrop-filter: blur(8px);
  background-image: linear-gradient(to bottom, rgba(255, 0, 0, 0), #ffffff88);
  box-shadow: 0px 0px 7px 0px rgba(232, 232, 232, 0.468);
  ${(props) =>
    props.showNewMessageBox &&
    css`
      opacity: 1;
      transform: translate3d(-50%, 0, 10px);
      pointer-events: auto;
    `}
  :hover {
    cursor: pointer;
  }
  img {
    width: 28px;
    height: 28px;
    border-radius: 10px;
  }
  div.message-content {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  span.username {
    font-size: var(--font-xxs);
    color: var(--black-700);
    letter-spacing: 0.03rem;
    margin-bottom: 3px;
    font-weight: var(--fw-medium);
  }
  span.message {
    font-size: var(--font-xxs);
    color: var(--black-900);
    letter-spacing: 0.03rem;
  }
`;
