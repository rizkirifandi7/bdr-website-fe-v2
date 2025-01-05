import { Button } from "@/components/ui/button";
import { Soup } from "lucide-react";
import React from "react";

const FilterMenu = ({ namafilter, onClick }) => {
	return (
		<Button className="flex items-center gap-2 w-fit shadow-none" variant="outline" onClick={onClick}>
			<Soup size={32} /> {namafilter}
		</Button>
	);
};

export default FilterMenu;
