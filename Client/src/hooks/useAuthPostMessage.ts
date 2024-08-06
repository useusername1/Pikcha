import { useCallback } from "react";
import { useRecoilValue } from "recoil";
import { broadcastchannelsStateFamily } from "../recoil/broadcastState";
import { runNextTick } from "../utils/runNextTick";

export const BroadcastAuthMessages = {
  LOGIN: "login",
  LOGOUT: "logout",
  UPDATE_TOKEN: "update_token",
};

/** 인증관련 메시지를 보내는 함수를 반환*/
const useAuthPostMessage = () => {
  const channel = useRecoilValue(broadcastchannelsStateFamily("auth"));

  const postLogin = useCallback(() => {
    runNextTick(() => {
      channel?.postMessage(BroadcastAuthMessages.LOGIN);
    });
  }, [channel]);

  const postLogout = useCallback(() => {
    runNextTick(() => {
      channel?.postMessage(BroadcastAuthMessages.LOGOUT);
    });
  }, [channel]);

  const postUpdateToken = useCallback(() => {
    runNextTick(() => {
      channel?.postMessage(BroadcastAuthMessages.UPDATE_TOKEN);
    });
  }, [channel]);

  return { postLogin, postLogout, postUpdateToken };
};
export default useAuthPostMessage;
