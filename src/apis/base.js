import axios from "axios";
import { useSelector } from "react-redux";

// const BASE_URL2 = "http://localhost:8080";
const BASE_URL2 = "https://shoes-sh0p.herokuapp.com"
const BASE_URL = `${BASE_URL2}/api`;


const instanceAxios = axios.create({
  baseURL: BASE_URL,
});

const useAuthAxios = () => {
  const { token } = useSelector((state) => state.auth);
  const authAxios = axios.create({
    baseURL: BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return authAxios;
};

export { useAuthAxios, BASE_URL2 };

export default instanceAxios;
