import * as S from "./styled";
import { FcInfo } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { isLoginModalVisibleAtom } from "~/recoil/modal/atoms";

const LoginModal = () => {
  const navigate = useNavigate();
  const [isLoginModalVisible, setIsLoginModalVisible] = useRecoilState(
    isLoginModalVisibleAtom
  );
  const HandleLoginModalViewer = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoginModalVisible(false);
    navigate(`/login`);
  };

  return (
    <>
      {isLoginModalVisible ? (
        <S.ModalBackground>
          <S.Container>
            <S.ContainerInfo>
              <div>
                <FcInfo size="50" />
              </div>
              <div>
                <h3>로그인이 필요한 서비스입니다. </h3>
                <p>로그인 하시겠습니까?</p>
              </div>
            </S.ContainerInfo>
            <S.ContainerButton>
              <button onClick={HandleLoginModalViewer}>확인</button>
              <button onClick={() => setIsLoginModalVisible(false)}>
                취소
              </button>
            </S.ContainerButton>
          </S.Container>
        </S.ModalBackground>
      ) : null}
    </>
  );
};

export default LoginModal;
