import { CgClose } from "react-icons/cg";
import { Dispatch, SetStateAction } from "react";
import writeGuideGif from "~/assets/WriteGuide.gif";
import * as S from "./styled";

const WritingGuide = ({
  setIsWriteGuideModal,
}: {
  setIsWriteGuideModal: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <>
      <S.WriteGuideModalBackground>
        <S.WriteGuideModalWrapper>
          <S.WriteGuideModalContainer>
            <S.WriteGuideModalGuideText>
              <p>하나 이상의 이미지를 꼭 등록해주세요.</p>
              <CgClose
                cursor="pointer"
                size="25px"
                onClick={() => setIsWriteGuideModal(false)}
              />
            </S.WriteGuideModalGuideText>
            <img src={writeGuideGif} />
          </S.WriteGuideModalContainer>
        </S.WriteGuideModalWrapper>
      </S.WriteGuideModalBackground>
    </>
  );
};

export default WritingGuide;
