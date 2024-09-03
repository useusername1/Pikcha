import { Dispatch, SetStateAction, FormEvent } from "react";
import { BsThreeDots as DotsIcon } from "react-icons/bs";
import * as S from "./styled";
import { getPageButtonRange } from "./utils";
import { PageInfoType } from "~/@types/page.types";

const Pagination = ({
  props,
  setCurPage,
}: {
  props: PageInfoType;
  setCurPage: Dispatch<SetStateAction<number>>;
}) => {
  const pageButtonRange = getPageButtonRange(props);
  const handleButtonClick = (e: FormEvent<HTMLButtonElement>) => {
    setCurPage(Number((e.target as HTMLButtonElement).value));
  };
  return (
    <S.PagenationContainer>
      <S.PagenationWrapper>
        <S.PageButton
          style={{ width: "44px", fontSize: "14px" }}
          onClick={() => {
            setCurPage((p) => p - 1);
          }}
          disabled={props.page === 1 || props.totalPages === 0}
        >
          {"<"}
        </S.PageButton>
        {pageButtonRange.map((el, i) =>
          el === -1 ? (
            <DotsIcon key={i * el} />
          ) : (
            <S.PageButton
              key={el}
              value={el}
              onClick={handleButtonClick}
              selected={el === props.page}
            >
              {el}
            </S.PageButton>
          )
        )}
        <S.PageButton
          style={{ width: "44px", fontSize: "14px" }}
          onClick={() => {
            setCurPage((p) => p + 1);
          }}
          disabled={props.page === props?.totalPages || props.totalPages === 0}
        >
          {">"}
        </S.PageButton>
      </S.PagenationWrapper>
    </S.PagenationContainer>
  );
};
export default Pagination;
