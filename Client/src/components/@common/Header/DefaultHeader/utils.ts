import * as Hangul from "hangul-js";

type TAttractionsData = {
  name: string;
  id: number;
  address: string;
};

type TAttractionSearchMatch = {
  info: TAttractionsData;
  matchedLetter: number[][];
  exactMatchedLetter: number[][];
};

function getFilteredAttractions(
  AttractionsData: Array<TAttractionsData>,
  trimmedSearchValue: string,
  maxSuggest: number
) {
  if (trimmedSearchValue === "")
    return {
      trimmedSearchValue,
      filteredAttractions: [],
      numOfFilteredAttractions: 0,
    };
  let init: Array<TAttractionSearchMatch> = [];
  const blankNumRemovedValue = trimmedSearchValue.replace(/[0-9 ]/g, "");

  let filteredAttractions = AttractionsData.reduce((acc, attraction) => {
    const searcher = new Hangul.Searcher(blankNumRemovedValue);
    const matchedLetter = Hangul.rangeSearch(
      attraction.name,
      trimmedSearchValue
    );

    if (searcher.search(attraction.name.replace(/[0-9 ]/g, "")) === -1)
      return acc;
    const exactMatchedLetter = matchedLetter.filter(
      (el: any) =>
        attraction.name[el[1]] === trimmedSearchValue.slice(-1) &&
        Hangul.isCompleteAll(blankNumRemovedValue)
    );
    return [
      ...acc,
      {
        info: attraction,
        matchedLetter,
        exactMatchedLetter,
      },
    ];
  }, init).sort((prev, next) => {
    let diff = prev.matchedLetter[0]?.[0] - next.matchedLetter[0]?.[0];
    let exactDiff = null;

    if (!prev.exactMatchedLetter.length && next.exactMatchedLetter.length)
      return 1;
    if (prev.exactMatchedLetter.length && !next.exactMatchedLetter.length)
      return -1;
    if (prev.exactMatchedLetter.length && next.exactMatchedLetter.length) {
      exactDiff = prev.exactMatchedLetter[0][0] - next.exactMatchedLetter[0][0];
    }

    if (exactDiff) return exactDiff;
    if (diff) return diff;
    return prev.info.name.localeCompare(next.info.name, "ko");
  });

  return {
    filteredAttractions: filteredAttractions.slice(0, maxSuggest + 1),
    numOfFilteredAttractions: filteredAttractions.length,
  };
}

export default getFilteredAttractions;
