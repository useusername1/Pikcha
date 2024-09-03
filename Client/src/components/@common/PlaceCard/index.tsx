import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { apiClient } from "~/api/axiosInstance";
import { isLoginModalVisibleAtom } from "~/recoil/modal/atoms";
import { UserDataAtomFamily } from "~/recoil/auth";
import * as S from "./styled";
import { AiFillHeart as LikeIcon } from "react-icons/ai";
import { BsFillBookmarkFill as BookmarkIcon } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";
import { PlaceType } from "~/@types/place.types";
import getCurrentCount from "~/utils/getCurrentCount";

const PlaceCard = ({
  placeInfo,
  width,
}: {
  placeInfo: PlaceType;
  width: string;
}) => {
  const [currentBookmark, setCurrentBookmark] = useState(placeInfo.isSaved); //로컬 북마트 상태 저장
  const [currentLike, setCurrentLike] = useState(placeInfo.isVoted);
  const isLogin = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const setIsLoginModalVisible = useSetRecoilState(isLoginModalVisibleAtom);
  const navigate = useNavigate();
  const {
    attractionId,
    likes: likesData,
    saves: savesData,
    isSaved,
    isVoted,
  } = placeInfo;
  const URL_FOR_SAVES = `/attractions/saves/${attractionId}`;
  const URL_FOR_LIKES = `/attractions/likes/${attractionId}`;
  const handleBookmarkClick = () => {
    if (!isLogin) {
      setIsLoginModalVisible(true);
      return;
    }
    apiClient.post(URL_FOR_SAVES).then((res) => {
      setCurrentBookmark(res.data.data.isSaved);
    });
  };
  const handleLikeClick = () => {
    if (!isLogin) {
      setIsLoginModalVisible(true);
      return;
    }
    apiClient.post(URL_FOR_LIKES).then((res) => {
      setCurrentLike(res.data.data.isVoted);
    });
  };

  return (
    <>
      <S.PlaceCardWrapper key={attractionId} width={width}>
        <img
          referrerPolicy="no-referrer"
          alt={placeInfo.attractionName}
          src={placeInfo.fixedImage}
          onClick={() => navigate(`/attractions/detail/${attractionId}`)}
        ></img>
        <S.PlaceCardInfoContainer>
          <div>
            <div
              onClick={() => navigate(`/attractions/detail/${attractionId}`)}
            >
              {placeInfo.attractionName}
            </div>
            <div>
              <S.PlaceCardTopIcon changeColor={currentBookmark}>
                <BookmarkIcon
                  className="place-bookmark-icon"
                  onClick={handleBookmarkClick}
                />
                {getCurrentCount(savesData, isSaved, currentBookmark)}
              </S.PlaceCardTopIcon>
              <S.PlaceCardTopIcon changeColor={currentLike}>
                <LikeIcon
                  className="place-like-icon"
                  onClick={handleLikeClick}
                  style={{ color: currentLike ? "red" : "grey" }}
                />
                {getCurrentCount(likesData, isVoted, currentLike)}
              </S.PlaceCardTopIcon>
            </div>
          </div>
          <div>
            <MdModeComment />
            &nbsp; 포스트 {placeInfo.numOfPosts}
          </div>
        </S.PlaceCardInfoContainer>
      </S.PlaceCardWrapper>
    </>
  );
};
export default PlaceCard;
