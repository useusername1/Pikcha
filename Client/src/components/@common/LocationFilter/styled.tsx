import styled from "styled-components";

const SelectContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid var(--black-300);
  display: flex;
  flex-direction: column;
  padding: 20px 20px 18px 21px;
  background-color: transparent;

  > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: var(--black-800);
    font-weight: var(--fw-bold);
    font-size: var(--font-sm);
  }

  > div > button {
    font-weight: var(--fw-bold);
    font-size: var(--font-xs);
    color: var(--purple-300);
    border: none;
    background-color: transparent;
    cursor: pointer;
  }
`;

const SelectBox = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: transparent;
  font-size: var(--font-sm);
  padding-bottom: 15px;
  > div {
    padding: 20px 20px 10px 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  > div > span {
    color: var(--black-800);
    font-weight: var(--fw-bold);
  }
  > div > button {
    background-color: transparent;
    border: none;
    font-size: var(--font-xl);
    cursor: pointer;
    height: 22px;
    svg {
      color: var(--black-680);
    }
  }
  > form {
    display: flex;
    align-items: center;
    padding: 5px 20px 5px 25px;
  }

  form > input {
    margin-right: 10px;
    accent-color: var(--purple-300);
  }

  label {
    color: var(--black-800);
    letter-spacing: 0.05rem;
  }
`;

const SelectPost = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  > li {
    display: flex;
    align-items: center;
    font-size: var(--font-sm);
    padding-top: 12px;
    letter-spacing: 0.05rem;
  }

  > li > button {
    border: none;
    background-color: transparent;
    margin-right: 10px;
    cursor: pointer;
    color: var(--black-600);
    height: 17px;
    svg {
      width: 17px;
      height: 17px;
    }
  }
`;

export { SelectContainer, SelectBox, SelectPost };
