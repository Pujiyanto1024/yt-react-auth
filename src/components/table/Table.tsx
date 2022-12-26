import React, { FC, useState, useEffect } from "react";
import ColumnAttributes from "../../interface/ColumnInterface";
import { useNavigate } from "react-router-dom";

interface TableProps {
	data: Array<any>,
	column: Array<ColumnAttributes>,
	useAction: boolean,
	urlEdit?: string,
	onDelete: () => void
}

const Table: FC<TableProps> = ({ data, column, useAction, urlEdit, onDelete }) => {
	const navigate = useNavigate(); 
	return (
		<div className=" overflow-x-auto">
			<table className=" w-full text-sm text-left text-gray-500 mt-5">
				<thead className=" text-xs text-gray-700 uppercase border-b-2 border-b-primary-first">
					<tr>
						{column.map((item: ColumnAttributes, index: number) =>
							<th key={'th' + index} scope="col" className=" py-3 px-6 whitespace-nowrap">{item.heading}</th>
						)}
						{
							useAction ? 
								<th scope="col" className=" py-3 px-6 whitespace-nowrap">Action</th> : null
						}
					</tr>
				</thead>
				<tbody>
					{data.map((item, index) =>
						<tr key={'tr' + index}>
							{
								column.map((dt, idx) =>
									<td key={'td' + idx} className="py-4 px-6 whitespace-nowrap">{item[dt.keyValue] ? item[dt.keyValue]?.toString() : ''}</td>
								)
							}
							{
								useAction ?
									<td className="py-4 px-6">
										<div className=" flex items-center gap-x-2">
											<button onClick={() => navigate(`${urlEdit}/${item?.id}`)}>Edit</button>
											<button onClick={onDelete}>Delete</button>
										</div>
									</td> : null
							}
						</tr>
					)}
				</tbody>
			</table>
		</div>
	)
};

export default Table;