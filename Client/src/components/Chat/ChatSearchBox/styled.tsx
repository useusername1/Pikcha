import styled, { css, keyframes } from "styled-components";

const shake = keyframes`
    0% {
      transform: translate(-52px, 48px);
    }
    50% {
      transform: translate(-58px, 48px);
    }
    100% {
      transform: translate(-55px, 48px);
    }
`;

const slideLeft = keyframes`
    0% {
      opacity: 0.7;
    }
    50%,
    100% {
      opacity: 1;
    }
`;

const ChatSearchBar = styled.input`
  width: 90%;
  height: 40px;
  background-color: var(--black-250);
  color: var(--black-900);
  font-size: var(--font-xs);
  border: none;
  border-radius: var(--br-m);
  margin: 5px 0px;
  padding: 0 40px 0 40px;
  outline: none;
  ::placeholder {
    color: var(--black-500);
  }
  ::selection {
    background-color: var(--black-900);
    color: var(--black-200);
  }
`;

const shakeAnimation = css`
  animation: ${shake} 0.15s 2 linear;
`;
const ChatSearchBarWrapper = styled.div<{
  search_disabled: boolean;
  showGuide: boolean;
  showGuideAnimation: boolean;
}>`
  display: flex;
  justify-content: center;
  svg.search-icon {
    pointer-events: ${(props) => (props.search_disabled ? "none" : "auto")};
    position: absolute;
    left: 30px;
    top: 75px;
    color: var(--black-400);
    width: 20px;
    height: 20px;
    :hover {
      color: var(--purple-300);
    }
  }
  svg.reset-icon {
    position: absolute;
    right: 30px;
    top: 75px;
    color: var(--black-500);
    width: 19px;
    height: 19px;
    :hover {
      color: var(--black-800);
    }
  }
  svg {
    transition: all ease 0.2s;
    :hover {
      cursor: pointer;
    }
  }
  ${ChatSearchBar} {
    border: ${(props) =>
      props.showGuide ? "0.5px solid hsla(352, 100%, 65%, 0.775)" : "none"};
  }
  span {
    position: absolute;
    transform: translate(-55px, 48px);
    font-size: var(--font-xxs);
    color: hsla(352, 100%, 65%, 0.775);
    ${(props) =>
      props.showGuideAnimation ? shakeAnimation : "animation:none"};
  }
`;

const SearchedMessageContainer = styled.div`
  height: 100%;
  overflow-y: scroll;
  border-radius: var(--br-l);
  padding: 0 5px 8px 10px;
  ::-webkit-scrollbar {
    width: 8px;
  }
  ::webkit-scrollbar-gutter {
    scrollbar-gutter: auto;
  }
  ::-webkit-scrollbar-track {
    background-color: transparent;
  }
  ::-webkit-scrollbar-thumb {
    background-color: var(--chatbox-background);
    border-radius: 5px;
  }
  :hover::-webkit-scrollbar-thumb {
    background-color: var(--black-400);
  }
`;

const ChatSearchBoxHeaderDiv = styled.div`
  display: flex;
  align-items: center;
  height: 60px;
  padding: 20px 0;
  svg.close-icon {
    margin-left: auto;
    margin-right: 20px;
    color: var(--black-600);
    height: 22px;
    width: 22px;
    transition: all ease 0.2s;
    :hover {
      cursor: pointer;
      color: var(--purple-300);
    }
  }
`;
const slideLeftAnimation = css`
  animation: ${slideLeft} 0.5s ease;
`;
const SearchBoxWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding-bottom: 5px;
  position: absolute;
  height: 100%;
  width: 80%;
  left: -80%;
  background-color: white;
  border-radius: var(--br-l) 0 0 var(--br-l);
  box-shadow: -5px 2px 10px rgb(0 0 0 / 10%);
  display: flex;
  flex-direction: column;
  ${slideLeftAnimation}
`;
const EmptyChatResultDiv = styled.div`
  color: var(--black-700);
  font-size: var(--font-xs);
  margin-top: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export {
  ChatSearchBar,
  ChatSearchBarWrapper,
  ChatSearchBoxHeaderDiv,
  EmptyChatResultDiv,
  SearchBoxWrapper,
  SearchedMessageContainer,
};
