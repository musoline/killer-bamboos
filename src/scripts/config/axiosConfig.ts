import axios from "axios";

const defineBaseURLforGameMode = () =>"https://test.com/killer-bamboos";

const defineBaseURL = () => (PRODUCTION ? defineBaseURLforGameMode() : "http://localhost:3000/killer-bamboos/");

export const axiosConfig = axios.create({
	// unfinished. will be changed by actual website in prod
	baseURL: defineBaseURL(),
	withCredentials: true
});
