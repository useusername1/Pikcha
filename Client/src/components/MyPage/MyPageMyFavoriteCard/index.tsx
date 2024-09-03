import { useState } from "react";
import MyPageFavoriteCardItem from "./MyPageFavoriteCarditem";
import MyPagePagination from "../MyPagePagination";
import { ArrayMySavesType } from "../types";
import * as S from "./styled";

const MyPageMyFavoriteCard = ({
  saves,
  limit,
}: {
  saves: ArrayMySavesType;
  limit: number;
}) => {
  const [curPage, setCurPage] = useState(1);
  const indexOfLastPost = curPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentSaves = saves.slice(indexOfFirstPost, indexOfLastPost);
  const numPages = Math.ceil(saves.length / limit);
  if (numPages < curPage) {
    setCurPage((p) => p - 1);
  }

  return (
    <>
      <S.FavoriteCardWrapper>
        {saves &&
          currentSaves.map((save) => (
            <MyPageFavoriteCardItem
              key={save.attractionId}
              attractionInfo={save}
            />
          ))}
      </S.FavoriteCardWrapper>
      <MyPagePagination
        limit={6}
        props={saves}
        setCurPage={setCurPage}
        curPage={curPage}
      />
    </>
  );
};

export default MyPageMyFavoriteCard;
