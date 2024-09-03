import styled, { css } from "styled-components";

export const SearchTimeSelectorWrapper = styled.div<{ rightDisabled: boolean }>`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 20px;
  padding: 10px 0;
  font-weight: var(--fw-medium);
  color: var(--black-900);
  svg {
    width: 18px;
    height: 18px;
    color: var(--black-700);
    transition: all ease 0.2s;
    :hover {
      color: var(--purple-300);
      cursor: pointer;
    }
  }
  ${(props) =>
    props.rightDisabled &&
    css`
      svg.forward-icon {
        color: var(--black-400);
        pointer-events: none;
      }
    `}
`;
