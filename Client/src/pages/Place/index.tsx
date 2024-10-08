import { useMemo, useState, useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useRecoilValue } from "recoil";
import EmptyResult from "~/components/@common/EmptyResult";
import Footer from "~/components/@common/Footer";
import { DefaultHeader } from "~/components/@common/Header";
import LocationFilter from "~/components/@common/LocationFilter";
import Pagination from "~/components/@common/Pagination";
import PlaceCard from "~/components/@common/PlaceCard";
import { UserDataAtomFamily } from "~/recoil/auth";
import * as S from "./styled";
import { apiClient } from "~/api/axiosInstance";
import { ArrayPlaceType, PageSessionType } from "~/@types/place.types";
import { PageInfoType } from "~/@types/page.types";

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
    apiClient
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
        <DefaultHeader headerColor="var(--black-200)">
          <DefaultHeader.HeaderTop />
          <DefaultHeader.HeaderBody
            defaultValue={searchValue ? searchValue : undefined}
            selectedMenu={0}
          />
        </DefaultHeader>
      </div>
      <S.PlaceWrapper>
        <S.LocationWrapper>
          {placesData && (
            <LocationFilter
              setCurPage={setCurPage}
              checkedList={checkedList}
              setCheckedList={setCheckedlist}
            />
          )}
        </S.LocationWrapper>
        <S.PlaceContainer>
          <S.PlaceFilterContainer>
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
                <S.FilterButton
                  className={sort === idx ? "active" : ""}
                  key={idx}
                  onClick={() => {
                    handleSortClick(idx);
                  }}
                >
                  {sortEl.kor}
                </S.FilterButton>
              ))}
            </div>
          </S.PlaceFilterContainer>
          <S.PlaceBox>
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
          </S.PlaceBox>
          {placesData && (
            <Pagination
              props={totalInfoRef.current as PageInfoType}
              setCurPage={setCurPage}
            />
          )}
        </S.PlaceContainer>
      </S.PlaceWrapper>
      <Footer />
    </>
  );
};

export default Place;
