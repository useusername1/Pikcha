import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { UserDataAtomFamily } from "../recoil/auth";
import useAuthPostMessage from "../hooks/useAuthPostMessage";
import { flushSync } from "react-dom";

import useNavigateToStoredLocation from "../hooks/useNavigateToStoredLocation";

const OAuth = () => {
  const setIsLogin = useSetRecoilState(UserDataAtomFamily.LOGIN_STATE);
  const setToken = useSetRecoilState(UserDataAtomFamily.AUTH_TOKEN);
  const setMemberID = useSetRecoilState(UserDataAtomFamily.MEMBER_ID);
  const { postLogin } = useAuthPostMessage();
  const [searchParams] = useSearchParams();
  const navigateToStoredLocation = useNavigateToStoredLocation();

  useEffect(() => {
    const memberId = Number(searchParams.get("id"));
    const accessToken = searchParams.get("accessToken");
    flushSync(() => {
      setIsLogin(true);
      setMemberID(memberId);
      setToken(`Bearer ${accessToken}`);
    });
    postLogin();
    navigateToStoredLocation();
  }, []);
  return null;
};

export default OAuth;
