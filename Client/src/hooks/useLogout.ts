import { useCallback } from "react";
import useAuthPostMessage from "./useAuthPostMessage";

const useLogout = () => {
  const { postLogout } = useAuthPostMessage();

  const handleLogout = useCallback(() => {
    localStorage.clear();
    postLogout();
    window.location.reload();
  }, [postLogout]);

  /**리프레쉬 토큰 만료 처리*/
  const handleRefreshTokenExpiry = useCallback(() => {
    alert("로그인이 필요합니다");
    handleLogout();
  }, [handleLogout]);

  return { handleLogout, handleRefreshTokenExpiry };
};

export default useLogout;
