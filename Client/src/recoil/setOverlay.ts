import { atom } from "recoil";
import { storeLocation } from "../utils/storeLocation";

export const setOverlay = atom({
  key: "setOverlay",
  default: false,
});

export const isModalVisible = atom({
  key: "isModalVisible",
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
