import { Dispatch, SetStateAction, useState } from "react";
import { PageButton } from "~/components/@common/Pagination/styled";
import * as mpc from "./styled";
import { ArrayMyPostsType, ArrayMySavesType } from "../types";

const MyPagePagination = ({
  props,
  limit,
  curPage,
  setCurPage,
}: {
  props: ArrayMyPostsType | ArrayMySavesType;
  limit: number;
  curPage: number;
  setCurPage: Dispatch<SetStateAction<number>>;
}) => {
  const numPages = Math.ceil(props.length / limit);
  const [start, setStart] = useState(1);

  const list: number[] = [];
  for (let i = 1; i <= numPages; i++) {
    list.push(i);
  }
  return (
    <>
      <mpc.Page>
        <mpc.Nav>
          <PageButton
            style={{ width: "44px", fontSize: "14px" }}
            onClick={() => {
              setCurPage((p) => p - 1);
            }}
            disabled={curPage === 1 || curPage === 0}
          >
            {"<"}
          </PageButton>
          {list.map((li, index) => {
            return (
              <PageButton
                key={start + index}
                onClick={() => setCurPage(start + index)}
                selected={li === curPage}
              >
                {start + index}
              </PageButton>
            );
          })}
          <PageButton
            style={{ width: "44px", fontSize: "14px" }}
            onClick={() => {
              setCurPage((p) => p + 1);
            }}
            disabled={curPage === list[list.length - 1] || props.length === 0}
          >
            {">"}
          </PageButton>
        </mpc.Nav>
      </mpc.Page>
    </>
  );
};
export default MyPagePagination;
