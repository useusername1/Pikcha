const charMap: Record<string, string> = {
  "!": "%21",
  "'": "%27",
  "(": "%28",
  ")": "%29",
  "*": "%2A",
  " ": "%20",
};

/**background-image url()을 위한 주소 문자열 인코딩 */
function encodeURLForBackgroundImage(url: string) {
  return url.replace(/[ !'()*]/g, (c) => charMap[c]);
}
export default encodeURLForBackgroundImage;
