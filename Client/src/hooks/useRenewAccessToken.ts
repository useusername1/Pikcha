import { useCallback } from "react";
import Axios from "axios";
import { UserDataAtomFamily } from "../recoil/auth";
import { useRecoilValue, useSetRecoilState } from "recoil";
import useLogout from "./useLogout";
import useAuthPostMessage from "./useAuthPostMessage";

/**refreshtoken으로 accesstoken을 재발급
      / 정상발급인 경우 accesstoken값 갱신,갱신 성공일 경우 true, 실패면 false반환*/
const useRenewAccessToken = () => {
  const memberId = useRecoilValue(UserDataAtomFamily.MEMBER_ID);
  const setAccessToken = useSetRecoilState(UserDataAtomFamily.AUTH_TOKEN);
  const { handleRefreshTokenExpiry } = useLogout();
  const { postUpdateToken } = useAuthPostMessage();

  const renewAccessToken = useCallback(async () => {
    try {
      const response = await Axios.get(
        `${process.env.REACT_APP_HOST}/token/refresh/${memberId}`
      );
      const accessToken = response.data.data.accessToken;

      setAccessToken(accessToken);
      postUpdateToken();
      return true;
    } catch {
      handleRefreshTokenExpiry();
      return false;
    }
  }, [memberId, handleRefreshTokenExpiry, postUpdateToken]);

  return renewAccessToken;
};
export default useRenewAccessToken;
