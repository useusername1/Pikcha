import styled, { css } from "styled-components";

export const PagenationContainer = styled.nav`
  padding: 40px 0;
  margin: 0 auto;
`;

export const PagenationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 16px;
`;

export const PageButton: any = styled.button<{ selected: boolean }>`
  border: none;
  border-radius: 4px;
  font-size: var(--font-sm);
  color: var(--black-900);
  width: 25px;
  height: 25px;
  line-height: 10px;
  background-color: transparent;
  &:hover {
    line-height: 10px;
    cursor: pointer;
  }
  ${(props) =>
    props.selected &&
    css`
      border: none;
      line-height: 13px;
      background: var(--black-800);
      font-weight: bold;
      cursor: revert;
      color: white;
    `}
  :disabled {
    pointer-events: none;
    color: var(--black-500);
  }
`;
