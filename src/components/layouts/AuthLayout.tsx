import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom"
import Header from "./Header";
import Sidebar from "./Sidebar";
import Http from "../../helpers/Fetch";
import LoadingScreen from "./LoadingScreen";

import AuthUser from "../../helpers/AuthUser";


interface AuthLayoutProps {
	children: React.ReactNode
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
	const navigate = useNavigate();
	const user = AuthUser.GetAuth();
	const [open, setOpen] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const logout = async() => {
		setLoading(true)
		try {
			const res = await Http.get("/user/logout", { withCredentials: true, headers: { 'Authorization': `Bearer ${user?.token}` } });
			console.log(res.data);
			AuthUser.RemoveAuth();
			navigate("/auth/login");
			setLoading(false);
		} catch (error:any) {
			console.log(error?.response);
			setLoading(false);
		}
	}

	return loading ? (
		<LoadingScreen />
	) : (
		<div className="flex relative bg-gray-100 overflow-x-hidden min-h-screen antialiased">
			<Sidebar open={open} closeMenu={() => setOpen(!open)} />
			<div className="w-full relative ml-0 lg:ml-64">
				<Header logout={logout} changeOpen={() => setOpen(!open)} />
				<main className="w-full mt-16">
					{children}
				</main>
			</div>
		</div>
	)
}

export default AuthLayout;