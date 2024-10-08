import { AiFillHeart, AiFillEye as EyeIcon } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import * as S from "./styled";
import { ArrayPostType } from "~/@types/post.types";

const PostCardComponent = ({
  posts,
  margin,
  width,
}: {
  posts: ArrayPostType;
  margin: string;
  width: string;
}) => {
  const navigate = useNavigate();

  return (
    <>
      <S.PostContainer margin={margin}>
        {posts.map((post: any) => {
          return (
            <S.PostCard key={post.postId} width={width}>
              <div>
                <img
                  src={post.pictureUrl}
                  onClick={() => navigate(`/posts/detail/${post.postId}`)}
                  alt={post.attractionsTitle}
                ></img>
              </div>
              <div>
                <div>
                  <img src={post.memberPicture}></img>
                  <div>
                    <div style={{ padding: "0" }}>{post.username}</div>
                    <span>{post.createdAt.slice(0, 10)}</span>
                  </div>
                </div>
                <div>
                  <EyeIcon className="eye-icon" />
                  <p>{post.views}</p>
                  <AiFillHeart className="heart-icon"></AiFillHeart>
                  <p>{post.likes}</p>
                </div>
              </div>
              <div onClick={() => navigate(`/posts/detail/${post.postId}`)}>
                {post.postTitle}
              </div>
            </S.PostCard>
          );
        })}
      </S.PostContainer>
    </>
  );
};

export default PostCardComponent;
