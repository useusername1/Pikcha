import styled from "styled-components";

const TagWrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  align-items: center;
  margin-top: 20px;
  color: #2d2d2d;
  > input {
    width: 200px;
    padding-left: 10px;
    font-size: var(--font-base);
    height: 30px;
    outline: none;
    color: #2d2d2d;
    &::placeholder {
      font-size: 18px;
      font-weight: 500;
    }
  }
`;
export { TagWrapper };
