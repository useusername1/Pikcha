import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { UserDataAtomFamily, withTokenRenewalRequired } from "../recoil/auth";
import { Outlet, useNavigate } from "react-router-dom";
import { storeLocation } from "../utils/storeLocation";
import { useTokenRenewalContext } from "../context/TokenRenewalContext";
import Loading from "../pages/Loading";

const ProtectedRoute = () => {
  const isLoggedIn = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const isTokenRenewalRequired = useRecoilValue(withTokenRenewalRequired);
  const { manageAccessTokenRenewal } = useTokenRenewalContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      storeLocation();
      navigate("/login");
    } else if (isTokenRenewalRequired || isTokenRenewalRequired === null) {
      manageAccessTokenRenewal();
    }
  }, [isLoggedIn, isTokenRenewalRequired]);

  if (isTokenRenewalRequired === false) {
    return <Outlet />;
  }
  return <Loading />;
};

export default ProtectedRoute;
