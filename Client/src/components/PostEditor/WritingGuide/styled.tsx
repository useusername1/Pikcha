import styled from "styled-components";

const WriteGuideModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 1000;
`;

const WriteGuideModalWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const WriteGuideModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  img {
    width: 35rem;
  }
`;

const WriteGuideModalGuideText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  p {
    font-size: var(--font-md);
    font-weight: var(--fw-bold);
    color: #585ac6;
  }
`;
export {
  WriteGuideModalBackground,
  WriteGuideModalWrapper,
  WriteGuideModalContainer,
  WriteGuideModalGuideText,
};
