import { TfiClose } from "react-icons/tfi";
import * as wp from "./styled";
import { useRecoilState } from "recoil";
import { editorTagListAtom } from "~/recoil/postEditor/atoms";

function TagList() {
  const [tagList, setTagList] = useRecoilState(editorTagListAtom);

  const handleTagRemover = (selectTag: number) => {
    setTagList(tagList.filter((_, tagIdx) => selectTag !== tagIdx));
  };

  return (
    <>
      {tagList.map((tag, idx) => (
        <wp.TagBox key={tag}>
          {tag}
          <TfiClose
            cursor="pointer"
            size="0.7rem"
            fontWeight="bold"
            onClick={() => handleTagRemover(idx)}
          />
        </wp.TagBox>
      ))}
    </>
  );
}

export default TagList;
