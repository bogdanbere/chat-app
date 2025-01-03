import { axiosInstance as axios } from "./axios";
const baseUrl = "/api/authentication";

const login = async (credentials) => {
  const res = await axios.post(`${baseUrl}/login`, credentials);
  return res.data;
};

const logout = async () => {
  const res = await axios.post(`${baseUrl}/logout`);
  return res.data;
};

export default { login, logout };
