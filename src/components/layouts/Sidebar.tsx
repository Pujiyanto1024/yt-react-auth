import React, { FC } from "react";
import AuthUser from "../../helpers/AuthUser";
import { Link } from "react-router-dom"

const Sidebar: FC = () => {
	const user = AuthUser.GetAuth();

	return (
		<div className={`fixed w-64 bg-white h-screen overflow-y-auto`}>
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