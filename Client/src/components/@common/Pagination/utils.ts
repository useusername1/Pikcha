import { PageInfoType } from "../../../utils/d";

const getPageButtonRange = (pageInfo: PageInfoType) => {
  let range: number[] = [];

  if (pageInfo?.totalPages <= 7) {
    for (let i = 1; i <= pageInfo.totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  if (pageInfo.page <= 4) {
    for (let i = 1; i <= 5; i++) {
      range.push(i);
    }
    range.push(-1, pageInfo.totalPages);
    return range;
  }

  if (pageInfo.page >= pageInfo.totalPages - 3) {
    range.push(1, -1);
    for (let i = pageInfo.totalPages - 4; i <= pageInfo.totalPages; i++) {
      range.push(i);
    }
    return range;
  }

  range.push(
    1,
    -1,
    pageInfo.page - 1,
    pageInfo.page,
    pageInfo.page + 1,
    -1,
    pageInfo.totalPages
  );
  return range;
};

export { getPageButtonRange };
