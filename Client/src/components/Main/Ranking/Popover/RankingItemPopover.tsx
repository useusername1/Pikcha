import { Link } from "react-router-dom";
import * as R from "../styled";
import ArrowIconGenerator from "../ArrowIconGenerator";
import { TRankingData } from "../types";

interface AttractionProps {
  attraction: TRankingData;
}
const RankingItemPopover = ({ attraction }: AttractionProps) => {
  return (
    <R.RankingItem key={attraction.attractionName} popOver>
      <Link to={`/attractions/search?keyword=${attraction.attractionName}`}>
        <R.RankingItemContent currentRankPopover>
          {attraction.currentRank + 1}
        </R.RankingItemContent>
        <R.RankingItemContent attractionNamePopover>
          {attraction.attractionName}
        </R.RankingItemContent>
        <R.RankingItemContent rankOrder>
          <ArrowIconGenerator
            difference={attraction.rankOrder}
            numberOpt={false}
          />
        </R.RankingItemContent>
      </Link>
    </R.RankingItem>
  );
};

export default RankingItemPopover;
