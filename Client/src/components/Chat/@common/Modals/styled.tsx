import styled from "styled-components";

const ModalWrapper = styled.div`
  position: absolute;
  width: 400px;
  height: 580px;
  border-radius: var(--br-l);
  background-color: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: var(--zi-four);
`;

const ModalContainer = styled.div`
  background-color: white;
  border: none;
  width: 230px;
  border-radius: var(--br-m);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  -webkit-box-shadow: 0px 0px 24px 5px rgba(245, 245, 245, 0.9);
  box-shadow: 0px 0px 24px 5px rgba(245, 245, 245, 0.9);
  div.modal-buttonBox {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-grow: 1;
    padding: 0 10px 0px 10px;
    button {
      border-radius: var(--br-s);
      border: none;
      width: 47%;
      height: 65%;
      font-size: var(--font-xs);
      :hover {
        cursor: pointer;
      }
    }
    button.cancel-button {
      background-color: white;
      border: 0.5px solid var(--black-400);
    }
    button.confirm-button {
      background-color: var(--chat-messagebox);
      color: var(--black-200);
    }
  }
`;

export { ModalWrapper, ModalContainer };
