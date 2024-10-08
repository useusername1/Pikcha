import { apiClient } from "~/api/axiosInstance";
import { useState, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { HiddenHeader } from "~/components/@common/Header";
import KakaoMap from "~/components/@common/KakaoMap";
import { regionDummy } from "~/data/regionData";
import { tags } from "~/data/tagData";
import { UserDataAtomFamily } from "~/recoil/auth";
import { isLoginModalVisibleAtom } from "~/recoil/modal/atoms";
import * as S from "./styled";
import { BsBookmarkPlus, BsFillChatLeftFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaMapMarkerAlt } from "react-icons/fa";
import { AiOutlineHeart } from "react-icons/ai";
import { GiTalk } from "react-icons/gi";
import encodeURLForBackgroundImage from "./utils";

interface RegionType {
  attractionAddress: string;
  attractionId: number;
  attractionName: string;
  fixedImage: string;
}

interface RegionDummyType {
  Post: string;
}

const Map = () => {
  const [dropdownView, setDropdownView] = useState<boolean>(false);
  const [regionFilter, setRegionFilter] = useState("전체");
  const [detailModal, setDetailModal] = useState<boolean>(false);
  const [regionList, setRegionList] = useState<any>(undefined);
  const [modalData, setModalData] = useState<any>("");
  const [modalDataId, setModalDataId] = useState<number>(1);
  const [wholeData, setWholeData] = useState<any>();
  const [filterOrPosition, setFilterOrPosition] = useState<boolean>(false);
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const memberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);
  const setIsLoginModalVisible = useSetRecoilState(isLoginModalVisibleAtom);
  const [isVoted, setIsVoted] = useState<boolean>();
  const [isLiked, setIsLiked] = useState<boolean>();
  const navigate = useNavigate();

  const regionURLList = useMemo(
    () =>
      regionList?.map((el: RegionType) =>
        encodeURLForBackgroundImage(el.fixedImage)
      ),
    [regionList]
  );

  const url = "/attractions/maps?page=1&size=104&sort=posts";
  const url2 = `/attractions/${modalDataId}`;
  const url3 = `/attractions/${modalDataId}/${memberId}`;
  const URL_FOR_SAVES = `/attractions/saves/${modalDataId}`;
  const URL_FOR_LIKES = `/attractions/likes/${modalDataId}`;
  const ATTRACTIONS_URL = isLogin ? url3 : url2;

  const handleClickLiked = () => {
    if (isLogin) {
      apiClient.post(URL_FOR_LIKES).then((res) => {
        setIsVoted(res.data.data.isVoted);
        return;
      });
    } else {
      setIsLoginModalVisible(true);
    }
  };

  const handleClickSaved = () => {
    if (isLogin) {
      apiClient.post(URL_FOR_SAVES).then((res) => {
        setIsLiked(res.data.data.isSaved);
        return;
      });
    } else {
      setIsLoginModalVisible(true);
    }
  };

  useEffect(() => {
    apiClient.get(ATTRACTIONS_URL).then((res) => {
      setIsVoted(res.data.data.isVoted);
      setIsLiked(res.data.data.isSaved);
    });

    if (regionFilter === "전체") {
      apiClient
        .post(url, {
          provinces: [],
        })
        .then((res) => {
          setRegionList(res.data.data);
          setWholeData(res.data.data);
        });
    } else {
      apiClient
        .post(url, {
          provinces: [regionFilter],
        })
        .then((res) => {
          setRegionList(res.data.data);
        });
    }
  }, [regionFilter, setDropdownView, modalData, ATTRACTIONS_URL]);

  const handleModalData = (dataUrl: string | number) => {
    apiClient.get(`/attractions/mapdetails/${dataUrl}`).then((res) => {
      setModalData(res.data.data);
    });
  };

  return (
    <>
      <HiddenHeader></HiddenHeader>
      <S.Container>
        <S.PlaceList>
          <S.DropDown>
            <button
              onClick={() => {
                setDropdownView(!dropdownView);
              }}
            >
              <div>{regionFilter}</div>
              <div>
                <RiArrowDropDownLine
                  size="30"
                  color="#6255F8"
                ></RiArrowDropDownLine>
              </div>
            </button>
            {dropdownView ? (
              <S.SelectList>
                {regionDummy.map((el: RegionDummyType, index: number) => {
                  return (
                    <button
                      key={index}
                      onClick={() => {
                        setRegionFilter(el.Post);
                        setDropdownView(false);
                      }}
                    >
                      {el.Post}
                    </button>
                  );
                })}
              </S.SelectList>
            ) : null}
          </S.DropDown>
          <S.PlaceComponent>
            {regionList !== undefined &&
              regionList.map((el: RegionType, index: number) => {
                return (
                  <S.Place
                    onClick={() => {
                      setDetailModal(true);
                      handleModalData(el.attractionId);
                      setModalDataId(el.attractionId);
                      setFilterOrPosition(false);
                    }}
                    imgUrl={regionURLList[index]}
                    key={el.attractionId}
                  >
                    <div>{el.attractionName}</div>
                    <p>
                      <FaMapMarkerAlt size="10"></FaMapMarkerAlt>
                      {el.attractionAddress}
                    </p>
                  </S.Place>
                );
              })}
          </S.PlaceComponent>
        </S.PlaceList>

        {detailModal ? (
          <S.PlaceDetailModal>
            <S.PlaceDetailModalHeader>
              <div>
                <img src={modalData.fixedImage} alt={"modalImg"}></img>
              </div>
              <div>
                <p>서울 명소</p>
                <div onClick={handleClickLiked}>
                  <AiOutlineHeart
                    color={
                      isVoted === true
                        ? "var(--pink-heart)"
                        : "var(--black-400)"
                    }
                  ></AiOutlineHeart>
                  {/* <p>{ modalData.likes }</p> */}
                </div>
                <div onClick={handleClickSaved}>
                  <BsBookmarkPlus
                    color={isLiked ? "green" : "var(--black-400)"}
                  ></BsBookmarkPlus>
                  {/* <p>{modalData.saves}</p> */}
                </div>
              </div>
              <div>
                <h2>{modalData.attractionName}</h2>
                <a href={"/attractions/detail/" + modalData.attractionId}>
                  더보기
                </a>
              </div>
              <p>{modalData.attractionAddress}</p>
              <div>
                <div>
                  <BsFillChatLeftFill size="13"></BsFillChatLeftFill>
                </div>
                <p>{modalData && modalData.numOfPosts}개의 리뷰</p>
              </div>
              <div>
                {tags[modalData.attractionId % tags.length]}{" "}
                {tags[(modalData.attractionId - 1) % tags.length]}{" "}
              </div>
              <span onClick={() => setDetailModal(false)}>{"<<<"}</span>
            </S.PlaceDetailModalHeader>
            <S.PlaceDetailModalMain>
              <div>방문자 포토리뷰</div>
              <S.PostImgContainer>
                {modalData.numOfPosts > 1 ? (
                  modalData.postIdAndUrls.map((el: any, index: number) => {
                    return (
                      <>
                        <img
                          src={el.imageUrls}
                          key={index}
                          alt={"Img"}
                          onClick={() => {
                            navigate(`/posts/detail/${el.postId}`);
                          }}
                        ></img>
                      </>
                    );
                  })
                ) : (
                  <S.PostNone>
                    <div>
                      <GiTalk size="19"></GiTalk>
                    </div>
                    등록된 포토리뷰가 없습니다.
                  </S.PostNone>
                )}
              </S.PostImgContainer>
            </S.PlaceDetailModalMain>
          </S.PlaceDetailModal>
        ) : null}

        {detailModal ? (
          <KakaoMap
            width="71%"
            height="94vh"
            dataList={regionList}
            position="absolute"
            left="750px"
            regionFilter={regionFilter}
            component="map"
            dataset={wholeData}
            modalData={modalData}
            filterOrPosition={filterOrPosition}
            setFilterOrPosition={setFilterOrPosition}
          ></KakaoMap>
        ) : (
          <KakaoMap
            width="100%"
            height="94vh"
            dataList={regionList}
            position="absolute"
            left="350px"
            regionFilter={regionFilter}
            component="map"
            dataset={wholeData}
            modalData={modalData}
            filterOrPosition={filterOrPosition}
            setFilterOrPosition={setFilterOrPosition}
          ></KakaoMap>
        )}
      </S.Container>
    </>
  );
};

export default Map;
