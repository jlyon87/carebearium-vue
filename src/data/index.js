import axios from "axios";

const baseURL = process.env.NODE_ENV === "production" ? "" : "http://localhost:3030/auth";

export const authInstance = axios.create({
	baseURL,
});