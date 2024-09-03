import * as S from "./styled";

const FlashingDots = () => {
  return (
    <S.FlashingDotWrapper>
      <S.FlashingDot>
        <div>
          <S.FlashingDot />
        </div>
      </S.FlashingDot>
    </S.FlashingDotWrapper>
  );
};
export default FlashingDots;
