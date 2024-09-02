import { useState } from "react";
import MyPagePagination from "../MyPagePagination";
import MyPagePostCardItem from "./MyPagePostCardItem";
import * as mp from "./styled";
import { ArrayMyPostsType } from "../types";

const MyPageMyPostCard = ({
  posts,
  limit,
}: {
  posts: ArrayMyPostsType;
  limit: number;
}) => {
  const [curPage, setCurPage] = useState(1);
  const indexOfLastPost = curPage * limit;
  const indexOfFirstPost = indexOfLastPost - limit;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const numPages = Math.ceil(posts.length / limit);
  if (numPages < curPage) {
    setCurPage((p) => p - 1);
  }

  return (
    <>
      <mp.MyPagePostCardWrapper>
        {posts &&
          currentPosts.map((post) => (
            <MyPagePostCardItem key={post.postId} postInfo={post} />
          ))}
      </mp.MyPagePostCardWrapper>
      <MyPagePagination
        limit={5}
        props={posts}
        setCurPage={setCurPage}
        curPage={curPage}
      />
    </>
  );
};

export default MyPageMyPostCard;
