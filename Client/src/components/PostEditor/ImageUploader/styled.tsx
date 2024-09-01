import styled from "styled-components";

const SelectImageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  > img {
    width: 200px;
    height: 200px;
  }
`;
const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin: 30px auto;
  padding: 20px;
  width: 400px;
  height: 300px;
  border: 0.5px solid var(--purple-300);
  background: rgba(255, 255, 255, 0.45);
  border-radius: 25px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(8.5px);
  -webkit-backdrop-filter: blur(8.5px);
  border: 1px solid rgba(255, 255, 255, 0.6);
  input {
    color: var(--purple-400);
    border: none;
    background-color: transparent;
    display: none;
  }
  textarea {
    width: 300px;
    resize: none;
    height: 150px;
    padding: 10px;
    border-radius: var(--br-m);
    border-color: var(--black-500);
    &:focus {
      box-shadow: 0 0 10px var(--purple-300);
      border: 0;
      outline: none;
    }
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    border: none;
    margin-bottom: 20px;
    background-color: var(--black-200);
    border-radius: var(--br-l);
    color: var(--black-700);
    font-weight: var(--fw-bold);
    padding: 10px 0;
    cursor: pointer;
    transition: all 0.5s ease;
    &:hover {
      color: var(--purple-300);
      transform: translateY(-5px);
    }
  }
  svg {
    width: 15px;
    height: 15px;
    margin-left: 5px;
  }
  button:last-child {
    padding-top: 30px;
    background-color: transparent;
  }
`;

const AddButton = styled.button`
  width: 30px;
  height: 30px;
`;

export { SelectImageContainer, ModalContainer, AddButton };
