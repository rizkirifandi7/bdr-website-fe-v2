import { Textarea } from "@/components/ui/textarea";
import React from "react";

const OrderNotes = ({ setNote, note }) => {
	return (
		<div className="">
			<Textarea
				value={note}
				onChange={(e) => setNote(e.target.value)}
				className="w-full h-[80px]"
				placeholder="Catatan..."
			/>
		</div>
	);
};

export default OrderNotes;
