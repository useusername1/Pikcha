import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { LOCATION_LOCAL_KEY } from "../utils/storeLocation";

const useNavigateToStoredLocation = () => {
  const navigate = useNavigate();

  /**로그인 완료시 이전 위치로 이동*/
  const navigateToStoredLocation = useCallback(() => {
    const storedLocation = sessionStorage.getItem(LOCATION_LOCAL_KEY);
    if (storedLocation) {
      const { pathname, search } = JSON.parse(storedLocation);
      const location = `${pathname}${search}`;
      navigate(location, { replace: true });
    } else {
      navigate("/", { replace: true });
    }
  }, []);

  return navigateToStoredLocation;
};

export default useNavigateToStoredLocation;
