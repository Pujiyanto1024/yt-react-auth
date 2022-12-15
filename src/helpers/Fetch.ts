import Axios, { AxiosRequestConfig } from "axios";
import jwt_decode from "jwt-decode";
import AuthAttributes from "../interface/AuthUserInterface";
import AuthUser from "./AuthUser";

const Http = Axios.create({
	baseURL: "http://localhost:7000/",
	timeout: 100000,
	headers: { 'content-type': 'application/json' }
});

Http.interceptors.request.use(async(req: AxiosRequestConfig) => {
	if (req.headers?.Authorization) {
		const authHeader = req.headers?.Authorization;

		const currentToken = authHeader && authHeader.toString().split(" ")[1];

		const decoded: any = currentToken && jwt_decode(currentToken);

		const expired = decoded?.exp;

		const currentDate = new Date();
		if (expired * 1000 < currentDate.getTime()) {
			const resData = await Http.get("http://localhost:7000/user/refresh-token", { withCredentials: true });
			const response: AuthAttributes = {
				id: resData.data?.data?.id,
				name: resData.data?.data?.name,
				email: resData.data?.data?.email,
				roleId: resData.data?.data?.roleId,
				token: resData.data?.data?.token,
				menuAccess: resData.data?.data?.menuAccess,
			}

			req.headers.Authorization = `Bearer ${resData?.data?.data?.token}`

			AuthUser.SetAuth(response);
		}
	}

	return req;
}, (err: any) => {
	return Promise.reject(err);
});

Http.interceptors.response.use((response) => {
	return response;

}, (error: any) => {
	return Promise.reject(error);
});

export default Http;