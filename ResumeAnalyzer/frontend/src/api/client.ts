import axios from "axios";

const client = axios.create({
  baseURL: "/api", // change to your backend URL in production
  headers: { "Content-Type": "application/json" },
});

export default client;
