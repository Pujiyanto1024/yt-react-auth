import React, { FC } from "react";

interface HeaderProps {
	logout: () => void,
	changeOpen: () => void
}

const Header: FC<HeaderProps> = ({logout, changeOpen}) => {

	return (
		<div className={`fixed top-0 left-0 lg:left-64 right-0 h-16 bg-green-400 flex justify-between items-center px-8`}>
			<div className="flex gap-x-4">
				<button onClick={changeOpen} className=" inline-block lg:hidden">Show</button>
				<p>Header</p>
			</div>
			<button className="" onClick={logout}>Logout</button>
		</div>
	)
}

export default Header;