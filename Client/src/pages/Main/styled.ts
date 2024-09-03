import styled, { keyframes } from "styled-components";

export const GoRight = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(3px);
  }
`;

export const Body = styled.div`
  height: 100%;
  padding: 20px 0 70px 0;
  background-color: hsl(222, 24%, 98%);
`;

export const MainSubTitle = styled.h3`
  font-size: var(--font-xl);
  color: var(--black-900);
  width: 100%;
  margin: 50px 20px 20px 0px;
`;

export const ViewsPlaceContainer = styled.div`
  > div {
    display: flex;
  }
`;

export const ViewsPostContainer = styled.div`
  width: 100%;

  > p {
    cursor: pointer;
    font-weight: bold;
    margin: 30px 0 0 83%;
  }
`;
export const MoreLink = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px 0;
  margin-top: 10px;
  a {
    display: flex;
    align-items: center;
    font-size: var(--font-sm);
    color: var(--black-800);
  }
  svg {
    width: 18px;
    height: 18px;
    padding-left: 5px;
    color: var(--purple-300);
  }
  &:hover {
    svg {
      animation: ${GoRight} 0.2s ease 4 alternate;
    }
  }
`;
export const PlaceCardWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const BodyContent = styled.div`
  margin: 0 auto;
  max-width: 1440px;
  width: 83.5%;
`;
