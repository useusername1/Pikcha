import { lazy, ReactNode, MouseEventHandler } from "react";
import * as S from "./styled";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { UserDataAtomFamily } from "~/recoil/auth";
import { apiClient } from "~/api/axiosInstance";
import Button from "~/components/@common/Button";
import { ReactComponent as Logo } from "~/assets/Logo.svg";
import { storeLocation } from "~/utils/storeLocation";
import useLogout from "~/hooks/useLogout";
const SearchBar = lazy(() => import("./SearchBar"));

const IMG_SRC =
  "https://lh3.googleusercontent.com/pw/AMWts8CEDi2m6IeYf8S0FGfXum-T0_vsJIa1geotAKan_2NzfhOcgYgrtrfd8mjMtVfZ0BCUPDXoUPos9yV5VWgy8eSvzMBs-4jA3Xq0ocmQhpTqPSWQ8lXrK8LsMWISS3vZbZR6Y74ztKYybTTmXQ966bEx=s407-no?authuser=0";

const HeaderTopBar = () => {
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const navigate = useNavigate();
  const { handleLogout } = useLogout();

  const handleLoginClick = () => {
    storeLocation();
    navigate("/login");
  };

  const onClickLogout = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.stopPropagation();
    apiClient
      .post(`/logout`)
      .then((_) => {
        handleLogout();
      })
      .catch((err) => console.error(err));
  };

  return (
    <S.HeaderTop>
      <S.HeaderTopMenu>
        {isLogin ? (
          <>
            <li>
              <Button
                width="70px"
                height="1px"
                text="마이페이지"
                type="none"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate("/mypage");
                }}
              ></Button>
            </li>
            <li>
              <Button
                width="50px"
                height="1px"
                text="로그아웃"
                type="none"
                onClick={onClickLogout}
              ></Button>
            </li>
          </>
        ) : (
          <li>
            <Button
              width="100px"
              height="1px"
              text="로그인 / 회원가입"
              type="none"
              onClick={handleLoginClick}
            ></Button>
          </li>
        )}
      </S.HeaderTopMenu>
    </S.HeaderTop>
  );
};
interface HeaderBodyProps {
  searchBarOn?: boolean;
  defaultValue?: string;
  backgroundOn?: boolean;
  isSuggetionVisible?: boolean;
  selectedMenu?: number;
}
const HeaderBodyBar = ({
  searchBarOn = true,
  defaultValue = "",
  backgroundOn = true,
  selectedMenu = -1,
}: HeaderBodyProps) => {
  const islogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const navigate = useNavigate();

  return (
    <S.HeaderBodyWrapper backgroundOn={backgroundOn}>
      <S.HeaderBody>
        <Link
          to="/"
          style={{ height: "70px", display: "flex", alignItems: "center" }}
        >
          <Logo style={{ width: "80px", height: "50px" }} />
        </Link>
        <S.HeaderBodyMenu>
          <S.HeaderBodyMenuItem
            onClick={() => navigate("/attractions")}
            selected={selectedMenu === 0}
          >
            명소
          </S.HeaderBodyMenuItem>
          <S.HeaderBodyMenuItem
            onClick={() => navigate("/posts")}
            selected={selectedMenu === 1}
          >
            포스트
          </S.HeaderBodyMenuItem>
          <S.HeaderBodyMenuItem
            onClick={() => navigate("/map")}
            selected={selectedMenu === 2}
          >
            내 주변 명소 찾기
          </S.HeaderBodyMenuItem>
        </S.HeaderBodyMenu>
        {searchBarOn && (
          <S.SearchBarWrapper>
            <SearchBar defaultValue={defaultValue} />
          </S.SearchBarWrapper>
        )}
        {islogin && (
          <S.Profile onClick={() => navigate("/mypage")}>
            <img src={IMG_SRC} alt="profile" />
          </S.Profile>
        )}
      </S.HeaderBody>
    </S.HeaderBodyWrapper>
  );
};
interface HeaderMainProps {
  children?: ReactNode;
  mouseOverHandler?: MouseEventHandler<HTMLElement>;
  mouseOutHandler?: MouseEventHandler<HTMLElement>;
  isVisible?: boolean;
  headerColor?: string;
  ref?: React.RefObject<HTMLHeadElement>;
}
const HeaderMain = ({
  children,
  mouseOverHandler,
  mouseOutHandler,
  isVisible = true,
  headerColor,
}: HeaderMainProps) => {
  return (
    <S.HeaderWrapper
      onMouseEnter={mouseOverHandler}
      onMouseLeave={mouseOutHandler}
      isVisible={isVisible}
      headerColor={headerColor}
    >
      {children}
    </S.HeaderWrapper>
  );
};
export const Header = Object.assign(HeaderMain, {
  HeaderTop: HeaderTopBar,
  HeaderBody: HeaderBodyBar,
});
