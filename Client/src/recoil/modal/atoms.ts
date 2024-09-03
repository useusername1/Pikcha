import { atom } from "recoil";
import { storeLocation } from "~/utils/storeLocation";

export const isLoginModalVisibleAtom = atom({
  key: "isLoginModalVisibleAtom",
  default: false,
  effects: [
    ({ onSet }) => {
      onSet((newState) => {
        if (newState === true) {
          storeLocation();
        }
      });
    },
  ],
});
//isModalVisible=>isLoginModalVisible
