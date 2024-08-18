import Axios from "axios";

const axios = Axios.create({
  baseURL: `${process.env.REACT_APP_HOST}`,
  withCredentials: true,
});

export default axios;
