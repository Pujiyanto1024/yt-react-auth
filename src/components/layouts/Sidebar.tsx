import React, { FC } from "react";
import AuthUser from "../../helpers/AuthUser";
import { Link } from "react-router-dom"

interface SidebarProps {
	open: boolean,
	closeMenu: () => void
}

const Sidebar: FC<SidebarProps> = ({open, closeMenu}) => {
	const user = AuthUser.GetAuth();

	return (
		<div className={`fixed w-full lg:w-64 bg-white h-screen transform transition-all duration-300 z-20 lg:translate-x-0 overflow-y-auto ${open ? 'translate-x-0' : '-translate-x-full'}`}>
			<div className="absolute top-3 right-3">
				<button onClick={closeMenu} className=" inline-block lg:hidden" >Close</button>
			</div>
			<div className=" pt-20">
				{
					user?.menuAccess?.map((item, index) =>
						<div key={'menu' + index} className="px-4">
							<p>{item?.name}</p>
							{
								item?.Submenus?.map((sub:any, idx:any) =>
									<div key={"sub"+idx} className="px-4">
										<Link to={sub?.url}>{sub?.name}</Link>
									</div>
								)
							}
						</div>
					)
				}
			</div>
		</div>
	)
};

export default Sidebar;