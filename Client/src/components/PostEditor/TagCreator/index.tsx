import React, { useState } from "react";
import CreateTag from "../TagList";
import * as wp from "./styled";
import { editorTagListAtom } from "~/recoil/postEditor/atoms";
import { useRecoilState } from "recoil";

function TagCreator() {
  const [tag, setTag] = useState<string>("");
  const [tagList, setTagList] = useRecoilState(editorTagListAtom);

  const tagMakeHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (tag === "" || tag === " ") setTag("");
      else if (tagList.length >= 5)
        alert("태그는 5개 이하까지만 사용할 수 있습니다.");
      else setTagList([...tagList, tag]);
      setTag("");
    }
  };
  return (
    <wp.TagWrapper>
      <CreateTag />
      <input
        type="text"
        value={tag}
        onKeyUp={(e) => tagMakeHandler(e)}
        onChange={(e) => setTag(e.target.value)}
        placeholder={tagList.length ? "" : "태그를 입력해주세요!"}
      />
    </wp.TagWrapper>
  );
}

export default TagCreator;
