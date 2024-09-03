import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { isOverlayLeftAtom } from "~/recoil/loginSignUp/atoms";
import * as S from "./styled";
import { ReactComponent as Logo } from "~/assets/Logo.svg";
interface OverlayProps {
  direction: "left" | "right";
}
const imageUrl =
  "https://lh3.googleusercontent.com/d/1G4EUcTwL5eH9r-lGmrV3bohOtomnTBW6";

const Overlay = ({ direction }: OverlayProps) => {
  const isOverlayLeft = useRecoilValue<boolean>(isOverlayLeftAtom);
  const navigate = useNavigate();

  return (
    <S.StyledOverlay overlay={isOverlayLeft} isLeft={direction === "left"}>
      <img src={imageUrl}></img>
      <S.LogoContainer>
        <Logo
          style={{ width: "80px", height: "50px" }}
          onClick={() => navigate("/")}
        />
      </S.LogoContainer>
    </S.StyledOverlay>
  );
};
export default Overlay;
