import { useRecoilCallback, useResetRecoilState } from "recoil";
import {
  UserDataAtomFamily,
  withUserDefaultFamily,
  UserStateKeys,
} from "../recoil/auth";
import { useCallback } from "react";

const useHydrateUserData = () => {
  const resetLogInState = useResetRecoilState(UserDataAtomFamily.LOGIN_STATE);
  const resetAuthToken = useResetRecoilState(UserDataAtomFamily.AUTH_TOKEN);
  const resetLoggedUser = useResetRecoilState(UserDataAtomFamily.LOGGED_USER);
  const resetMemberId = useResetRecoilState(UserDataAtomFamily.MEMBER_ID);

  const refreshLogInState = useRecoilCallback(
    ({ refresh }) =>
      () => {
        refresh(withUserDefaultFamily(UserStateKeys.LOGIN_STATE));
      },
    []
  );

  const refreshAuthToken = useRecoilCallback(
    ({ refresh }) =>
      () => {
        refresh(withUserDefaultFamily(UserStateKeys.AUTH_TOKEN));
      },
    []
  );

  const refreshLoggedUser = useRecoilCallback(
    ({ refresh }) =>
      () => {
        refresh(withUserDefaultFamily(UserStateKeys.LOGGED_USER));
      },
    []
  );

  const refreshMemberId = useRecoilCallback(
    ({ refresh }) =>
      () => {
        refresh(withUserDefaultFamily(UserStateKeys.MEMBER_ID));
      },
    []
  );

  /**localstorage값으로 상태 업데이트*/
  const hydrateUserData = useCallback(() => {
    refreshLogInState();
    refreshAuthToken();
    refreshLoggedUser();
    refreshMemberId();
    resetLogInState();
    resetAuthToken();
    resetLoggedUser();
    resetMemberId();
  }, []);

  /**localstorage값으로 상태 업데이트*/
  const hydrateAuthToken = useCallback(() => {
    refreshAuthToken();
    resetAuthToken();
  }, []);
  return { hydrateUserData, hydrateAuthToken };
};

export default useHydrateUserData;
