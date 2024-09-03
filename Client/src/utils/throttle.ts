export const throttle = (callback: Function, delay: number, e?: MouseEvent) => {
  let timerId: ReturnType<typeof setTimeout> | null = null;
  return () => {
    if (timerId) {
      return;
    }
    timerId = setTimeout(() => {
      callback(e);
      timerId = null;
    }, delay);
  };
};
