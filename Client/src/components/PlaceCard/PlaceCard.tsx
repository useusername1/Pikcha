import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillHeart as LikeIcon } from "react-icons/ai";
import { BsFillBookmarkFill as BookmarkIcon } from "react-icons/bs";
import { MdModeComment } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { UserDataAtomFamily } from "../../recoil/auth";
import Axios from "../../api/axiosInstance";
import { getCurrentCount } from "../../utils/utils";
import * as plc from "./PlaceCardStyled";
import { PlaceType } from "../../utils/d";
import { isModalVisible } from "../../recoil/setOverlay";

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
  const setIsModal = useSetRecoilState(isModalVisible);
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
      setIsModal(true);
      return;
    }
    Axios.post(URL_FOR_SAVES).then((res) => {
      setCurrentBookmark(res.data.data.isSaved);
    });
  };
  const handleLikeClick = () => {
    if (!isLogin) {
      setIsModal(true);
      return;
    }
    Axios.post(URL_FOR_LIKES).then((res) => {
      setCurrentLike(res.data.data.isVoted);
    });
  };
  return (
    <>
      <plc.PlaceCardWrapper key={attractionId} width={width}>
        <img
          referrerPolicy="no-referrer"
          alt={placeInfo.attractionName}
          src={placeInfo.fixedImage}
          onClick={() => navigate(`/attractions/detail/${attractionId}`)}
        ></img>
        <plc.PlaceCardInfoContainer>
          <div>
            <div
              onClick={() => navigate(`/attractions/detail/${attractionId}`)}
            >
              {placeInfo.attractionName}
            </div>
            <div>
              <plc.PlaceCardTopIcon changeColor={currentBookmark}>
                <BookmarkIcon
                  className="place-bookmark-icon"
                  onClick={handleBookmarkClick}
                />
                {getCurrentCount(savesData, isSaved, currentBookmark)}
              </plc.PlaceCardTopIcon>
              <plc.PlaceCardTopIcon changeColor={currentLike}>
                <LikeIcon
                  className="place-like-icon"
                  onClick={handleLikeClick}
                  style={{ color: currentLike ? "red" : "grey" }}
                />
                {getCurrentCount(likesData, isVoted, currentLike)}
              </plc.PlaceCardTopIcon>
            </div>
          </div>
          <div>
            <MdModeComment />
            &nbsp; 포스트 {placeInfo.numOfPosts}
          </div>
        </plc.PlaceCardInfoContainer>
      </plc.PlaceCardWrapper>
    </>
  );
};
export default PlaceCard;
