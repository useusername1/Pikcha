import styled from "styled-components";

export const SinUpSideWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: var(--br-m);
`;
export const CloseButton = styled.button`
  z-index: 100;
  background-color: white;
  font-size: 25px;
  right: 1.6em;
  bottom: 7em;
  color: var(--black-700);
  position: relative;
  border: none;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #c3c3c3;
  }
`;

export const BottomTextContainer = styled.div`
  display: flex;
`;
