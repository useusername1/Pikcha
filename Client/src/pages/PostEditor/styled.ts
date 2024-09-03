import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #fcfcfc;
`;

export const WritePostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 45%;
`;

export const WritePostContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 40px;
  input {
    padding-left: 10px;
    width: 80%;
    border: none;
    outline: none;
    font-size: 25px;
    font-weight: var(--fw-bold);
    background-color: transparent;
    &:focus {
      border-color: transparent;
    }
    &::placeholder {
      font-size: 30px;
      font-weight: var(--fw-bold);
    }
  }
  hr {
    margin-top: 10px;
    height: 1px;
    border: 0;
    background: #b8b8b8;
  }
  div:first-child {
    display: flex;
    justify-content: space-between;
  }
`;

export const PreviewContainer = styled.div`
  width: 55%;
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #f0f0f0;
  padding: 10px 40px;
  word-break: break-all;
  div:first-child {
    h2 {
      margin-top: 5px;
      margin-bottom: 25px;
      height: 44px;
    }
    button {
      margin-right: 10px;
    }
  }
`;

export const PreviewContentContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  width: 100%;
  background-color: #fcfcfc;
  > div:nth-child(1) {
    width: 45%;
    height: 100%;
    padding: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  > div:nth-child(2) {
    width: 55%;
    background-color: #f0f0f0;
    padding: 20px;
    font-size: 20px;
    font-weight: var(--fw-bold);
  }
`;

export const PreviewImgContainer = styled.div`
  width: 100%;
  height: 350px;
  overflow: scroll;

  > img {
    width: 100%;
  }
`;

export const PreviewTextContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 4rem;
`;

export const HandleBackAndSubmitContainer = styled.div`
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--black-200);
  position: fixed;
  bottom: 0;
  width: 45%;
  height: 60px;
  box-shadow: 0 -5px 3px -5px #adadad;
  svg {
    font-size: var(--font-xxxl);
    :hover {
      cursor: pointer;
      color: var(--black-600);
    }
  }
`;
