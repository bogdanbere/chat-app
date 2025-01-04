import axios from "axios";

// Send requests to localhost when using npm run dev and to /api in production
// Send cookies with the requests
export const axiosInstance = axios.create({
  baseURL:
    import.meta.env.MODE === "development" ? "http://localhost:6969" : "/",
  withCredentials: true,
});
