import styled from "styled-components";

export const Tooltip = styled.span`
  position: absolute;
  display: block;
  transform: translate(-25%);
  opacity: 0;
  transition: all ease 0.1s;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  font-weight: var(--fw-medium);
  font-size: var(--font-xxs);
  padding: 5px;
  border-radius: var(--br-s);
`;

export const ChatControllWrapper = styled.div`
  margin-left: auto;
  margin-right: 12px;
  display: flex;
  span.tooltip-iconwrapper {
    color: var(--black-900);
    margin: 0 7px;
    display: inline-block;
    vertical-align: middle;
    :hover {
      cursor: pointer;
    }
  }
  .search-icon {
    height: 22px;
    width: 20px;
  }
  .out-icon {
    height: 22px;
    width: 20px;
  }
  .window-icon {
    width: 20px;
  }
  span:hover ${Tooltip} {
    opacity: 1;
  }
`;

export const ChatHeaderWrapper = styled.div<{ showSearchBox: boolean }>`
  position: sticky;
  height: 60px;
  border-radius: ${(props) =>
    props.showSearchBox ? "0 var(--br-l) 0 0" : "var(--br-l) var(--br-l) 0 0"};
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--black-275);
  background-color: white;
  padding-top: 1px;
  z-index: var(--zi-four);
`;

export const ChatInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    margin-top: 2px;
  }
  div {
    font-size: var(--font-xs);
    color: var(--black-700);
    margin-top: 4px;
    span {
      color: var(--black-900);
    }
  }
`;

export const LogoIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  padding: 5px;
  border-radius: 50%;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 14px 10px 14px 20px;
  svg {
    height: 20px;
    path {
      fill: white;
    }
  }
`;
