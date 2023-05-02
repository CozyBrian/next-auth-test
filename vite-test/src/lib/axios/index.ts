import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/v1",
  withCredentials: true,
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:3001/v1",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
})