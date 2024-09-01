import {
  ModalBackground,
  Container,
  ContainerButton,
  ContainerInfo,
} from "./styled";
import { FcInfo } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isModalVisible } from "../../../recoil/setOverlay";

const LoginModal = () => {
  const navigate = useNavigate();
  const [isModal, setIsModal] = useRecoilState(isModalVisible);
  const HandleLoginModalViewer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsModal(false);
    navigate(`/login`);
  };

  return (
    <>
      {isModal ? (
        <ModalBackground>
          <Container>
            <ContainerInfo>
              <div>
                <FcInfo size="50" />
              </div>
              <div>
                <h3>로그인이 필요한 서비스입니다. </h3>
                <p>로그인 하시겠습니까?</p>
              </div>
            </ContainerInfo>
            <ContainerButton>
              <button onClick={HandleLoginModalViewer}>확인</button>
              <button onClick={() => setIsModal(false)}>취소</button>
            </ContainerButton>
          </Container>
        </ModalBackground>
      ) : null}
    </>
  );
};

export default LoginModal;
