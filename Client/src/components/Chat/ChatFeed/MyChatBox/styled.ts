import styled from "styled-components";

export const DeleteCheckIconWrapper = styled.div<{ isDeleteChecked: boolean }>`
  visibility: hidden;
  transition: all ease 0.3s;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translate3d(calc(-50% + 10px), calc(-50% + 2px), -2px);
  svg {
    transition: all ease 0.2s;
    color: ${(props) =>
      props.isDeleteChecked ? " var(--pink-heart)" : "var(--black-500)"};
    width: 20px;
    height: 20px;
  }
  :hover {
    cursor: pointer;
    svg {
      animation: check-flashing ease 1s infinite;
    }
  }
  @keyframes check-flashing {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
`;
