import { axiosInstance as axios } from "./axios";
const baseUrl = "/api/user";

const getMe = async () => {
  const res = await axios.get(`${baseUrl}/me`);
  return res.data;
};

const getById = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`);
  return res.data;
};

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const signup = async (credentials) => {
  const res = await axios.post(baseUrl, credentials);
  return res.data;
};

const update = async (updatedUserObj) => {
  const res = await axios.put(baseUrl, updatedUserObj);
  return res.data;
};

const updateFriends = async (friend) => {
  const res = await axios.put(`${baseUrl}/add-friend`, friend);
  return res.data;
};

export default { getAll, signup, update, getMe, updateFriends, getById };
