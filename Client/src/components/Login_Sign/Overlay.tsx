import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { setOverlay } from "../../recoil/setOverlay";
import * as o from "./LoginSignStyle";
import { ReactComponent as Logo } from "../../data/Logo.svg";
interface OverlayProps {
  direction: "left" | "right";
}
const Overlay = ({ direction }: OverlayProps) => {
  const overlays = useRecoilValue<boolean>(setOverlay);
  const navigate = useNavigate();

  return (
    <o.StyledOverlay overlay={overlays} isLeft={direction === "left"}>
      <img src={process.env.PUBLIC_URL + "loginImage.jpg"}></img>
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
