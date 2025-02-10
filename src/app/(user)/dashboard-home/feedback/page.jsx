"use client";

import * as React from "react";
import axios from "axios";
import HapusFeedback from "./components/HapusFeedback";
import { toast } from "sonner";
import TableView from "@/components/dashboard/table-view";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

const PageFeedback = () => {
	const [dataUser, setDataUser] = React.useState([]);

	const generateStars = (rating) => {
		const stars = [];
		for (let i = 0; i < 5; i++) {
			if (i < rating) {
				stars.push(<span key={i}>&#9733;</span>); // Filled star
			} else {
				stars.push(<span key={i}>&#9734;</span>); // Empty star
			}
		}
		return stars;
	};

	const columns = [
		{
			accessorKey: "nama",
			header: "Nama",
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue("nama") ? row.getValue("nama") : "Tidak Ada Nama"}
				</div>
			),
		},
		{
			accessorKey: "nomor_hp",
			header: "No.Telepon",
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue("nomor_hp")
						? row.getValue("nomor_hp")
						: "Tidak Ada Nomor"}
				</div>
			),
		},
		{
			accessorKey: "rating_menu",
			header: "Rating Menu",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Rating Menu
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue("rating_menu")
						? generateStars(row.getValue("rating_menu"))
						: "Tidak ada rating"}
				</div>
			),
		},
		{
			accessorKey: "rating_pelayanan",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Rating Pelayanan
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue("rating_pelayanan")
						? generateStars(row.getValue("rating_pelayanan"))
						: "Tidak ada rating"}
				</div>
			),
		},
		{
			accessorKey: "rating_restoran",
			header: ({ column }) => {
				return (
					<Button
						variant="ghost"
						onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
					>
						Rating Restoran
						<ArrowUpDown className="ml-2 h-4 w-4" />
					</Button>
				);
			},
			cell: ({ row }) => (
				<div className="capitalize">
					{row.getValue("rating_restoran")
						? generateStars(row.getValue("rating_restoran"))
						: "Tidak ada rating"}
				</div>
			),
		},
		{
			accessorKey: "saran",
			header: "Saran",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("saran")}</div>
			),
		},
		{
			accessorKey: "kritik",
			header: "Kritik",
			cell: ({ row }) => (
				<div className="capitalize">{row.getValue("kritik")}</div>
			),
		},
		{
			id: "actions",
			enableHiding: false,
			cell: ({ row }) => {
				const id = row.original.id;
				return (
					<div>
						<HapusFeedback id={id} fetchDataFeedback={fetchDataFeedback} />
					</div>
				);
			},
		},
	];

	const fetchDataFeedback = React.useCallback(async () => {
		const response = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/feedback`
		);

		if (response.status !== 200) {
			toast.error("Failed to fetch data");
			return;
		}

		const reversedData = response.data.data.reverse();
		setDataUser(reversedData);
	}, []);

	React.useEffect(() => {
		fetchDataFeedback();
	}, [fetchDataFeedback]);

	return (
		<>
			<TableView
				columns={columns}
				data={dataUser}
				fetchData={fetchDataFeedback}
				title="Dashboard Feedback"
				search="nama"
			/>
		</>
	);
};

export default PageFeedback;
