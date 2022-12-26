import React from "react";
import { Routes, Route } from "react-router-dom";

import ProtectRoute from "./ProtectRoute";
import { LandingPage, NotFoundPage, Dashboard } from "../pages";

import {
	ViewMenu
} from "../pages/menu-management";

import { Register, Login } from "../pages/auth";

const Router = () => {
	return (
		<Routes>
			<Route path="/" element={ <LandingPage/> } />
			<Route path="/auth/register" element={ <Register/> } />
			<Route path="/auth/login" element={<Login />} />
			<Route path="/dashboard" element={
				<ProtectRoute>
					<Dashboard />
				</ProtectRoute>
			} />
			<Route path="/master-menu" element={
				<ProtectRoute>
					<ViewMenu />
				</ProtectRoute>
			} />
			
			<Route path="/*" element={ <NotFoundPage/> } />
		</Routes>
	)
};

export default Router;