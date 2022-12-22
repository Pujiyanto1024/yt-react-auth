import React, { FC } from "react";
import Http from "../helpers/Fetch";
import AuthUser from "../helpers/AuthUser";

import { AuthLayout, LoadingScreen } from "../components/layouts";

const Dashboard: FC = () => {
	const user = AuthUser.GetAuth();

	const GetCurrentUser = async () => {
		try {
			const res = await Http.get("/user/current-user", { headers: { 'Authorization': `Bearer ${user?.token}` } });

			console.log(res.data);
		} catch (error:any) {
			console.log(error);
		}
	};

	return (
		<AuthLayout>
			<div className="">
				<p>Ini Dashboard</p>
				<button onClick={GetCurrentUser} className="btn btn-primary normal-case">Get Current User</button>
			</div>
		</AuthLayout>
	)
}

export default Dashboard;