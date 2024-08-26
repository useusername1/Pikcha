import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import LocationFilter from "../../components/LocationFilter";
import { Header } from "../../components/Header";
import axios from "../../api/axiosInstance";
import PlaceCard from "../../components/PlaceCard/PlaceCard";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";
import { useRecoilValue } from "recoil";
import { UserDataAtomFamily } from "../../recoil/auth";
import EmptyResult from "../../components/EmptyResult";
import * as pl from "./PlaceStyled";
import { ArrayPlaceType, PageInfoType, PageSessionType } from "../../utils/d";

const sortList: { kor: string; eng: string }[] = [
  {
    kor: "최신순",
    eng: "newest",
  },
  {
    kor: "리뷰순",
    eng: "posts",
  },
  {
    kor: "인기순",
    eng: "likes",
  },
];

const Place = () => {
  const { pageId, pageDataArr } = useMemo(() => {
    const pageId = window.history.state.key;
    const sessionStorageData = JSON.parse(
      sessionStorage.getItem("pageData") as string
    );
    const pageDataArr = sessionStorageData?.[pageId];

    return { pageId, pageDataArr };
  }, []);

  const [checkedList, setCheckedlist] = useState<string[]>(() =>
    pageDataArr ? pageDataArr.checkedList : []
  );

  const [curPage, setCurPage] = useState(() =>
    pageDataArr ? pageDataArr.curPage : 1
  );

  const [sort, setSort] = useState(() => (pageDataArr ? pageDataArr.sort : 0));
  const [placesData, setPlacesData] = useState<ArrayPlaceType>();
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const memberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);
  const totalInfoRef = useRef<PageInfoType | null>(null);
  const curPageRef = useRef<PageSessionType | null>(null);
  const { search } = useLocation();
  const ITEM_LIMIT = 9;

  const searchValue = useMemo(
    () => new URLSearchParams(search).get("keyword"),
    [search]
  );

  curPageRef.current = {
    curPage: curPage,
    sort: sort,
    checkedList: checkedList,
  };

  const sortValue = sortList[sort].eng;
  const url1 = `/attractions/search?keyword=${searchValue}&page=${curPage}&size=${ITEM_LIMIT}&sort=${sortValue}`;
  const url1_loggedIn = `/attractions/search/${memberId}?keyword=${searchValue}&page=${curPage}&size=${ITEM_LIMIT}&sort=${sortValue}`;
  const url2 = `/attractions/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sortValue}`;
  const url2_loggedIn = `/attractions/filter/${memberId}?page=${curPage}&size=${ITEM_LIMIT}&sort=${sortValue}`;

  const cleanupFunction = () => {
    const totalSessionData = JSON.parse(
      sessionStorage.getItem("pageData") as string
    );
    const newData = { ...totalSessionData, [pageId]: curPageRef.current };
    sessionStorage.setItem("pageData", JSON.stringify(newData));
  };

  useEffect(() => {
    return () => cleanupFunction();
  }, []);

  useEffect(() => {
    let url;
    if (searchValue) {
      url = isLogin ? url1_loggedIn : url1;
    } else {
      url = isLogin ? url2_loggedIn : url2;
    }
    axios
      .post(url, { provinces: checkedList })
      .then((res) => {
        setPlacesData(res.data.data);
        totalInfoRef.current = res.data.pageInfo;
      })
      .catch((err) => console.error(err));
  }, [searchValue, curPage, checkedList, sort, isLogin]);

  const handleSortClick = (sort: number) => {
    setSort(sort);
  };

  return (
    <>
      <div>
        <Header headerColor="var(--black-200)">
          <Header.HeaderTop />
          <Header.HeaderBody
            defaultValue={searchValue ? searchValue : undefined}
            selectedMenu={0}
          />
        </Header>
      </div>
      <pl.PlaceWrapper>
        <pl.LocationWrapper>
          {placesData && (
            <LocationFilter
              setCurPage={setCurPage}
              checkedList={checkedList}
              setCheckedList={setCheckedlist}
            />
          )}
        </pl.LocationWrapper>
        <pl.PlaceContainer>
          <pl.PlaceFilterContainer>
            {searchValue ? (
              <span>
                <strong
                  style={{ marginRight: "5px" }}
                >{`'${searchValue}' 검색결과`}</strong>{" "}
                {`총 ${totalInfoRef.current?.totalElements}개의 명소`}{" "}
              </span>
            ) : (
              <span>총 {totalInfoRef.current?.totalElements}개의 명소</span>
            )}

            <div>
              {sortList.map((sortEl, idx) => (
                <pl.FilterButton
                  className={sort === idx ? "active" : ""}
                  key={idx}
                  onClick={() => {
                    handleSortClick(idx);
                  }}
                >
                  {sortEl.kor}
                </pl.FilterButton>
              ))}
            </div>
          </pl.PlaceFilterContainer>
          <pl.PlaceBox>
            {!totalInfoRef.current?.totalElements && searchValue && (
              <EmptyResult
                message="다른 검색어를 입력해보세요"
                subtitle={false}
              />
            )}
            {placesData?.length ? (
              placesData.map((placeInfo) => (
                <PlaceCard
                  key={placeInfo.attractionId}
                  placeInfo={placeInfo}
                  width="32%"
                />
              ))
            ) : (
              <>
                {!searchValue && (
                  <EmptyResult
                    message="등록된 명소가 없습니다"
                    subtitle={false}
                  />
                )}
              </>
            )}
          </pl.PlaceBox>
          {placesData && (
            <Pagination
              props={totalInfoRef.current as PageInfoType}
              setCurPage={setCurPage}
            />
          )}
        </pl.PlaceContainer>
      </pl.PlaceWrapper>
      <Footer />
    </>
  );
};

export default Place;
