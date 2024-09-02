const TOKEN_MESSAGES = {
  EXPIRED: "Token Expired",
  NOT_FOUND: "Token not found",
  REFRESH_EXPIRED: "RefreshToken Expired",
} as const;

/**accesstoken만료 또는 누락인지 확인*/
export function checkTokenIssue(status: number, message: string) {
  return (
    (status === 400 && message === TOKEN_MESSAGES.EXPIRED) ||
    (status === 404 && message === TOKEN_MESSAGES.NOT_FOUND)
  );
}
