import { apiClient } from "~/api/axiosInstance";
import {
  MouseEventHandler,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import useClickDetect from "~/hooks/useClickDetect";
import { UserDataAtomFamily } from "~/recoil/auth";
import {
  isDetailPlaceBookmarkedAtom,
  isDetailPlaceLikedAtom,
  detailPlaceDataAtom,
} from "~/recoil/detailPlace/atoms";
import * as S from "./styled";
import { MdEditNote as NoteIcon } from "react-icons/md";
import { RiKakaoTalkFill as KakaoIcon } from "react-icons/ri";
import { AiFillFacebook as FacebookIcon, AiFillHeart } from "react-icons/ai";
import { AiOutlineTwitter as TwitterIcon } from "react-icons/ai";
import {
  BsLink45Deg as ShareAddressIcon,
  BsShareFill,
  BsBookmarkFill,
} from "react-icons/bs";
import getCurrentCount from "~/utils/getCurrentCount";
interface ShareProps {
  inverted: boolean;
  handlePostButtonClick: MouseEventHandler<HTMLElement>;
  onModalVisible: Dispatch<SetStateAction<boolean>>;
}

const FloatingMenu = ({
  inverted,
  handlePostButtonClick,
  onModalVisible,
}: ShareProps) => {
  const [isBookmarked, setIsBookmarked] = useRecoilState(
    isDetailPlaceBookmarkedAtom
  ); //로컬 북마트 상태 저장
  const [isLiked, setIsLiked] = useRecoilState(isDetailPlaceLikedAtom);
  const detailPlaceData = useRecoilValue(detailPlaceDataAtom);
  const [isLogin] = useRecoilState(UserDataAtomFamily.LOGIN_STATE);
  const {
    ref,
    isVisible: showSharebox,
    setIsVisible: setShowSharebox,
  } = useClickDetect();

  const { id } = useParams();
  const URL_FOR_SAVES = `/attractions/saves/${id}`;
  const URL_FOR_LIKES = `/attractions/likes/${id}`;

  useLayoutEffect(() => {
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }
  }, []);
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("url이 성공적으로 복사되었습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickBookmark = () => {
    if (!isLogin) {
      onModalVisible(true);
      return;
    }
    apiClient.post(URL_FOR_SAVES).then((res) => {
      setIsBookmarked(res.data.data.isSaved);
    });
  };

  const handleClickLikes = () => {
    if (!isLogin) {
      onModalVisible(true);
      return;
    }
    apiClient.post(URL_FOR_LIKES).then((res) => {
      setIsLiked(res.data.data.isVoted);
    });
  };
  return (
    <>
      <S.FixBoxVertical inverted={inverted}>
        <S.IconContainer
          ref={ref as React.RefObject<HTMLDivElement>}
          className="icon"
          isSelected={showSharebox}
        >
          <BsShareFill
            className="share-icon"
            onClick={() => {
              setShowSharebox((p) => !p);
              // handleCopyClipBoard(document.location.href);
            }}
          />
          <S.ShareBox isVisible={showSharebox}>
            <ShareAddressIcon
              className="shareAddress-icon"
              onClick={() => handleCopyClipBoard(document.location.href)}
            />
            <FacebookIcon
              className="facebook-icon"
              onClick={() =>
                window.open(
                  "https://www.facebook.com/sharer/sharer.php?u=" +
                    encodeURIComponent(window.location.href)
                )
              }
            />
            <TwitterIcon
              className="twitter-icon"
              onClick={() =>
                window.open(
                  "https://twitter.com/intent/tweet?url=" +
                    encodeURIComponent(window.location.href)
                )
              }
            />
            <KakaoIcon
              className="kakao-icon"
              onClick={() => {
                if (window.Kakao) {
                  window.Kakao.Share.sendScrap({
                    requestUrl: document.location.href,
                  });
                }
              }}
            />
          </S.ShareBox>
        </S.IconContainer>{" "}
        <S.IconContainer onClick={handlePostButtonClick}>
          {" "}
          <NoteIcon className="post-icon" />
        </S.IconContainer>
        <S.IconContainer onClick={() => handleClickBookmark()}>
          <BsBookmarkFill
            className="bookmark-icon"
            fill={isBookmarked ? "var(--black-800)" : "var(--black-400)"}
          />
          <S.MarkerCount>
            {getCurrentCount(
              detailPlaceData.saves,
              detailPlaceData.isSaved,
              isBookmarked
            )}
          </S.MarkerCount>
        </S.IconContainer>
        <S.IconContainer onClick={() => handleClickLikes()}>
          <AiFillHeart
            className="heart-icon"
            color={isLiked === true ? "var(--pink-heart)" : "var(--black-400)"}
          />
          <S.MarkerCount>
            {getCurrentCount(
              detailPlaceData.likes,
              detailPlaceData.isVoted,
              isLiked
            )}
          </S.MarkerCount>
        </S.IconContainer>
      </S.FixBoxVertical>
    </>
  );
};
export default FloatingMenu;
