import { Dispatch, SetStateAction, useState } from "react";
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp,
} from "react-icons/md";
import { RiCloseLine } from "react-icons/ri";
import * as S from "./styled";
import { Districts } from "~/data/districtsData";

export default function LocationFilter({
  checkedList,
  setCheckedList,
  setCurPage,
}: {
  checkedList: string[];
  setCheckedList: Dispatch<SetStateAction<string[]>>;
  setCurPage: Dispatch<SetStateAction<number>>;
}) {
  const [openLocation, setOpenLocation] = useState(true);
  const onCheckItem = (checked: boolean, item: string) => {
    setCurPage(1);
    if (checked) return setCheckedList([...checkedList, item]);
    else return setCheckedList(checkedList.filter((el) => el !== item));
  };
  const onRemove = (item: string) => {
    setCurPage(1);
    setCheckedList(checkedList.filter((el) => el !== item));
  };
  const allRemove = () => {
    setCurPage(1);
    setCheckedList([]);
  };

  return (
    <>
      <S.SelectContainer>
        <div>
          <span>선택한 지역</span>
          {!!checkedList.length && <button onClick={allRemove}>초기화</button>}
        </div>
        {checkedList &&
          checkedList.map((item, idx) => (
            <S.SelectPost key={idx}>
              <li>
                <button onClick={() => onRemove(item)}>
                  <RiCloseLine />
                </button>
                {item}
              </li>
            </S.SelectPost>
          ))}
      </S.SelectContainer>
      <S.SelectBox>
        <div>
          <span>지역</span>
          <button onClick={() => setOpenLocation(!openLocation)}>
            {openLocation ? (
              <MdOutlineKeyboardArrowUp />
            ) : (
              <MdOutlineKeyboardArrowDown />
            )}
          </button>
        </div>
        {openLocation
          ? Districts.map((el) => (
              <form key={el.id}>
                <input
                  className="hi"
                  type="checkbox"
                  id={el.id}
                  value={el.Post}
                  checked={checkedList.includes(el.Post) ? true : false}
                  onChange={(e) =>
                    onCheckItem(e.target.checked, e.target.value)
                  }
                ></input>
                <label htmlFor={el.id}>{el.Post}</label>
              </form>
            ))
          : null}
      </S.SelectBox>
    </>
  );
}
