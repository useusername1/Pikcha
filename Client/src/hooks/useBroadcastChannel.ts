import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import {
  ChannelName,
  broadcastchannelsStateFamily,
} from "../recoil/broadcastState";

type BroadcastEventHandler = (e: MessageEvent) => void;
/**Broadcast채널을 생성하고 이벤트 리스너를 등록 */
const useBroadCastChannel = (
  channelName: ChannelName,
  eventHandler: BroadcastEventHandler
) => {
  const broadcastChannel = useRecoilValue(
    broadcastchannelsStateFamily(channelName)
  );

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      eventHandler(e);
    };
    broadcastChannel?.addEventListener("message", handleMessage);

    return () => {
      broadcastChannel?.removeEventListener("message", handleMessage);
    };
  }, [broadcastChannel, eventHandler]);
};

export default useBroadCastChannel;
