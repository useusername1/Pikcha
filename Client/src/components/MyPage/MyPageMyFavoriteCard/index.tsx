import { useState } from "react";
import { ArrayMySavesType } from "~/utils/d";
import MyPageFavoriteCardItem from "./MyPageFavoriteCardItem";
import MyPagePagination from "../MyPagePagination";
import * as mp from "./styled";

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
      <mp.FavoriteCardWrapper>
        {saves &&
          currentSaves.map((save) => (
            <MyPageFavoriteCardItem
              key={save.attractionId}
              attractionInfo={save}
            />
          ))}
      </mp.FavoriteCardWrapper>
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
