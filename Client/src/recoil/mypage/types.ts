export interface UserType {
  memberId: number;
  username: string;
  memberTitle: null;
  phoneNumber: string;
  address: string;
  picture: string;
  email: string;
  totalMyPosts: number;
  totalMySaves: number;
  posts:
    | [
        {
          postId: number;
          postTitle: string;
          pictureUrl: string;
          views: number;
          likes: number;
          createdAt: string;
          modifiedAt: string;
        }
      ];
  saves:
    | {
        attractionId: number;
        attractionName: string;
        fixedImage: string;
        likes: number;
        saves: number;
      }[];
  createdAt: string;
  modifiedAt: string;
}
