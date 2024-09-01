import { FlashingDot, FlashingDotWrapper } from "./styled";

const FlashingDots = () => {
  return (
    <FlashingDotWrapper>
      <FlashingDot>
        <div>
          <FlashingDot />
        </div>
      </FlashingDot>
    </FlashingDotWrapper>
  );
};
export default FlashingDots;
