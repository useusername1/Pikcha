import { useState, useEffect } from "react";
import Axios from "axios";
import axios from "../../api/axiosInstance";
import { ScrollResponsiveHeader } from "../../components/@common/Header";
import PostCardComponent from "../../components/@common/PostCard";
import PlaceCard from "../../components/@common/PlaceCard";
import { Carousel, Ranking } from "../../components/Main";
import { Link } from "react-router-dom";
import { HiOutlineChevronDoubleRight as DoubleArrowIcon } from "react-icons/hi";
import Footer from "../../components/@common/Footer";
import { useRecoilValue } from "recoil";
import { UserDataAtomFamily } from "../../recoil/auth";
import { ArrayPlaceType, ArrayPostType } from "../../utils/d";

import {
  Body,
  BodyContent,
  MainSubTitle,
  MoreLink,
  PlaceCardWrapper,
  ViewsPlaceContainer,
  ViewsPostContainer,
} from "./styled";

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
    Axios.all([
      axios.post(attraction_url, { provinces: [] }),
      axios.get(post_url),
    ]).then(
      Axios.spread((res1, res2) => {
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
      <Body>
        <BodyContent>
          <MainSubTitle>많이 다녀간 명소</MainSubTitle>
          <ViewsPlaceContainer>
            <PlaceCardWrapper>
              {attractionData &&
                attractionData.map((placeInfo) => (
                  <PlaceCard
                    placeInfo={placeInfo}
                    width="24%"
                    key={placeInfo.attractionId}
                  />
                ))}
            </PlaceCardWrapper>
            <MoreLink>
              <Link to={"/attractions"}>
                더 많은 명소 둘러보기
                <DoubleArrowIcon />
              </Link>
            </MoreLink>
          </ViewsPlaceContainer>
          <MainSubTitle>가장 많이 본 포스트</MainSubTitle>
          <ViewsPostContainer>
            {postData && (
              <PostCardComponent posts={postData} margin="0" width="24%" />
            )}
          </ViewsPostContainer>
          <MoreLink>
            <Link to={"/posts"}>
              더 많은 포스트 확인하기 <DoubleArrowIcon />
            </Link>
          </MoreLink>
        </BodyContent>
      </Body>
      <Footer />
    </>
  );
}

export default Main;
