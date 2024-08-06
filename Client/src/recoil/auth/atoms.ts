import { AtomEffect, RecoilState, RecoilValueReadOnly, atom } from "recoil";
import { withUserDefaultFamily } from "./withLocalstorage";
import { TUserData, UserStateKeys } from "./types";

const UserStatekeysArr = Object.keys(UserStateKeys) as UserStateKeys[];

const localStorageEffect =
  <T>(key: UserStateKeys): AtomEffect<T> =>
  ({ onSet }) => {
    onSet((newV, _, isReset) => {
      if (!isReset) {
        localStorage.setItem(key, JSON.stringify(newV));
      }
    });
  };

const createUserDataAtom = (
  key: UserStateKeys,
  defaultValue: RecoilValueReadOnly<TUserData[UserStateKeys]>
) => {
  return atom<TUserData[UserStateKeys]>({
    key,
    default: defaultValue,
    effects: [localStorageEffect<TUserData[UserStateKeys]>(key)],
  });
};

export const UserDataAtomFamily = UserStatekeysArr.reduce(
  (acc, key) => ({
    ...acc,
    [key]: createUserDataAtom(key, withUserDefaultFamily(key)),
  }),
  {}
) as { [T in UserStateKeys]: RecoilState<TUserData[T]> };
