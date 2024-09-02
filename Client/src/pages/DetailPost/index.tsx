import { useState, useRef, useEffect } from "react";
import { AiOutlineShareAlt, AiFillEye, AiFillHeart } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { deletePostHandler } from "~/api/BlogDetail/Delete/Delete";
import { getPost, getPostCommentList } from "~/api/BlogDetail/Get/Get";
import { handleLikePost } from "~/api/BlogDetail/Post/Post";
import Footer from "~/components/@common/Footer";
import { DefaultHeader } from "~/components/@common/Header";
import { AddComment, Comment } from "~/components/DetailPost";
import { UserDataAtomFamily } from "~/recoil/auth";
import { isLoginModalVisibleAtom } from "~/recoil/modal/atoms";
import { getCurrentCount } from "~/utils/utils";
import * as dp from "./styled";
import { FaRegCommentDots } from "react-icons/fa";
import { MdModeEdit, MdDelete, MdPlace } from "react-icons/md";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { ArrayCommentType } from "~/@types/detailPost.types";
import { PostDetailType } from "./types";

const DetailPost = () => {
  const [post, setPost] = useState<PostDetailType>();
  const [commentList, setCommentList] = useState<ArrayCommentType>();
  const [isVoted, setIsVoted] = useState(false);
  const setIsLoginModalVisible = useSetRecoilState(isLoginModalVisibleAtom);
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const memberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);
  const { postId } = useParams();
  const navigate = useNavigate();
  const initialLikesRef = useRef(false); //로컬 좋아요 상태 저장

  useEffect(() => {
    const get = async () => {
      const response = await getPost(postId, memberId, isLogin);
      setPost(response);
      setIsVoted(response?.isVoted);
      initialLikesRef.current = response?.isVoted;
    };
    get();
  }, []);
  type postDataType = {
    imageURL: string | undefined;
    content: string | undefined;
    imageId: number | undefined;
  };
  let postData: Array<postDataType> = [];
  for (let i = 0; i < post?.postImageUrls.length!; i++) {
    postData.push({
      imageURL: post?.postImageUrls[i],
      content: post?.postContents[i],
      imageId: i + 1,
    });
  }

  useEffect(() => {
    const getData = async () => {
      const response = await getPostCommentList(postId);
      setCommentList(response);
    };
    getData();
  }, []);

  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("url이 성공적으로 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <DefaultHeader>
        <DefaultHeader.HeaderTop />
        <DefaultHeader.HeaderBody />
      </DefaultHeader>
      <dp.DetailPostWrapper>
        {(post && post.memberId === memberId) || memberId === 1 ? (
          <dp.PostMangeButtnContainer>
            <dp.PostManageButton onClick={() => navigate(`/edit/${postId}`)}>
              <MdModeEdit /> 수정
            </dp.PostManageButton>
            <dp.PostManageButton onClick={() => deletePostHandler(postId)}>
              <MdDelete /> 삭제
            </dp.PostManageButton>
          </dp.PostMangeButtnContainer>
        ) : null}
        <dp.DetailPostTitle>
          <h2>{post?.postTitle}</h2>
        </dp.DetailPostTitle>
        <dp.DetailPostInfo>
          <dp.DetailPostAttractionsContainer>
            {post?.attractionName}
            <p>
              <MdPlace /> &nbsp;{post?.attractionAddress}
            </p>
          </dp.DetailPostAttractionsContainer>
          <div>
            <button
              onClick={() =>
                navigate(`/attractions/detail/${post?.attractionId}`)
              }
            >
              <RxDoubleArrowLeft />
              &nbsp; 이 명소 포스트 더보기
            </button>
            <span>{post?.createdAt.slice(0, 10)}</span>
          </div>
        </dp.DetailPostInfo>
        <dp.PostContentContainer>
          <dp.PostContentBox>
            {postData.map((post) => (
              <div key={post.imageId}>
                <div>
                  <img src={post.imageURL} alt="picture" />
                </div>
                <div>{post.content}</div>
              </div>
            ))}
          </dp.PostContentBox>
          <div>
            {post &&
              post.postHashTags.map((tag, idx) => (
                <dp.TagsButton key={idx}>{tag}</dp.TagsButton>
              ))}
          </div>
          <dp.PostContentBottom>
            <div>
              <img alt="userImg" src={post?.picture} />
              <strong>{post?.username}</strong>님의 포스트
            </div>
            <div>
              <div
                onClick={() => {
                  handleCopyClipBoard(document.location.href);
                }}
              >
                <AiOutlineShareAlt />
                <span>공유</span>
              </div>
              <div>
                <AiFillEye />
                <span>{post?.views}</span>
              </div>
              <div>
                <AiFillHeart
                  onClick={() =>
                    !memberId
                      ? setIsLoginModalVisible(true)
                      : handleLikePost(postId, setIsVoted)
                  }
                  color={isVoted ? "red" : "grey"}
                />
                <span>
                  {getCurrentCount(
                    post?.likes,
                    initialLikesRef.current as boolean,
                    isVoted as boolean
                  )}
                </span>
              </div>
            </div>
          </dp.PostContentBottom>
        </dp.PostContentContainer>
        {post && post.commentCount === 0 ? (
          <dp.EmptyCommentContainer>
            <FaRegCommentDots />
            첫번째 댓글을 남겨주세요.
          </dp.EmptyCommentContainer>
        ) : (
          commentList &&
          commentList.map((comments) => (
            <Comment
              key={comments.commentId}
              comments={comments}
              postWriter={post?.memberId}
            />
          ))
        )}
        <AddComment />
      </dp.DetailPostWrapper>
      <Footer />
    </>
  );
};

export default DetailPost;
