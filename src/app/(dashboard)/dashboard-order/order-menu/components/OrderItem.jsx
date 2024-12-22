import React from "react";
import { MdAdd } from "react-icons/md";
import ItemMenu from "./ItemMenu";

const OrderItem = ({ totalQuantity, cart }) => {
	return (
		<div className="bg-white">
			<div className="flex flex-col p-4 rounded-lg border ">
				<div className="flex items-center mb-2">
					<h1 className="inline-flex items-center font-semibold text-lg">
						Ordered Items ({totalQuantity})
					</h1>
				</div>
				<div className="flex flex-col">
					{cart.map((data, index) => (
						<ItemMenu key={index} data={data} menu={"cart"} />
					))}
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
