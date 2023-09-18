import { axiosConfig } from "@/config/axiosConfig";
import { setAxiosConfigToken } from "@/interceptors/token";

export class Api {
	constructor() {}

	async init<T>(): Promise<{apiConnected: boolean; initData: T}> {
		try {
			await setAxiosConfigToken();
		} catch (err) {
			console.log(err);
		}
		return axiosConfig
			.post("init")
			.then((res) => {
				return {
					apiConnected: true,
					initData: res.data.data as T
				};
			})
			.catch((err) => {
				alert(err.message);
				throw err;
			});
	}

}
