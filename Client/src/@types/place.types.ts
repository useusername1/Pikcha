export interface PlaceType {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  numOfPosts: number;
  saves: number;
  isSaved: boolean;
  isVoted: boolean;
}

export interface PageSessionType {
  curPage: number;
  sort: number;
  checkedList: string[];
}

export interface ArrayPlaceType extends Array<PlaceType> {}
