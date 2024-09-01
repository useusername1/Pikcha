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
  AttractionDataState,
  BookmarkSavesState,
  LikesState,
} from "~/recoil/placeDetailState";
import { isModalVisible } from "~/recoil/setOverlay";
import { ArrayPostType, PageInfoType } from "~/utils/d";
import {
  ImageBox,
  NavBar,
  Container,
  LocationInfoContainer,
  PostWrapper,
  Post,
  PostHeader,
  PostCardListWrapper,
} from "./styled";
import { FaMapMarkerAlt as MarkIcon } from "react-icons/fa";

const DetailPlace = (): JSX.Element => {
  let [view, setView] = useState<string>("info");
  const [fixBar, setFixBar] = useState(0);
  const [postData, setPostData] = useState<ArrayPostType>();
  const [curPage, setCurPage] = useState(1);
  const [attractionData, setAttractionData] =
    useRecoilState(AttractionDataState); // 명소 정보 저장
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const memberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);
  const setIsModal = useSetRecoilState(isModalVisible);
  const setBookmarkSaves = useSetRecoilState(BookmarkSavesState);
  const setLikes = useSetRecoilState(LikesState);
  const scrollRefContent = useRef<HTMLDivElement>(null);
  const totalInfoRef = useRef<PageInfoType | null>(null);

  const { id } = useParams();
  const url = `/attractions/${id}`;
  const url2 = `/attractions/${id}/${memberId}`;
  const url3 = `/posts/${id}?page=${curPage}&size=8`;
  const url4 = `/posts/${id}/${memberId}?page=${curPage}&size=8`;
  const ATTRACTIONS_URL = isLogin ? url2 : url;
  const POSTS_URL = isLogin ? url4 : url3;
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get(ATTRACTIONS_URL).then((res) => {
      setAttractionData(res.data.data);
      setLikes(res.data.data.isVoted);
      setBookmarkSaves(res.data.data.isSaved);
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
    if (!isLogin) {
      setIsModal(true);
      return;
    }
    navigate(`/write/${id}`);
  };

  return (
    <>
      <ScrollResponsiveHeader />
      {attractionData && (
        <>
          <ImageBox>
            <img src={attractionData!.fixedImage} alt="배경이미지"></img>
          </ImageBox>
          <FloatingMenu
            inverted={fixBar < 470}
            handlePostButtonClick={handlePostButtonClick}
            onModalVisible={setIsModal}
          />
          <NavBar>
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
          </NavBar>
          <Container>
            <h2>{attractionData?.attractionName}</h2>
            <p>{attractionData?.attractionDescription}</p>
            <LocationInfoContainer>
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
            </LocationInfoContainer>
          </Container>
          <PostWrapper>
            <Post ref={scrollRefContent}>
              <PostHeader>
                <h2>포스트</h2>
                <button onClick={handlePostButtonClick}>포스트 작성</button>
              </PostHeader>
              <PostCardListWrapper>
                {postData?.length ? (
                  <PostCardComponent
                    posts={postData}
                    margin="0%"
                    width="24%"
                  ></PostCardComponent>
                ) : (
                  <EmptyResult message="해당 명소에 등록된 포스트가 없습니다" />
                )}
              </PostCardListWrapper>
              {!!postData?.length && (
                <Pagination
                  props={totalInfoRef.current as PageInfoType}
                  setCurPage={setCurPage}
                />
              )}
            </Post>
          </PostWrapper>
        </>
      )}
      <Footer />
    </>
  );
};

export default DetailPlace;
