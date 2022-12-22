import React, { FC } from "react";

interface HeaderProps {
	logout: () => void
}

const Header: FC<HeaderProps> = ({logout}) => {

	return (
		<div className={`fixed top-0 left-64 right-0 h-16 bg-green-400 flex justify-between items-center px-8`}>
			<p>Header</p>
			<button className="" onClick={logout}>Logout</button>
		</div>
	)
}

export default Header;