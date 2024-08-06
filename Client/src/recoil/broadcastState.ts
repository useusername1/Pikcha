import { AtomEffect, atomFamily } from "recoil";

export type ChannelName = "auth";

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

export const broadcastchannelsStateFamily = atomFamily<
  BroadcastChannel | null,
  ChannelName
>({
  key: "BroadcastChannels",
  default: null,
  effects: (param: ChannelName) => [generateChannelEffect(param)],
});
