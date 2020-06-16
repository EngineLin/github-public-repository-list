import axios from "axios";

const http = axios.create({
  baseURL: "https://api.github.com",
  timeout: 3000
});

export default http;

