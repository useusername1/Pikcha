import { useState, useRef, useEffect } from "react";
import EmptyResult from "~/components/@common/EmptyResult";
import Footer from "~/components/@common/Footer";
import { DefaultHeader } from "~/components/@common/Header";
import LocationFilter from "~/components/@common/LocationFilter";
import Pagination from "~/components/@common/Pagination";
import PostCard from "~/components/@common/PostCard";
import { apiClient } from "~/api/axiosInstance";
import { PageInfoType } from "~/@types/page.types";
import { ArrayPostType } from "~/@types/post.types";
import * as S from "./styled";

const ITEM_LIMIT = 9;

const Post = () => {
  const [postsData, setPostsData] = useState<ArrayPostType>();
  const [curPage, setCurPage] = useState(1);
  const [checkedList, setCheckedlist] = useState<string[]>([]);
  const [onFilter, setOnFliter] = useState(0);
  const [sort, setSort] = useState("newest");
  const totalInfoRef = useRef<PageInfoType | null>(null);

  const sortList: { kor: string; eng: string }[] = [
    {
      kor: "최신순",
      eng: "newest",
    },
    {
      kor: "인기순",
      eng: "likes",
    },
    {
      kor: "조회순",
      eng: "views",
    },
  ];

  useEffect(() => {
    apiClient
      .post(`/posts/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => {
        setPostsData(res.data.data);
        totalInfoRef.current = res.data.pageInfo;
      })
      .catch((err) => console.error(err));
  }, [curPage, checkedList]);

  const handleSortPlace = (sort: string) => {
    setSort(sort);
    apiClient
      .post(`/posts/filter?page=${curPage}&size=${ITEM_LIMIT}&sort=${sort}`, {
        provinces: checkedList,
      })
      .then((res) => {
        setPostsData(res.data.data);
      })
      .catch((err) => console.error(err));
  };
  const handleSort = (idx: number) => {
    setOnFliter(idx);
  };

  return (
    <>
      <div style={{ display: "fixed" }}>
        <DefaultHeader>
          <DefaultHeader.HeaderTop />
          <DefaultHeader.HeaderBody selectedMenu={1} backgroundOn={false} />
        </DefaultHeader>
      </div>

      <S.PostWrapper>
        <S.LocationWrapper>
          {postsData && (
            <LocationFilter
              setCurPage={setCurPage}
              checkedList={checkedList}
              setCheckedList={setCheckedlist}
            />
          )}
        </S.LocationWrapper>

        <S.PostContainer>
          <S.PostFilterContainer>
            <span>총 {totalInfoRef.current?.totalElements}개의 포스트</span>
            <div>
              {sortList.map((sort, idx) => (
                <S.FilterButton
                  className={onFilter === idx ? "active" : ""}
                  key={idx}
                  onClick={() => {
                    handleSort(idx);
                    handleSortPlace(sort.eng);
                  }}
                >
                  {sort.kor}
                </S.FilterButton>
              ))}
            </div>
          </S.PostFilterContainer>

          <S.PostCardContainer>
            {postsData && (
              <PostCard posts={postsData} margin="0" width="32.2%" />
            )}
          </S.PostCardContainer>

          {!!postsData?.length ? (
            <Pagination
              props={totalInfoRef.current as PageInfoType}
              setCurPage={setCurPage}
            ></Pagination>
          ) : (
            <EmptyResult message="등록된 포스트가 없습니다" />
          )}
        </S.PostContainer>
      </S.PostWrapper>
      <Footer />
    </>
  );
};

export default Post;
