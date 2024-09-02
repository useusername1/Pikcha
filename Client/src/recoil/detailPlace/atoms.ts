import { atom } from "recoil";
import { PlaceData } from "./types";

export const isDetailPlaceBookmarkedAtom = atom<boolean>({
  key: "isDetailPlaceBookmarkedAtom",
  default: false,
});
//bookmark
export const isDetailPlaceLikedAtom = atom<boolean>({
  key: "isDetailPlaceLikedAtom",
  default: false,
});
//Likestate
export const detailPlaceDataAtom = atom<PlaceData>({
  key: "detailPlaceDataAtom",
  default: undefined,
});
//AttractionDataState
