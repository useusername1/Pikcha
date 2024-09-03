const getTime = (time: string) => {
  return new Intl.DateTimeFormat("ko", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(time));
};

export default getTime;
