import styled from "styled-components";

const TagBox = styled.span`
  display: flex;
  align-items: center;
  padding: 5px 7px;
  background-color: var(--purple-tag);
  color: var(--purple-400);
  font-weight: var(--fw-bold);
  box-shadow: 0 0 5px var(--purple-200);
  border-radius: var(--br-l);
  margin: 0 10px;
  font-size: var(--font-sm);
  &:hover {
    background-color: var(--purple-300);
    color: var(--purple-tag);
  }
`;

export { TagBox };
