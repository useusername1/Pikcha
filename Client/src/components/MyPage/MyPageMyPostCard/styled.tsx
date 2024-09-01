import styled from "styled-components";

const MyPagePostCardWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 390px;
  margin-top: 10px;
  gap: 1px 2%;
`;

const MyPagePostCardItemWrapper = styled.div<{
  EditMode: boolean;
  startTransition: boolean;
}>`
  position: relative;
  width: 100%;
  margin: ${(props) => (props.startTransition ? "0" : "3px")};
  border-radius: var(--br-m);
  transition: all 0.5s ease;
  display: flex;
  align-items: center;
  border: ${(props) => (props.startTransition ? "0" : "1px solid white")};
  padding: ${(props) => (props.startTransition ? "0" : "2px 5px")};
  background-color: hsl(230, 60%, 99%);
  height: ${(props) => (props.startTransition ? "0" : "18.3%")};
  transform: ${(props) => (props.startTransition ? "scale(0)" : "none")};
  opacity: ${(props) => (props.startTransition ? "0" : "1")};
  :hover {
    background-color: white;
    box-shadow: 5px 2px 21px 5px rgba(242, 242, 242, 0.57);
  }
  :hover::after {
    display: ${(props) => (props.EditMode ? "block" : "none")};
    position: absolute;
    content: "";
    transform: translateX(-4px);
    z-index: var(--zi-two);
    height: 100%;
    width: 100%;
    border-radius: var(--br-m);
    background: rgba(255, 255, 255, 0.3);
    backdrop-filter: blur(1px);
    -webkit-backdrop-filter: blur(1px);
    border: 1px solid rgba(255, 255, 255, 0.3);
  }
`;
const PostImg = styled.img`
  height: 80%;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 30%;
  margin: 0 12px 0 5px;
  :hover {
    cursor: pointer;
  }
`;
const MyPagePostTextInfoLeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: auto;
  h2 {
    font-size: var(--font-sm) !important;
    font-weight: var(--fw-bold) !important;
    color: var(--black-800) !important;
    letter-spacing: 0.05rem;
    margin-bottom: 7px;
    :hover {
      cursor: pointer;
    }
  }
`;
const MyPagePostTextInfoRightContainer = styled.div`
  font-size: var(--font-xs);
  color: var(--black-700);
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 60%;
  margin-right: 15px;
  span {
  }
  .modifiedAt {
    color: var(--purple-300);
    opacity: 0.8;
  }
`;
const PostTextInfoBottom = styled.div`
  display: flex;
  span {
    font-size: var(--font-xs);
    margin-right: 5px;
    color: var(--black-700);
  }
`;
const IconWrapper = styled.div`
  margin-right: 20px;
  position: relative;
  z-index: var(--zi-three);
  svg {
    color: var(--black-680);
    opacity: 0.9;
    height: 40px;
    width: 23px;

    transition: all 0.3s ease;
    cursor: pointer;
  }
  .edit-icon {
    margin-right: 15px;
    :hover {
      color: black;
    }
  }
  .delete-icon:hover {
    color: red;
    opacity: 0.8;
  }
`;
export {
  MyPagePostCardWrapper,
  PostImg,
  MyPagePostCardItemWrapper,
  MyPagePostTextInfoRightContainer,
  MyPagePostTextInfoLeftContainer,
  PostTextInfoBottom,
  IconWrapper,
};
