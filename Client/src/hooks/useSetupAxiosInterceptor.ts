import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { UserDataAtomFamily } from "../recoil/auth";
import { AxiosError } from "axios";
import { apiClient } from "../api/axiosInstance";
import { checkTokenIssue } from "./utils/checkTokenIssue";
import { useTokenRenewalContext } from "../context/TokenRenewalContext";

interface ErrorResponse {
  message: string;
}

const useSetupAxiosInterceptor = () => {
  const isLoggedIn = useRecoilValue(UserDataAtomFamily.LOGIN_STATE);
  const accessToken = useRecoilValue(UserDataAtomFamily.AUTH_TOKEN);
  const { manageAccessTokenRenewal } = useTokenRenewalContext();

  useEffect(() => {
    const reqInterceptor = apiClient.interceptors.request.use(
      (config) => {
        if (isLoggedIn) config.headers["Authorization"] = accessToken;
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    return () => {
      apiClient.interceptors.request.eject(reqInterceptor);
    };
  }, [isLoggedIn, accessToken]);

  useEffect(() => {
    const resInterceptor = apiClient.interceptors.response.use(
      (res) => {
        return res;
      },
      async (error: AxiosError<ErrorResponse>) => {
        if (error.response && error.config) {
          const {
            config: originalRequest,
            response: { status, data },
          } = error;
          if (checkTokenIssue(status, data.message)) {
            const isTokenRenewed = await manageAccessTokenRenewal();
            if (isTokenRenewed) {
              return apiClient(originalRequest);
            }
          }
        }
        return Promise.reject(error);
      }
    );
    return () => {
      apiClient.interceptors.response.eject(resInterceptor);
    };
  }, []);
};

export default useSetupAxiosInterceptor;
