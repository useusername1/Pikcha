export const LOCATION_LOCAL_KEY = "LOCATION";
/**현재 url path를 sessionstorage에 저장*/
export const storeLocation = () => {
  const { pathname, search } = window.location;
  const locationData = { pathname, search };
  sessionStorage.setItem(LOCATION_LOCAL_KEY, JSON.stringify(locationData));
};
