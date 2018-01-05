import axios from "axios";

const baseUrl = process.env.NODE_ENV === "production" ? "" : "localhost:3030";

const instance = axios.create({
	baseUrl
});

export default instance;