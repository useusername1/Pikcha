import { apiClient } from "~/api/axiosInstance";
import { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import EmptyResult from "~/components/@common/EmptyResult";
import Footer from "~/components/@common/Footer";
import { ScrollResponsiveHeader } from "~/components/@common/Header";
import KakaoMap from "~/components/@common/KakaoMap";
import Pagination from "~/components/@common/Pagination";
import PostCardComponent from "~/components/@common/PostCard";
import { FloatingMenu } from "~/components/DetailPlace";
import { UserDataAtomFamily } from "~/recoil/auth";
import {
  detailPlaceDataAtom,
  isDetailPlaceBookmarkedAtom,
  isDetailPlaceLikedAtom,
} from "~/recoil/detailPlace/atoms";
import { isLoginModalVisibleAtom } from "~/recoil/modal/atoms";
import * as S from "./styled";
import { FaMapMarkerAlt as MarkIcon } from "react-icons/fa";
import { ArrayPostType } from "~/@types/post.types";
import { PageInfoType } from "~/@types/page.types";

const DetailPlace = (): JSX.Element => {
  let [view, setView] = useState<string>("info");
  const [fixBar, setFixBar] = useState(0);
  const [postData, setPostData] = useState<ArrayPostType>();
  const [curPage, setCurPage] = useState(1);
  const [attractionData, setAttractionData] =
    useRecoilState(detailPlaceDataAtom); // 명소 정보 저장
  const isLoggedIn = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const memberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);
  const setIsLoginModalVisible = useSetRecoilState(isLoginModalVisibleAtom);
  const setIsDetailPlaceBookmarked = useSetRecoilState(
    isDetailPlaceBookmarkedAtom
  );
  const setIsDetailPlaceLiked = useSetRecoilState(isDetailPlaceLikedAtom);
  const scrollRefContent = useRef<HTMLDivElement>(null);
  const totalInfoRef = useRef<PageInfoType | null>(null);

  const { attractionId } = useParams();
  const url = `/attractions/${attractionId}`;
  const url2 = `/attractions/${attractionId}/${memberId}`;
  const url3 = `/posts/${attractionId}?page=${curPage}&size=8`;
  const url4 = `/posts/${attractionId}/${memberId}?page=${curPage}&size=8`;
  const ATTRACTIONS_URL = isLoggedIn ? url2 : url;
  const POSTS_URL = isLoggedIn ? url4 : url3;
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get(ATTRACTIONS_URL).then((res) => {
      setAttractionData(res.data.data);
      setIsDetailPlaceLiked(res.data.data.isVoted);
      setIsDetailPlaceBookmarked(res.data.data.isSaved);
    });
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [ATTRACTIONS_URL]);

  useEffect(() => {
    apiClient.get(POSTS_URL).then((res) => {
      setPostData(res.data.data);
      totalInfoRef.current = res.data.pageInfo;
    });
  }, [POSTS_URL]);

  const onScroll = () => {
    if (window.scrollY <= 700) {
      setTimeout(function () {
        setView("info");
      }, 2000);
    }
  };

  const updateScroll = () => {
    setFixBar(window.scrollY || document.documentElement.scrollTop);
  };

  const handleScroll = () => {
    onScroll();
    updateScroll();
  };

  const handleView = (setting: string) => {
    setView(setting);
    if (view === "info" && setting === "post") {
      scrollRefContent?.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handlePostButtonClick = () => {
    if (!isLoggedIn) {
      setIsLoginModalVisible(true);
      return;
    }
    navigate(`/write/${attractionId}`);
  };

  return (
    <>
      <ScrollResponsiveHeader />
      {attractionData && (
        <>
          <S.ImageBox>
            <img src={attractionData!.fixedImage} alt="배경이미지"></img>
          </S.ImageBox>
          <FloatingMenu
            inverted={fixBar < 470}
            handlePostButtonClick={handlePostButtonClick}
            onModalVisible={setIsLoginModalVisible}
          />
          <S.NavBar>
            <button
              className={view === "info" ? "active" : ""}
              onClick={() => {
                handleView("info");
              }}
            >
              상세페이지
            </button>
            <button
              className={view === "post" ? "active" : ""}
              onClick={() => {
                handleView("post");
              }}
            >
              포스트
            </button>
          </S.NavBar>
          <S.Container>
            <h2>{attractionData?.attractionName}</h2>
            <p>{attractionData?.attractionDescription}</p>
            <S.LocationInfoContainer>
              <h3>위치 안내</h3>
              <p>
                <MarkIcon className="mark-icon"></MarkIcon>
                {attractionData!.attractionAddress}
              </p>
              <KakaoMap
                width="60%"
                height="320px"
                dataList={attractionData!.attractionAddress}
                position="relative"
                left="20%"
                regionFilter="null"
                component="place"
                dataset=""
                modalData="ex"
                setFilterOrPosition="11"
                filterOrPosition="11"
              ></KakaoMap>
            </S.LocationInfoContainer>
          </S.Container>
          <S.PostWrapper>
            <S.Post ref={scrollRefContent}>
              <S.PostHeader>
                <h2>포스트</h2>
                <button onClick={handlePostButtonClick}>포스트 작성</button>
              </S.PostHeader>
              <S.PostCardListWrapper>
                {postData?.length ? (
                  <PostCardComponent
                    posts={postData}
                    margin="0%"
                    width="24%"
                  ></PostCardComponent>
                ) : (
                  <EmptyResult message="해당 명소에 등록된 포스트가 없습니다" />
                )}
              </S.PostCardListWrapper>
              {!!postData?.length && (
                <Pagination
                  props={totalInfoRef.current as PageInfoType}
                  setCurPage={setCurPage}
                />
              )}
            </S.Post>
          </S.PostWrapper>
        </>
      )}
      <Footer />
    </>
  );
};

export default DetailPlace;
