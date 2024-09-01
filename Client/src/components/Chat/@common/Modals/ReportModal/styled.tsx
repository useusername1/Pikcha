import styled from "styled-components";
import { ModalContainer } from "../styled";

const ReportModalContainer = styled(ModalContainer)`
  height: 310px;
  padding: 20px;
  font-size: var(--font-xs);
  .report-user {
    font-weight: var(--fw-bold);
    width: 100%;
    text-align: start;
  }
  .report-content {
    width: 100%;
    text-align: start;
    text-overflow: ellipsis;
    overflow: hidden;
    color: var(--black-700);
    height: 1rem;
  }

  .modal-buttonBox {
    padding: 0 !important;
    button {
      padding: 5px 0;
      width: 48% !important;
    }
  }
`;

const ReportLabel = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  font-size: var(--font-sm);
  font-weight: var(--fw-bold);
  margin-top: 4px;
  color: var(--black-900);
  svg {
    color: red;
    margin-right: 5px;
  }
`;

const ReportForm = styled.form`
  font-size: var(--font-xs);
  width: 100%;
  padding-top: 5px;
  letter-spacing: 0.02rem;
  div {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    margin: 2px;
  }
  .radio-box {
    font-size: var(--font-xs);
    letter-spacing: 0.02rem;
    margin-top: 3px;
    vertical-align: text-top;
    display: flex;
    flex-direction: column;
  }

  textarea {
    font-family: "Pretendard Variable";
    resize: none;
    font-size: var(--font-xs);
    width: 100%;
    border: none;
    background-color: var(--black-200);
    border-radius: var(--br-m);
    margin: 3px 0 6px 0;
    padding: 7px 7px;
    cursor: auto;
    :focus {
      outline: none;
    }
  }
`;

const CheckboxContainer = styled.div`
  input[type="checkbox"] {
    margin: 0 7px 0 0;
    display: none;
  }
  input + label {
    display: inline-block;
    width: 13px;
    height: 13px;
    border-radius: 50%;
    border: 1px solid var(--black-300);
    position: relative;
    margin: 2px 7px 2px 0;
    :hover {
      cursor: pointer;
    }
  }
  input:checked + label::after {
    content: "";
    background-color: var(--reply-borderline);
    font-size: 10px;
    width: 7px;
    height: 7px;
    text-align: center;
    position: absolute;
    border-radius: 50%;
    top: 2px;
    left: 2px;
  }
`;

export { ReportForm, ReportLabel, ReportModalContainer, CheckboxContainer };
