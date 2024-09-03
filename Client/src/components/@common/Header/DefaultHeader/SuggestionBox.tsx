import {
  useState,
  useEffect,
  SetStateAction,
  Fragment,
  Dispatch,
  MouseEvent,
} from "react";
import * as S from "./styled";
import { useNavigate } from "react-router-dom";
import { TbArrowUpRight as ShortcutIcon } from "react-icons/tb";
import { BiLocationPlus as SearchMoreIcon } from "react-icons/bi";

const MAX_SUGGEST = 5;

interface SuggestionBoxProps {
  trimmedSearchValue: string;
  filteredAttractions: Array<AttractionsProps>;
  numOfFilteredAttractions: number;
  selected: number;
  onInputChange: Dispatch<SetStateAction<string>>;
  onSelectionChange: Dispatch<SetStateAction<number>>;
}

const SuggestionBox = ({
  trimmedSearchValue,
  filteredAttractions,
  numOfFilteredAttractions,
  selected,
  onInputChange,
  onSelectionChange,
}: SuggestionBoxProps) => {
  const [mouseTriggered, setMouseTriggered] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (selected !== -1 && filteredAttractions.length && !mouseTriggered) {
      if (selected !== MAX_SUGGEST + 1)
        onInputChange(filteredAttractions[selected]["info"]["name"]);
      else {
        onInputChange(trimmedSearchValue);
      }
    }
  }, [selected]);

  useEffect(() => {
    if (mouseTriggered) setMouseTriggered(false);
  }, [mouseTriggered]);

  const handleMouseOver = () => {
    setMouseTriggered(true);
    onSelectionChange(MAX_SUGGEST + 1);
  };

  const handleMoreResultClick = () => {
    navigate(
      `/attractions/search?keyword=${trimmedSearchValue.replace(/\s/g, "+")}`
    );
  };
  return (
    <S.SuggestionItemWrapper>
      {filteredAttractions.length ? (
        filteredAttractions.map((el, i) => (
          <SuggestionItem
            attraction={el}
            key={el.info.id}
            trimmedSearchValue={trimmedSearchValue}
            selectedEl={selected === i}
            onSelectionChange={onSelectionChange}
            onMouseEvent={setMouseTriggered}
            order={i}
          />
        ))
      ) : (
        <S.AttractionItemContent as="li" type="notice">
          {trimmedSearchValue === ""
            ? "검색어를 입력해주세요"
            : "추천 검색어가 없습니다"}
        </S.AttractionItemContent>
      )}
      {numOfFilteredAttractions > MAX_SUGGEST && (
        <S.AttractionItem
          selectedEl={selected === MAX_SUGGEST + 1}
          onMouseOver={handleMouseOver}
        >
          <S.AttractionItemContent
            as="li"
            type="more-result"
            onClick={handleMoreResultClick}
          >
            <SearchMoreIcon className="more-search" />
            {`"${trimmedSearchValue}"에 대한 모든 검색결과 보기 `}
          </S.AttractionItemContent>
        </S.AttractionItem>
      )}
    </S.SuggestionItemWrapper>
  );
};

interface AttractionsProps {
  info: { name: string; id: number; address: string };
  matchedLetter: number[][];
  exactMatchedLetter: number[][];
}

interface SearchBarItemProps {
  trimmedSearchValue: string;
  attraction: AttractionsProps;
  selectedEl: Boolean;
  onSelectionChange: Dispatch<SetStateAction<number>>;
  onMouseEvent: Dispatch<SetStateAction<boolean>>;
  order: number;
}

const SuggestionItem = ({
  trimmedSearchValue,
  attraction: { info, exactMatchedLetter },
  selectedEl,
  onSelectionChange,
  onMouseEvent,
  order,
}: SearchBarItemProps) => {
  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    onMouseEvent(true);
    onSelectionChange(order);
  };

  let letterIndex = exactMatchedLetter.flat();
  const navigate = useNavigate();
  const handleAttractionItemClick = () => {
    navigate(`/attractions/detail/${info.id}`);
  };
  return (
    <S.AttractionItem selectedEl={selectedEl} onMouseOver={handleMouseOver}>
      <S.AttractionItemContentWrapper onClick={handleAttractionItemClick}>
        <S.AttractionItemContent type="name">
          {letterIndex.map((el, i, arr) => {
            let formerIndex = i === 0 ? 0 : arr[i - 1] + 1;
            return i % 2 === 0 ? (
              <Fragment key={i}>{info.name.slice(formerIndex, el)}</Fragment>
            ) : (
              <strong key={i}>{trimmedSearchValue}</strong>
            );
          })}
          {info.name.slice(letterIndex[letterIndex.length - 1] + 1)}
        </S.AttractionItemContent>
        <S.AttractionItemContent type="address">
          {info.address}
        </S.AttractionItemContent>
      </S.AttractionItemContentWrapper>
      <ShortcutIcon />
    </S.AttractionItem>
  );
};

export { SuggestionBox };
