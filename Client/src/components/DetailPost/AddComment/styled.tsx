import styled from "styled-components";

const AddCommentWrapper = styled.form<{ isLogin: boolean }>`
  margin: 35px auto 50px;
  width: 80%;
  > h3 {
    margin-left: 7%;
    font-size: var(--fw-reg);
    color: var(--black-800);
  }

  > div {
    width: 94%;
    margin: 22px 30% 0 58px;
    display: flex;
  }
  > div > img {
    width: 40px;
    height: 40px;
    border-radius: var(--br-l);
    margin: 0 14px 0 30px;
  }
  > div > textarea {
    border-color: #c6c6c6;
    width: 90%;
    height: 150px;
    padding: 10px;
    border-radius: var(--br-m);
    resize: none;
    margin-bottom: 30px;
  }
  button {
    position: relative;
    top: 8em;
    right: 6.2em;
  }
`;

export { AddCommentWrapper };
