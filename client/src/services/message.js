import { axiosInstance as axios } from "./axios";
const baseUrl = "/api/message";

const getMessages = async (receiver) => {
  const res = await axios.get(`${baseUrl}/${receiver}`);
  return res.data;
};

const sendMessage = async (receiver, message) => {
  const res = await axios.post(`${baseUrl}/${receiver}`, message);
  return res.data;
};

export default { getMessages, sendMessage };
