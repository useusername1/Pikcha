import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import DaumPostcode from "react-daum-postcode";
import Button from "~/components/@common/Button";
import { HiddenHeader } from "~/components/@common/Header";
import UnavailableNotice from "~/components/@common/UnavailableNotice";
import { MyPageMyPostCard, MyPageMyFavoriteCard } from "~/components/MyPage";
import { UserDataAtomFamily } from "~/recoil/auth";
import {
  isMyPageDeleteModeAtom,
  myPageUserDataAtom,
  isMypageEditModeAtom,
} from "~/recoil/mypage/atoms";
import { AiTwotoneHome, AiOutlineCloseCircle } from "react-icons/ai";
import { BsFillBookmarkFill } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { MdModeComment } from "react-icons/md";
import { TfiPencil } from "react-icons/tfi";
import { IoChevronBackOutline as BackIcon } from "react-icons/io5";
import * as S from "./styled";
import { apiClient } from "~/api/axiosInstance";

const MyPage = () => {
  const [tab, setTab] = useState(0);
  const [isEdit, setIsEdit] = useState(false);
  const [openPostcode, setOpenPostcode] = useState<boolean>(false);
  const [inputs, setInputs] = useState({
    username: "",
    address: "",
    phoneNumber: "",
  });
  const [isDeleteMode, setIsDeleteMode] = useRecoilState(
    isMyPageDeleteModeAtom
  );
  const [userData, setUserData] = useRecoilState(myPageUserDataAtom);
  const [isEditMode, setIsEditMode] = useRecoilState(isMypageEditModeAtom);
  const [memberId, setMemberId] = useRecoilState(UserDataAtomFamily.MEMBER_ID);
  const setLoggedUser = useSetRecoilState(UserDataAtomFamily.LOGGED_USER);
  const setIsLogin = useSetRecoilState(UserDataAtomFamily.LOGIN_STATE);
  const setAuth = useSetRecoilState(UserDataAtomFamily.AUTH_TOKEN);
  const navigate = useNavigate();

  const { username, address, phoneNumber } = inputs;

  if (userData?.saves.length === 0) {
    setIsDeleteMode(false);
  }
  const getUserProfile = async () => {
    await apiClient
      .get(`/users/profile/${memberId}`)
      .then(({ data: { data } }) => {
        setUserData(data);
        const { username, address, phoneNumber } = data;
        setInputs({
          username,
          address,
          phoneNumber,
        });
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getUserProfile();
    return () => setIsDeleteMode(false);
  }, [memberId]);

  const handleTabMenuBar = (
    e: React.MouseEvent<HTMLButtonElement>,
    idx: number
  ) => {
    e.preventDefault();
    setTab(idx);
    setIsDeleteMode(false);
    setIsEditMode(false);
  };

  const editInfoSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    apiClient
      .patch(`/users/edit/${memberId}`, {
        username: username,
        phoneNumber: phoneNumber,
        address: address,
      })
      .then((res) => {
        if (res.status === 200) setIsEdit(false);
        window.location.replace("/mypage");
      })
      .catch((err) => console.error(err));
  };
  const deleteUser = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (window.confirm("정말 탈퇴하시겠습니까?")) {
      apiClient
        .delete(`/users/delete/${memberId}`)
        .then((res) => {
          if (res.status === 200) {
            setIsLogin(false);
            setAuth(null);
            setLoggedUser(null);
            setMemberId(null);
            alert("탈퇴가 완료되었습니다.");
            navigate(`/`);
          }
        })
        .catch((err) => console.error(err));
    }
  };

  const handleBookMarkDeleteClick = () => {
    setIsDeleteMode((p) => !p);
  };
  const handleEditPostList = () => {
    setIsEditMode((p) => !p);
  };
  const tabMenuBarList = [
    {
      title: (
        <>
          <MdModeComment />
          <span>나의 포스트</span>
        </>
      ),
      content: (
        <>
          {userData && userData.totalMyPosts ? (
            <>
              <S.MyPageMainTopBar>
                <span>
                  <strong>{userData && userData.totalMyPosts}</strong> 개의
                  포스트
                </span>
                <S.EditButton
                  isEditMode={isEditMode}
                  className="edit-posts"
                  onClick={handleEditPostList}
                >
                  {isEditMode ? `편집 완료` : `편집`}
                </S.EditButton>{" "}
              </S.MyPageMainTopBar>
              <MyPageMyPostCard posts={userData.posts} limit={5} />
            </>
          ) : (
            <UnavailableNotice
              type="NO_CONTENT"
              message=" 등록한 포스트가 없습니다"
            />
          )}
        </>
      ),
    },
    {
      title: (
        <>
          <BsFillBookmarkFill />
          <span>나의 즐겨찾기</span>
        </>
      ),
      content: (
        <>
          {userData && userData.totalMySaves ? (
            <>
              <S.MyPageMainTopBar>
                <span>
                  <strong>{userData && userData.totalMySaves}</strong> 개의
                  즐겨찾기
                </span>
                <S.DeleteButton
                  isDeleteMode={isDeleteMode}
                  className="delete-bookmark"
                  onClick={handleBookMarkDeleteClick}
                >
                  {isDeleteMode ? "삭제 완료" : "삭제"}
                </S.DeleteButton>{" "}
              </S.MyPageMainTopBar>
              <MyPageMyFavoriteCard saves={userData.saves} limit={6} />
            </>
          ) : (
            <UnavailableNotice
              type="NO_CONTENT"
              message="즐겨찾기한 명소가 없습니다"
            />
          )}
        </>
      ),
    },
    {
      title: (
        <>
          <AiTwotoneHome />
          <span>나의 방문 기록</span>
        </>
      ),
      content: (
        <div style={{ height: "100%" }}>
          {/* <div>님의 방문기록 입니다.</div> */}
          <UnavailableNotice type="NOT_FOUND" message="준비중입니다" />
          {/* <Charts userData={userData}></Charts> */}
        </div>
      ),
    },
  ];

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleAddress = {
    clickInput: () => {
      setOpenPostcode(!openPostcode);
    },
    selectAddress: (data: any) => {
      setInputs({
        username: username,
        address: data.address,
        phoneNumber: phoneNumber,
      });
      setOpenPostcode(false);
    },
  };

  return (
    <>
      <HiddenHeader selectedMenu={-1} />
      <S.MyPageWrapper>
        <S.MyPageTabBarContainer>
          {tabMenuBarList.map((menu, idx) => (
            <S.MyPageTabBarMenu
              key={idx}
              onClick={(e) => handleTabMenuBar(e, idx)}
              className={tab === idx ? "onToggle" : ""}
            >
              {menu.title}
            </S.MyPageTabBarMenu>
          ))}
        </S.MyPageTabBarContainer>
        {userData && (
          <S.MyPageContainer>
            <S.MyPageUserInfo>
              <form>
                <S.LogoContainer>
                  <span onClick={() => navigate("/")}>
                    <BackIcon />
                    홈으로 돌아가기
                  </span>
                </S.LogoContainer>
                <img src={userData.picture} alt="" />
                <div>
                  {isEdit ? (
                    <input
                      name="username"
                      type="text"
                      defaultValue={userData.username}
                      placeholder="이름"
                      onChange={(e) => onChange(e)}
                    />
                  ) : (
                    <>
                      {userData.username}{" "}
                      <TfiPencil onClick={() => setIsEdit(true)} />
                    </>
                  )}
                </div>
                <div>{userData.memberTitle}</div>
                <div>
                  {isEdit ? (
                    <input
                      name="address"
                      type="text"
                      value={address}
                      placeholder="주소" //체크체크
                      onClick={handleAddress.clickInput}
                      onChange={(e) => onChange(e)}
                      readOnly
                    />
                  ) : (
                    <>
                      <FaMapMarkerAlt /> {userData.address}
                    </>
                  )}
                </div>
                <div>{userData.email}</div>
                <div>
                  {isEdit ? (
                    <input
                      name="phoneNumber"
                      type="text"
                      value={phoneNumber}
                      placeholder="전화번호"
                      onChange={(e) => onChange(e)}
                    />
                  ) : (
                    <>{userData.phoneNumber}</>
                  )}
                </div>
                {isEdit ? (
                  <S.EditSubmitButton onClick={(e) => editInfoSubmit(e)}>
                    완료
                  </S.EditSubmitButton>
                ) : null}
              </form>
              <Button
                type="enabledGray"
                width="75px"
                height="35px"
                text="회원 탈퇴"
                onClick={deleteUser}
                margin="0"
                fontsize="var(--font-xs)"
              />
            </S.MyPageUserInfo>
            <S.MyPageMainContainer>
              {openPostcode && (
                <>
                  <S.CloseButton onClick={handleAddress.clickInput}>
                    <AiOutlineCloseCircle />
                  </S.CloseButton>
                  <DaumPostcode
                    style={{
                      // display: "block",
                      position: "absolute",
                      width: "30%",
                      height: "50%",
                      zIndex: 100,
                    }}
                    onComplete={handleAddress.selectAddress} // 값을 선택할 경우 실행되는 이벤트
                    autoClose={false} // 값을 선택할 경우 사용되는 DOM을 제거하여 자동 닫힘 설정
                    defaultQuery="" // 팝업을 열때 기본적으로 입력되는 검색어
                  />
                </>
              )}
              <div>{tabMenuBarList[tab].content}</div>
            </S.MyPageMainContainer>
          </S.MyPageContainer>
        )}
      </S.MyPageWrapper>
    </>
  );
};

export default MyPage;
