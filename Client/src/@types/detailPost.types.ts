export interface CommentType {
  commentId: number;
  parentId: number;
  memberId: number;
  username: string;
  memberPicture: string;
  commentContent: string;
  createdAt: string;
  modifiedAt: string;
  children: [];
}
export interface ArrayCommentType extends Array<CommentType> {}
