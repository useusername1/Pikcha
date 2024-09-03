import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { broadcastchannelsAtomFamily } from "../recoil/broadcastChannel/atoms";
import { ChannelName } from "~/@types/broadcastChannel.types";

type BroadcastEventHandler = (e: MessageEvent) => void;
/**Broadcast채널을 생성하고 이벤트 리스너를 등록 */
const useBroadCastChannel = (
  channelName: ChannelName,
  eventHandler: BroadcastEventHandler
) => {
  const broadcastChannel = useRecoilValue(
    broadcastchannelsAtomFamily(channelName)
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
