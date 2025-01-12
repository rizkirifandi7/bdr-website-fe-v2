"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import * as XLSX from "xlsx";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useParams } from "next/navigation";

const PageUnduhLaporanPenjualanMitra = () => {
	const { id } = useParams();
	const [data, setData] = useState([]);
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");

	useEffect(() => {
		const fetchtListPesanan = async () => {
			try {
				const response = await axios.get(
					`${process.env.NEXT_PUBLIC_API_URL}/pesanan/user/${id}`
				);
				setData(response.data.data);
			} catch (error) {
				console.error("Error fetch list pesanan:", error);
			}
		};

		fetchtListPesanan();
	}, []);

	const filterDataByDate = () => {
		const filteredData = data.filter((item) => {
			const orderDate = new Date(item.order_time);
			return (
				item.status === "completed" &&
				(!startDate || orderDate >= new Date(startDate)) &&
				(!endDate || orderDate <= new Date(endDate))
			);
		});

		const aggregatedData = {};

		filteredData.forEach((item) => {
			item.item_pesanan.forEach((pesanan) => {
				const menuName = pesanan.menu.nama_menu;
				if (!aggregatedData[menuName]) {
					aggregatedData[menuName] = {
						Tanggal: new Date(item.order_time).toLocaleDateString(),
						"Nama Menu": menuName,
						Qty: 0,
						"Harga Menu": pesanan.menu.harga,
						"Total Penjualan": 0,
					};
				}
				aggregatedData[menuName].Qty += pesanan.jumlah;
				aggregatedData[menuName]["Total Penjualan"] += pesanan.subtotal;
			});
		});

		return Object.values(aggregatedData);
	};

	const exportJsonToExcel = () => {
		const extractedData = filterDataByDate();
		const excelHeader = [
			"Tanggal",
			"Nama Menu",
			"Qty",
			"Harga Menu",
			"Total Penjualan",
		];

		const workbook = XLSX.utils.book_new();
		const worksheet = XLSX.utils.json_to_sheet(extractedData);

		// Add header row
		XLSX.utils.sheet_add_aoa(worksheet, [excelHeader], { origin: "A1" });

		// Set column widths
		let wscols = excelHeader.map((header) => ({ wch: header.length + 5 }));
		worksheet["!cols"] = wscols;

		// Calculate total penjualan
		const totalPenjualan = extractedData.reduce(
			(sum, row) => sum + row["Total Penjualan"],
			0
		);

		// Add total row
		const totalRow = ["", "", "", "Total", totalPenjualan];
		XLSX.utils.sheet_add_aoa(worksheet, [totalRow], {
			origin: `A${extractedData.length + 2}`,
		});

		XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
		XLSX.writeFile(workbook, "laporan-penjualan.xlsx");
	};

	return (
		<>
			<Link href="/dashboard-superadmin/laporan-penjualan">
				<Button variant="ghost" className="mb-4">
					<FaArrowLeftLong />
					Kembali
				</Button>
			</Link>
			<div className="flex flex-col justify-center items-center gap-4 w-full">
				<h1 className="text-2xl font-bold mb-4">Unduh Laporan Penjualan</h1>

				<Card className="flex flex-col gap-4 max-w-xl p-4 w-full">
					<div className="">
						<Label>Tanggal Mulai</Label>
						<Input
							type="date"
							value={startDate}
							onChange={(e) => setStartDate(e.target.value)}
						/>
					</div>
					<div className="">
						<Label>Tanggal Akhir</Label>
						<Input
							type="date"
							value={endDate}
							onChange={(e) => setEndDate(e.target.value)}
						/>
					</div>
					<Button onClick={exportJsonToExcel} className="w-fit">
						Unduh Laporan Penjualan
					</Button>
				</Card>
			</div>
		</>
	);
};

export default PageUnduhLaporanPenjualanMitra;
