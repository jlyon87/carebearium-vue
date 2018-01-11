import axios from "axios";

// add comment to test ssh config
const baseURL = "http://localhost:3030";

export const authInstance = axios.create({
	baseURL: baseURL + "/auth",
});