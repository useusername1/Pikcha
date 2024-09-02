import { atom } from "recoil";

export const editorTagListAtom = atom<string[]>({
  key: "editorTagListAtom",
  default: [],
});
//PostTags
export const editorPostContentAtom = atom<string[]>({
  key: "editorPostContentAtom",
  default: [],
});
//PostContent
export const editorPreviewListAtom = atom<string[][]>({
  key: "editorPreviewListAtom",
  default: [],
}); //PostPreviewList
