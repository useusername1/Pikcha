/** Base64Url 디코딩 함수 */
const base64UrlDecode = (str: string) => {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  base64 += padding;
  return window.atob(base64);
};

/** JWT 토큰을 디코딩하는 함수 */
const decodeJwtToken = (token: string) => {
  const [, payload] = token.split(".");
  if (!payload) throw new Error("Invalid token format");

  const decodedPayload = base64UrlDecode(payload);
  return JSON.parse(decodedPayload);
};

/** 토큰의 exp를 반환하는 함수 */
export const getAccesstokenExpiration = (token: string) => {
  try {
    const decoded = decodeJwtToken(token);
    return decoded.exp;
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
};

/** 토큰의 남은 시간을 계산하는 함수 (초 단위) */
export const calculateTokenRemainingTime = (exp: number) => {
  const currentTime = Math.floor(Date.now() / 1000); // 현재 시간을 초 단위로 계산
  return exp - currentTime; // 남은 시간 (초 단위)
};
