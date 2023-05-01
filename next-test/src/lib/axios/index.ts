import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:3001/v1",
  headers: { "Content-Type": "application/json" }
});

export const axiosAuth = axios.create({
  baseURL: "http://localhost:3001/v1",
  headers: { "Content-Type": "application/json" }
})
