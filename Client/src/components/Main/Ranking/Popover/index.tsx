import { Dispatch, SetStateAction } from "react";
import RankingItemPopover from "./RankingItemPopover";
import * as S from "./styled";
import { TRankingData } from "../types";

interface RankingDataProps {
  rankingData: TRankingData[];
  handleShowPopover: Dispatch<SetStateAction<boolean>>;
}

const Popover = ({ rankingData, handleShowPopover }: RankingDataProps) => {
  return (
    <S.RankingPopover onMouseLeave={() => handleShowPopover(false)}>
      <S.RankingPopoverPart>
        {rankingData.slice(0, 5).map((el) => (
          <RankingItemPopover key={el.attractionName} attraction={el} />
        ))}
      </S.RankingPopoverPart>
      <S.RankingPopoverPart>
        {rankingData.slice(5, 10).map((el) => (
          <RankingItemPopover key={el.attractionName} attraction={el} />
        ))}
      </S.RankingPopoverPart>
    </S.RankingPopover>
  );
};

export default Popover;
