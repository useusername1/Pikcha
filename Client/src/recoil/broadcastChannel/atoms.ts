import { AtomEffect, atomFamily } from "recoil";
import { ChannelName } from "~/@types/broadcastChannel.types";

const generateChannelEffect =
  (channelName: ChannelName): AtomEffect<BroadcastChannel | null> =>
  ({ setSelf, trigger, node, getLoadable }) => {
    if (trigger === "get") {
      setSelf(new BroadcastChannel(channelName));
    }
    return () => {
      let loadable = getLoadable(node);
      loadable.contents?.close();
    };
  };

export const broadcastchannelsAtomFamily = atomFamily<
  BroadcastChannel | null,
  ChannelName
>({
  key: "BroadcastChannels",
  default: null,
  effects: (param: ChannelName) => [generateChannelEffect(param)],
});
