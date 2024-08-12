import { selector } from "recoil";
import { UserDataAtomFamily } from "./atoms";
import {
  calculateTokenRemainingTime,
  getAccesstokenExpiration,
} from "../../utils/getTokenInfo";

//39분 10초로 설정
const TOKEN_RENEWAL_THRESHOLD = 39 * 60;

export const withTokenExpirationTime = selector<number | null>({
  key: "withTokenExpirationTime",
  get: ({ get }) => {
    const token = get(UserDataAtomFamily.AUTH_TOKEN);
    if (!token) return null;
    return getAccesstokenExpiration(token);
  },
});

export const withTokenRenewalRequired = selector<boolean | null>({
  key: "withTokenRenewalRequired",
  get: ({ get }) => {
    const tokenExpirationTime = get(withTokenExpirationTime);
    if (tokenExpirationTime === null) return null;

    const remainingTime = calculateTokenRemainingTime(tokenExpirationTime);
    const needRenewal = remainingTime < TOKEN_RENEWAL_THRESHOLD;
    return needRenewal;
  },
});
