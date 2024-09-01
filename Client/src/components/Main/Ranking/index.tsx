import { useEffect, useState, useRef, useMemo } from "react";
import { apiClient } from "~/api/axiosInstance";
import { getRandomInt } from "~/utils/utils";
import {
  RankingWrapper,
  MainRankingWrapper,
  RankingItem,
  RankingTitle,
  RankingItemWrapper,
  RankingItemContent,
  CurrentTimeSpan,
  PopOverWrapper,
} from "./styled";
import { RxDoubleArrowUp as DoubleUpIcon } from "react-icons/rx";
import { BsChevronDown as DownArrow } from "react-icons/bs";
import { Link } from "react-router-dom";
import PopOver from "./PopOver";
import ArrowIconGenerator from "./ArrowIconGenerator";
interface optionsType {
  dateStyle: "medium";
  timeStyle: "short";
}
const options: optionsType = {
  dateStyle: "medium",
  timeStyle: "short",
};
const RANKING_URL = `attractions/main/rank`;
export interface RankingDataType {
  attractionName: string;
  attractionAddress: string;
  currentRank: number;
  rankOrder: number;
}
const Ranking = () => {
  const [rankingData, setRankingData] = useState(Array<RankingDataType>);
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
      newRankingData = newRankingData.map(
        (info: RankingDataType, i: number) => ({
          ...info,
          rankOrder: getRandomInt(i * -1, 20),
          currentRank: i,
        })
      );
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
      <RankingWrapper>
        <MainRankingWrapper>
          <RankingTitle>
            지금 뜨는 곳<DoubleUpIcon className="doubleup-icon" />
          </RankingTitle>
          <RankingItemWrapper startAnimation={startAnimation}>
            {rankingData &&
              rankingData
                .slice(currentAttraction, (currentAttraction + 2) % 12)
                .map((el) => (
                  <RankingItem key={el.attractionName}>
                    <Link
                      to={`/attractions/search?keyword=${el.attractionName}`}
                    >
                      <RankingItemContent currentRank>
                        {el.currentRank + 1}
                      </RankingItemContent>
                      <RankingItemContent attractionName>
                        {el.attractionName}
                      </RankingItemContent>
                      <RankingItemContent address>
                        {el.attractionAddress}
                      </RankingItemContent>
                      <RankingItemContent rankOrder>
                        <ArrowIconGenerator difference={el.rankOrder} />
                      </RankingItemContent>
                    </Link>
                  </RankingItem>
                ))}
          </RankingItemWrapper>
          <DownArrow
            className="downArrow-icon"
            onMouseOver={() => setShowPopover(true)}
          />
        </MainRankingWrapper>
        <CurrentTimeSpan>{`${currentTime} 기준`}</CurrentTimeSpan>

        {showPopover && (
          <PopOverWrapper>
            <PopOver
              rankingData={rankingData}
              handleShowPopover={setShowPopover}
            />
          </PopOverWrapper>
        )}
      </RankingWrapper>
    </>
  );
};

export default Ranking;
