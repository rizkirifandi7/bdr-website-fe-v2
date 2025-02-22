import React from "react";
const { FaStar } = require("react-icons/fa");

const StarRating = ({ rating, setRating }) => {
	const handleClick = (value) => {
		setRating(value);
	};

	return (
		<div className="flex justify-around items-center w-full">
			{[...Array(5)].map((_, index) => {
				const value = index + 1;
				return (
					<FaStar
						key={index}
						size={32}
						className={value <= rating ? "text-yellow-500" : "text-gray-300"}
						onClick={() => handleClick(value)}
					/>
				);
			})}
		</div>
	);
};

export default StarRating;
