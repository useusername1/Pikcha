import styled from "styled-components";

const FavoriteCardContainer = styled.div<{
  isDeleteMode: boolean;
  startAnimation: boolean;
}>`
  position: relative;
  height: 185px;
  background-color: white;
  border-radius: var(--br-m);
  transition: all 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box !important;
  border: ${(props) =>
    props.startAnimation ? "0" : "1px solid var(--black-275)"};
  margin: ${(props) => (props.startAnimation ? "10px 0 0" : "10px 3px 0 3px")};
  padding: ${(props) => (props.startAnimation ? "0" : "5px")};
  width: ${(props) => (props.startAnimation ? "0" : "32%")};
  transform: ${(props) => (props.startAnimation ? "scale(0)" : "none")};
  opacity: ${(props) => (props.startAnimation ? "0" : "1")};
  overflow: hidden;
  svg {
    position: absolute;
    transform: translateY(50px);
    display: none;
    color: var(--black-900);
    opacity: 0.9;
    height: 80px;
    width: 40px;
    z-index: var(--zi-three);
    transition: all 0.3s ease;
    :hover {
      color: red;
      cursor: pointer;
    }
  }
  :hover::after {
    display: ${(props) => (props.isDeleteMode ? "block" : "none")};
    position: absolute;
    content: "";
    z-index: var(--zi-two);
    bottom: 0;
    left: 0;
    height: 182px;
    width: 100%;
    border-radius: var(--br-m);
    background: rgba(255, 255, 255, 0.5);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
  :hover {
    box-shadow: 5px 2px 21px 5px rgba(242, 242, 242, 0.57);
    svg {
      display: ${(props) => (props.isDeleteMode ? "block" : "none")};
    }
  }
`;

const AttractionImage = styled.img`
  margin-top: 8px;
  object-fit: cover;
  width: 90%;
  height: 60%;
  aspect-ratio: 4/3;
  border-radius: 2px;
  margin-bottom: 2px;
  :hover {
    cursor: pointer;
  }
`;

const AttractionTextInfo = styled.div`
  width: 90%;
  padding: 5px 0;
  color: var(--black-900);
  display: flex;
  span {
    display: inline-flex;
    align-items: center;
    padding: 4px 10px;
    font-size: var(--font-xs);
    margin: 4px 8px 4px 0;
    color: var(--black-700);
    border-radius: 10px;
    border: 1px solid var(--black-250);
    background-color: var(--black-200);
    strong {
      color: var(--black-700);
      font-weight: var(--fw-medium);
      margin-left: 3px;
    }
  }
  h3 {
    display: inline;
    font-size: var(--font-sm);
    font-weight: 700;
    letter-spacing: 0.05rem;
    color: var(--black-800);
    margin-left: 5px;
    :hover {
      cursor: pointer;
    }
  }
`;
export { FavoriteCardContainer, AttractionImage, AttractionTextInfo };
