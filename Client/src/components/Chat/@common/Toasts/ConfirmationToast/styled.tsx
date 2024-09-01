import styled from "styled-components";

const ConfirmationToastWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: transparent;
  color: white;
  border-radius: var(--br-s);
  z-index: var(--zi-five);
  width: 50%;
  top: 65px;
  transform: translateX(calc(50% + 4px));
`;

const ConfirmationToastItemContainer = styled.div<{ startAnimation: boolean }>`
  background-color: white;
  color: var(--black-700);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 45px;
  font-size: var(--font-xs);
  letter-spacing: 0.1rem;
  border-radius: var(--br-s);
  margin-top: 3px;
  box-shadow: 0 1px 10px 0 rgba(114, 114, 114, 0.1),
    0 2px 15px 0 rgba(112, 112, 112, 0.05);
  animation: ${(props) =>
    props.startAnimation ? "modalOutro 0.6s" : "modalIntro 0.6s"};
  svg {
    color: var(--black-700);
    margin-right: 17jpx;
    width: 20px;
  }
  @keyframes modalIntro {
    0% {
      opacity: 0.2;
      height: 0;
      transform: translateY(-10px);
    }
    50%,
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes modalOutro {
    0% {
      opacity: 1;
      transform: translateY(0);
    }
    50%,
    100% {
      opacity: 0;
      transform: translateY(10px);
    }
  }
`;

export { ConfirmationToastWrapper, ConfirmationToastItemContainer };
