import styled from "styled-components";

export const HiddenHeaderBodyWrapper = styled.header<{
  isVisible: boolean;
}>`
  width: 100%;
  position: fixed;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(15px);
  box-shadow: 0 3px 32px 0 rgba(180, 180, 180, 0.1);
  -webkit-backdrop-filter: blur(11.5px);
  margin: 0 auto;
  left: 0;
  transition: all 0.8s ease;
  transform: ${(props) =>
    props.isVisible ? "translate(0,28px)" : "translate(0,-42px)"};
`;
export const HiddenHeaderTopWrapper = styled.div<{ isVisible: boolean }>`
  height: 28px;
  position: relative;
  z-index: var(--zi-four);
  width: 100%;
  margin: 0 auto;
  background-color: var(--black-200);
  svg.arrow-down {
    transition: all 0.5s ease-in-out;
    transform-origin: center;
    transform: ${(props) =>
      props.isVisible
        ? "translateY(-150%) rotate( -180deg) "
        : "translateY(-150%)"};
    z-index: var(--zi-four);
    position: absolute;
    left: calc(50% - 8px);
    color: var(--purple-300);
    ::after {
      content: "";
      width: 50px;
      height: 30px;
      background-color: var(--grey-background);
    }
  }
  :hover {
    cursor: pointer;
  }
`;
