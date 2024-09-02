export enum UserStateKeys {
  LOGIN_STATE = "LOGIN_STATE",
  AUTH_TOKEN = "AUTH_TOKEN",
  LOGGED_USER = "LOGGED_USER",
  MEMBER_ID = "MEMBER_ID",
}

export interface TUserData extends Record<UserStateKeys, any> {
  [UserStateKeys.LOGIN_STATE]: boolean;
  [UserStateKeys.AUTH_TOKEN]: string | null;
  [UserStateKeys.LOGGED_USER]: string | null;
  [UserStateKeys.MEMBER_ID]: number | null;
}
