import axios from "axios";

const baseURL = "http://localhost:3030";

export const authInstance = axios.create({
	baseURL: baseURL + "/auth",
});