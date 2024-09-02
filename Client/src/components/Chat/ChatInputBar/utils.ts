const splitEmoji = (emojis: string) =>
  [...new Intl.Segmenter().segment(emojis)].map((x) => x.segment);
const emojis =
  "😀😃😄😁😆😅🤣😂🙂🙃🫠😉😊😇🥰😍🤩😘😗😚😙🥲😋😛😜🤪😝🤑🤗🤭🫢🫣🤫🤔🫡🤐🤨😐😑😶🫥🤕🤢🤮🤧🥵🥶🥴😵😵‍💫🤯🤠🥳🥸😎";

const generateRandomEmoji = () => {
  const emojiArr = splitEmoji(emojis);
  const min = 0;
  const max = emojiArr.length - 1;
  return emojiArr[Math.floor(Math.random() * (max - min + 1) + min)];
};

export default generateRandomEmoji;
