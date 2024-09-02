import { atom } from "recoil";
import { UserType } from "~/utils/d";

export const isMyPageDeleteModeAtom = atom<boolean>({
  key: "isMyPageDeleteModeAtom",
  default: false,
});
//DeleteModeState

export const isMypageEditModeAtom = atom<boolean>({
  key: "isMypageEditModeAtom",
  default: false,
});

//Editmodestate
export const myPageUserDataAtom = atom<UserType | null>({
  key: "myPageUserDataAtom",
  default: null,
});

//userdata
