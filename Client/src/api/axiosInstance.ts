import axios from "axios";

axios.defaults.withCredentials = true;

const apiClient = axios.create({
  baseURL: `${process.env.REACT_APP_HOST}`,
  withCredentials: true,
});

export { apiClient };
