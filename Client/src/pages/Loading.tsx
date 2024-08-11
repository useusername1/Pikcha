import styled from "styled-components";
import BeatLoader from "react-spinners/FadeLoader";

const Loading = () => {
  return (
    <LoadingSpinnerContainer>
      <BeatLoader color="var(--black-500)" />
    </LoadingSpinnerContainer>
  );
};

const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;
export default Loading;
