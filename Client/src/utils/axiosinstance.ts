import Axios, { AxiosError } from "axios";

const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_HOST}`,
  withCredentials: true,
});

let reFreshFunc: Promise<void> | null = null;
interface ErrorResponse {
  message: string;
}

function handleTokenExpiry() {
  localStorage.clear();
  alert("로그인이 필요합니다");
  window.location.replace("/");
}

async function renewToken() {
  console.log("try to renew accesstoken");
  //refreshtoken으로 accesstoken을 재발급받고
  //정상발급인 경우 localstorage accesstoken값 갱신
  //리프레쉬 토큰 만료 시 main페이지로 이동
  try {
    const memberId = localStorage.getItem("memberId");
    const { data } = await Axios.get(
      `${process.env.REACT_APP_HOST}/token/refresh/${memberId}`,
      {
        headers: {
          Authorization: null,
        },
      }
    );
    localStorage.setItem("Authorization", `${data.data.accessToken}`);
    localStorage.setItem("loginStatus", "true");
  } catch (error) {
    const rTokenError = error as AxiosError<ErrorResponse>;
    if (rTokenError.response) {
      const { status, data } = rTokenError.response;
      if (status === 400 && data?.message === "RefreshToken Expired") {
        handleTokenExpiry();
      }
    }
  }
}

axios.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("Authorization");
    config.headers["Authorization"] = accessToken;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (error: AxiosError<ErrorResponse>) => {
    if (error.response && error.config) {
      const {
        config: originalRequest,
        response: { status, data },
      } = error;
      const isTokenIssue =
        (status === 400 && data.message === "Token Expired") ||
        (status === 404 && data.message === "Token not found");
      if (isTokenIssue) {
        if (!reFreshFunc) {
          reFreshFunc = renewToken();
        }
        await reFreshFunc;
        reFreshFunc = null;
        return axios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default axios;
