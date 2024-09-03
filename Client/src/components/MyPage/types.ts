export interface MyPostsType {
  postId: number;
  postTitle: string;
  pictureUrl: string;
  views: number;
  likes: number;
  createdAt: string;
  modifiedAt: string;
}
export interface MySavesType {
  attractionId: number;
  attractionName: string;
  fixedImage: string;
  likes: number;
  saves: number;
}

export interface ArrayMyPostsType extends Array<MyPostsType> {}
export interface ArrayMySavesType extends Array<MySavesType> {}
