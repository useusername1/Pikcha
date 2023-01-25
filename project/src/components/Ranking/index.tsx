import { useEffect, useState, useRef } from "react";

import {
  RankingWrapper,
  MainRankingWrapper,
  RankingItem,
  RankingTitle,
  RankingItemWrapper,
  RankingItemContent,
} from "./style";
import rankingData from "../../data/RankingData";
import { RxDoubleArrowUp as DoubleUpIcon } from "react-icons/rx";
import {
  TiArrowSortedUp as UpIcon,
  TiArrowSortedDown as DownIcon,
} from "react-icons/ti";
import { BsDash as DashIcon } from "react-icons/bs";
const Ranking = () => {
  const [currentAttraction, setCurrentAttraction] = useState(0);
  const [startAnimation, setStartAnimation] = useState(false);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);
  const newRankingData = [...rankingData, ...rankingData.slice(0, 1)];
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
  console.log(newRankingData.slice(9, 11 % 12), newRankingData);
  return (
    <RankingWrapper>
      <MainRankingWrapper>
        <RankingTitle>
          지금 뜨는 곳<DoubleUpIcon className="doubleup-icon" />
        </RankingTitle>
        <RankingItemWrapper startAnimation={startAnimation}>
          {newRankingData
            .slice(currentAttraction, (currentAttraction + 2) % 12)
            .map((el) => (
              <RankingItem key={el.id}>
                <RankingItemContent currentRank>
                  {el.currentRank}
                </RankingItemContent>
                <RankingItemContent name>{el.name}</RankingItemContent>
                <RankingItemContent address>{el.address}</RankingItemContent>
                <RankingItemContent rankOrder>
                  <ArrowIconGenerator difference={el.rankOrder} />
                </RankingItemContent>
              </RankingItem>
            ))}
        </RankingItemWrapper>
      </MainRankingWrapper>
    </RankingWrapper>
  );
};

interface ArrowIconGeneratorProps {
  difference: number;
}
const ArrowIconGenerator = ({ difference }: ArrowIconGeneratorProps) => {
  if (difference === 0)
    return (
      <>
        <DashIcon />
      </>
    );
  if (difference > 0)
    return (
      <>
        <UpIcon className="up-icon" />
        {difference}
      </>
    );
  if (difference < 0)
    return (
      <>
        <DownIcon className="down-icon" />
        {Math.abs(difference)}
      </>
    );
  return <></>;
};
export default Ranking;
