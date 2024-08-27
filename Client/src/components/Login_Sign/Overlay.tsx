import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { setOverlay } from "../../recoil/setOverlay";
import * as o from "./LoginSignStyle";
import { ReactComponent as Logo } from "../../assets/Logo.svg";
interface OverlayProps {
  direction: "left" | "right";
}
const imageUrl =
  "https://lh3.googleusercontent.com/d/1G4EUcTwL5eH9r-lGmrV3bohOtomnTBW6";

const Overlay = ({ direction }: OverlayProps) => {
  const overlays = useRecoilValue<boolean>(setOverlay);
  const navigate = useNavigate();

  return (
    <o.StyledOverlay overlay={overlays} isLeft={direction === "left"}>
      <img src={imageUrl}></img>
      <o.LogoContainer>
        <Logo
          style={{ width: "80px", height: "50px" }}
          onClick={() => navigate("/")}
        />
      </o.LogoContainer>
    </o.StyledOverlay>
  );
};
export default Overlay;
