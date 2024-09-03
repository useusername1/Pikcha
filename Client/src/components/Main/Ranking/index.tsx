import { useEffect, useState, useRef, useMemo } from "react";
import { apiClient } from "~/api/axiosInstance";
import * as S from "./styled";
import { RxDoubleArrowUp as DoubleUpIcon } from "react-icons/rx";
import { BsChevronDown as DownArrow } from "react-icons/bs";
import { Link } from "react-router-dom";
import Popover from "./Popover";
import ArrowIconGenerator from "./ArrowIconGenerator";
import getRandomInt from "./utils";
import { TRankingData } from "./types";
interface optionsType {
  dateStyle: "medium";
  timeStyle: "short";
}
const options: optionsType = {
  dateStyle: "medium",
  timeStyle: "short",
};
const RANKING_URL = `attractions/main/rank`;

const Ranking = () => {
  const [rankingData, setRankingData] = useState(Array<TRankingData>);
  const [currentAttraction, setCurrentAttraction] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  // const newRankingData = [...rankingData, ...rankingData.slice(0, 1)];
  const currentTime = useMemo(
    () => new Intl.DateTimeFormat("ko", options).format(new Date()),
    []
  );
  useEffect(() => {
    apiClient.get(RANKING_URL).then((res) => {
      let newRankingData = res.data.data;
      newRankingData = newRankingData.map((info: TRankingData, i: number) => ({
        ...info,
        rankOrder: getRandomInt(i * -1, 20),
        currentRank: i,
      }));
      setRankingData([...newRankingData, ...newRankingData.slice(0, 1)]);
    });
  }, []);

  useEffect(() => {
    timerIdRef.current = setInterval(() => {
      setStartAnimation(true);
      setTimeout(() => {
        setStartAnimation(false);
        setCurrentAttraction((p) => (p + 1) % 10);
      }, 700);
    }, 5000);
    return () => clearInterval(timerIdRef.current as NodeJS.Timeout);
  }, []);
  return (
    <>
      <S.RankingWrapper>
        <S.MainRankingWrapper>
          <S.RankingTitle>
            지금 뜨는 곳<DoubleUpIcon className="doubleup-icon" />
          </S.RankingTitle>
          <S.RankingItemWrapper startAnimation={startAnimation}>
            {rankingData &&
              rankingData
                .slice(currentAttraction, (currentAttraction + 2) % 12)
                .map((el) => (
                  <S.RankingItem key={el.attractionName}>
                    <Link
                      to={`/attractions/search?keyword=${el.attractionName}`}
                    >
                      <S.RankingItemContent currentRank>
                        {el.currentRank + 1}
                      </S.RankingItemContent>
                      <S.RankingItemContent attractionName>
                        {el.attractionName}
                      </S.RankingItemContent>
                      <S.RankingItemContent address>
                        {el.attractionAddress}
                      </S.RankingItemContent>
                      <S.RankingItemContent rankOrder>
                        <ArrowIconGenerator difference={el.rankOrder} />
                      </S.RankingItemContent>
                    </Link>
                  </S.RankingItem>
                ))}
          </S.RankingItemWrapper>
          <DownArrow
            className="downArrow-icon"
            onMouseOver={() => setShowPopover(true)}
          />
        </S.MainRankingWrapper>
        <S.CurrentTimeSpan>{`${currentTime} 기준`}</S.CurrentTimeSpan>

        {showPopover && (
          <S.PopOverWrapper>
            <Popover
              rankingData={rankingData}
              handleShowPopover={setShowPopover}
            />
          </S.PopOverWrapper>
        )}
      </S.RankingWrapper>
    </>
  );
};

export default Ranking;
