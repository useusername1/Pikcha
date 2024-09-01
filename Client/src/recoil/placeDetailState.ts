import { atom } from "recoil";

export const BookmarkSavesState = atom<boolean>({
  key: "BookmarkSaves",
  default: false,
});

export const LikesState = atom<boolean>({
  key: "Likes",
  default: false,
});

export const AttractionDataState = atom<PlaceData>({
  key: "attractionData",
  default: undefined,
});

export type PlaceData = {
  attractionId: number | undefined;
  attractionAddress: string | undefined;
  attractionDescription: string | undefined;
  attractionName: string | undefined;
  fixedImage: string | undefined;
  isSaved: boolean;
  isVoted: boolean;
  likes: number | undefined;
  saves: number | undefined;
};
