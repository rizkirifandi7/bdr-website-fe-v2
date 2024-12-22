import { Soup } from "lucide-react";
import React from "react";

const FilterMenu = ({ namafilter, onClick }) => {
	return (
		<button className="flex gap-2 justify-start items-center p-3 border rounded-md" onClick={onClick}>
			<div className="p-2 border rounded-md">
				<Soup size={32} />
			</div>
			<h1 className='text-base font-semibold'>{namafilter}</h1>
		</button>
	);
};

export default FilterMenu;
