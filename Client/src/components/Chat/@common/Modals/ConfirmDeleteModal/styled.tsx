import styled from "styled-components";
import { ModalContainer } from "../styled";

const DeleteModalContainer = styled(ModalContainer)`
  height: 130px;
  padding: 8px;
  div.modal-subject {
    padding: 0 15px;
    width: 100%;
    display: flex;
    align-items: center;
    flex-grow: 0.8;
    font-weight: var(--fw-bold);
    color: var(--black-800);
    letter-spacing: 0.05rem;
    font-size: var(--font-sm);
    svg {
      width: 15px;
      color: var(--black-800);
    }
  }
  div.modal-content {
    font-size: var(--font-xs);
    flex-grow: 0.3;
    color: var(--black-700);
    letter-spacing: 0.02rem;
  }
`;

export { DeleteModalContainer };
