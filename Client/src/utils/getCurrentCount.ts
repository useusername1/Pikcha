const getCurrentCount = (
  totalCount: number | undefined,
  prev: boolean,
  cur: boolean
) => {
  if (prev === false) {
    return cur ? (totalCount as number) + 1 : totalCount;
  }
  return cur ? totalCount : (totalCount as number) - 1;
};

export default getCurrentCount;
