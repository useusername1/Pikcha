import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import axios from "axios";
import { apiClient } from "~/api/axiosInstance";
import { ScrollResponsiveHeader } from "~/components/@common/Header";
import PostCardComponent from "~/components/@common/PostCard";
import PlaceCard from "~/components/@common/PlaceCard";
import { Carousel, Ranking } from "~/components/Main";
import Footer from "~/components/@common/Footer";
import { UserDataAtomFamily } from "~/recoil/auth";

import { HiOutlineChevronDoubleRight as DoubleArrowIcon } from "react-icons/hi";

import * as S from "./styled";
import { ArrayPlaceType } from "~/@types/place.types";
import { ArrayPostType } from "~/@types/post.types";

function Main() {
  const [attractionData, setAttractionData] = useState<ArrayPlaceType>();
  const [postData, setPostData] = useState<ArrayPostType>();
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const memberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);
  const url1 = "/attractions/filter?page=1&size=4&sort=posts";
  const url1_LoggedIn = `/attractions/filter/${memberId}?page=1&size=4&sort=posts`;
  const url2 = `/posts/home?page=1&size=8&sort=views`;
  const url2_LoggedIn = `/posts/home/${memberId}?page=1&size=8&sort=views`;

  useEffect(() => {
    const attraction_url = isLogin ? url1_LoggedIn : url1;
    const post_url = isLogin ? url2_LoggedIn : url2;
    axios
      .all([
        apiClient.post(attraction_url, { provinces: [] }),
        apiClient.get(post_url),
      ])
      .then(
        axios.spread((res1, res2) => {
          setAttractionData(res1.data.data);
          setPostData(res2.data.data);
        })
      );
  }, [isLogin]);

  return (
    <>
      <ScrollResponsiveHeader />
      <Carousel />
      <Ranking />
      {/* <Chat key={"chatbox"} /> */}
      <S.Body>
        <S.BodyContent>
          <S.MainSubTitle>많이 다녀간 명소</S.MainSubTitle>
          <S.ViewsPlaceContainer>
            <S.PlaceCardWrapper>
              {attractionData &&
                attractionData.map((placeInfo) => (
                  <PlaceCard
                    placeInfo={placeInfo}
                    width="24%"
                    key={placeInfo.attractionId}
                  />
                ))}
            </S.PlaceCardWrapper>
            <S.MoreLink>
              <Link to={"/attractions"}>
                더 많은 명소 둘러보기
                <DoubleArrowIcon />
              </Link>
            </S.MoreLink>
          </S.ViewsPlaceContainer>
          <S.MainSubTitle>가장 많이 본 포스트</S.MainSubTitle>
          <S.ViewsPostContainer>
            {postData && (
              <PostCardComponent posts={postData} margin="0" width="24%" />
            )}
          </S.ViewsPostContainer>
          <S.MoreLink>
            <Link to={"/posts"}>
              더 많은 포스트 확인하기 <DoubleArrowIcon />
            </Link>
          </S.MoreLink>
        </S.BodyContent>
      </S.Body>
      <Footer />
    </>
  );
}

export default Main;
