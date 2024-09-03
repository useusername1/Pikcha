import styled from "styled-components";

export const CarouselWrapper = styled.div`
  overflow: hidden;
  position: relative;
`;
export const CarouselContentListContainer = styled.ul<{
  currentPhotoNum: number;
  transitionOn: boolean;
}>`
  transform: ${(props) => `translateX(-${props.currentPhotoNum}00%)`};
  transition: ${(props) =>
    props.transitionOn ? "transform 0.5s ease" : "none"};
  height: 480px;
  list-style: none;
  white-space: nowrap;
`;

export const CarouselControlContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
  position: absolute;
  transform: translate(50px, -430px);

  svg {
    padding: 3px;
    width: 20px;
    height: 20px;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: var(--br-s);
    transition: opacity 0.3s;
    color: var(--black-250);
    transition: all 0.2s ease;
    &:hover {
      cursor: pointer;
      background-color: hsla(0, 1%, 100%, 0.3);
    }
  }
`;
export const RangeSliderContainer = styled.div<{ currentPhoto: number }>`
  width: 250px;
  height: 0.3px;
  background-color: rgba(255, 255, 255, 0.1);
  position: absolute;
  left: calc(50% - 125px);
  bottom: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: width 0.5s ease;
`;
export const SliderDot = styled.span<{ currentDot: boolean }>`
  width: ${(props) => (props.currentDot ? "30px" : "7px")};
  height: 7px;
  transition: all 0.7s ease;
  background-color: ${(props) =>
    props.currentDot ? "var(--purple-300)" : "rgba(255, 255, 255, 0.3)"};
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(14px);
  opacity: 0.9;
  border-radius: 50px;

  :hover {
    cursor: pointer;
    background-color: white;
    opacity: 0.7;
  }
  :after {
    content: "";
    position: absolute;
    width: 14px;
    height: 14px;
  }
`;
