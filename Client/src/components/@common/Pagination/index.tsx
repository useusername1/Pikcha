import { Dispatch, SetStateAction, FormEvent } from "react";
import { BsThreeDots as DotsIcon } from "react-icons/bs";
import { PageInfoType } from "~/utils/d";
import { PagenationContainer, PagenationWrapper, PageButton } from "./styled";
import { getPageButtonRange } from "./utils";

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
    <PagenationContainer>
      <PagenationWrapper>
        <PageButton
          style={{ width: "44px", fontSize: "14px" }}
          onClick={() => {
            setCurPage((p) => p - 1);
          }}
          disabled={props.page === 1 || props.totalPages === 0}
        >
          {"<"}
        </PageButton>
        {pageButtonRange.map((el, i) =>
          el === -1 ? (
            <DotsIcon key={i * el} />
          ) : (
            <PageButton
              key={el}
              value={el}
              onClick={handleButtonClick}
              selected={el === props.page}
            >
              {el}
            </PageButton>
          )
        )}
        <PageButton
          style={{ width: "44px", fontSize: "14px" }}
          onClick={() => {
            setCurPage((p) => p + 1);
          }}
          disabled={props.page === props?.totalPages || props.totalPages === 0}
        >
          {">"}
        </PageButton>
      </PagenationWrapper>
    </PagenationContainer>
  );
};
export default Pagination;
