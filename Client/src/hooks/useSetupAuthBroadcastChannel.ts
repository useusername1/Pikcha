import { useCallback } from "react";
import { BroadcastAuthMessages } from "./useAuthPostMessage";
import useBroadCastChannel from "./useBroadcastChannel";
import useHydrateUserData from "./useHydrateUserData";

const useSetupAuthBroadcastChannel = () => {
  const { hydrateUserData, hydrateAuthToken } = useHydrateUserData();

  const handleAuthMessage = useCallback(
    (e: MessageEvent) => {
      if (e.data === BroadcastAuthMessages.LOGIN) {
        hydrateUserData();
      } else if (e.data === BroadcastAuthMessages.LOGOUT) {
        window.location.href = "/";
      } else if (e.data === BroadcastAuthMessages.UPDATE_TOKEN) {
        hydrateAuthToken();
      }
    },
    [hydrateUserData, hydrateAuthToken]
  );

  useBroadCastChannel("auth", handleAuthMessage);
};
export default useSetupAuthBroadcastChannel;
