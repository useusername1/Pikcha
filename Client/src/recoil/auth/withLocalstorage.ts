import { selectorFamily } from "recoil";
import { TUserData, UserStateKeys } from "~/@types/auth.types";

export const withUserDefaultFamily = selectorFamily<
  TUserData[UserStateKeys],
  UserStateKeys
>({
  key: "withUserDefaultFamily",
  get: (param) => () => {
    const userData = localStorage.getItem(param);
    if (userData === null) {
      return param === UserStateKeys.LOGIN_STATE ? false : null;
    }
    return JSON.parse(userData);
  },
});
