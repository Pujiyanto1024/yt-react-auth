import React, { FC } from "react";
import Logo from "../../assets/logo/logo2.png";

const LoadingScreen: FC = () => {
	return (
		<div className=" w-screen h-screen flex justify-center items-center">
			<img src={Logo} alt="logo" className=" animate-bounce" />
		</div>
	)
}

export default LoadingScreen