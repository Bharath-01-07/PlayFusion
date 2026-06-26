import axios from "axios";

const API = axios.create({
  baseURL: "https://playfusion-production.up.railway.app"
});

export default API;