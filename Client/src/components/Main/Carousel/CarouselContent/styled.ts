import styled from "styled-components";

export const CarouselItemContainer = styled.li`
  height: 100%;
  width: 100%;
  position: relative;
  display: inline-block;
  /* list-style: none; */
`;

export const ImageWrapper = styled.div<{ isLoaded: boolean }>`
  display: inline-block;
  height: 100%;
  width: 100%;
  position: relative;
  display: inline-block;
  canvas {
    position: relative;
    z-index: var(--zi-m-two);
  }
  img {
    position: absolute;
    top: 0;
    left: 0;
    aspect-ratio: 21/9;
    height: 100%;
    width: 100%;
    object-fit: cover;
    opacity: ${(props) => (props.isLoaded ? "1" : "0")};
    transition: opacity 0.7s ease;
  }
  &:after {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    content: "";
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 70%
    );
    mix-blend-mode: normal;
    opacity: 0.9;
  }
`;

export const CarouselTextWrapper = styled.div`
  padding: 50px;
  position: absolute;
  vertical-align: baseline;
  top: 0;
  height: 100%;
  width: 100%;
  letter-spacing: 0.15rem;
  white-space: pre-wrap;
  display: flex;
  &:hover {
    cursor: default;
  }
`;

export const LeftCarouselTextWrapper = styled.div<{
  isTransitionEnd: boolean;
  textColor: string;
}>`
  margin-top: 255px;
  max-width: 600px;

  h2,
  h3,
  a {
    color: ${(props) => props.textColor};
    opacity: ${(props) => (props.isTransitionEnd ? "1" : "0")};
    transition-property: transform, opacity;
    transition-duration: 1s;
    transition-timing-function: ease;
  }
  h2 {
    transition-delay: 0.1s;
    margin-bottom: 7px;
    margin-left: 30px;
    font-size: 28px;
    transform: ${(props) =>
      props.isTransitionEnd ? "translate(-30px, 0)" : "none"};
  }
  h3 {
    transition-delay: 0.4s;
    font-weight: var(--fw-medium);
    margin-bottom: 8px;
    margin-left: 30px;
    font-size: var(--font-sm);
    font-weight: var(--font-reg);
    word-break: keep-all;
    transform: ${(props) =>
      props.isTransitionEnd ? "translate(-30px, 0)" : "none"};
  }
  a {
    transition-delay: 0.8s;
    transition-timing-function: transform 0.8s cubic-bezier(0.58, 0, 0, 1);
    height: 30px;
    vertical-align: middle;
    margin-top: 30px;
    padding: 8px 15px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(14px);
    border-radius: 50px;
    font-size: var(--font-xs);
    transform: ${(props) =>
      props.isTransitionEnd ? "translate(0, -20px)" : "none"};
    &:hover {
      transition: all 0.3s ease;
      cursor: pointer;
      background-color: hsla(0, 1%, 100%, 0.3);
    }
  }
  .right-arrow {
    height: 10px;
    padding-left: 3px;
    color: var(--purple-200);
  }
`;

export const RightCarouselTextWrapper = styled.div<{
  isTransitionEnd: boolean;
  textColor: string;
}>`
  margin-top: auto;
  margin-left: auto;
  color: ${(props) => props.textColor};
  opacity: ${(props) => (props.isTransitionEnd ? "0.8" : "0")};
  transition-property: transform, opacity;
  transition-duration: 0.7s;
  transition-timing-function: ease;

  span {
    width: 100%;
    display: flex;
    align-items: center;
    color: var(--black-600);
    font-size: var(--font-xs);
    transition: all 1s ease;
    &:hover {
      color: white;
    }
  }

  .location-pin {
    height: 13px;
    width: 50px;
    padding-left: 15px;
  }
`;
