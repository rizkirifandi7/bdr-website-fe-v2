"use client";
import React, { useState, useEffect, useCallback } from "react";
import FilterMenu from "./components/FilterMenu";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { MdOutlineFoodBank } from "react-icons/md";
import { formatRupiahShort } from "@/lib/formatRupiah";

const MenuPage = () => {
	const [dataMenus, setDataMenus] = useState([]);
	const [dataFilterMenu, setDataFilterMenu] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);

	const fetchData = useCallback(async () => {
		const [menuResponse, kategoriResponse] = await Promise.all([
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`),
			fetch(`${process.env.NEXT_PUBLIC_API_URL}/kategori`),
		]);

		const menuData = await menuResponse.json();
		const kategoriData = await kategoriResponse.json();

		setDataMenus(menuData.data);
		setDataFilterMenu(kategoriData.data);
	}, []);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleCategorySelect = (category) => {
		setSelectedCategory(category);
	};

	const filteredMenus = selectedCategory
		? dataMenus.filter((menu) => menu.id_kategori === selectedCategory.id)
		: dataMenus;

	return (
		<>
			<div className="h-full max-w-screen-xl mx-auto px-6">
				<div className="flex justify-center items-center hero-header h-[300px] rounded-b-md">
					<h1 className="text-3xl md:text-5xl font-bold text-white pt-14">
						DAFTAR MENU
					</h1>
				</div>
				<div className="h-full my-10">
					<div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-4">
						{dataFilterMenu.map((data) => (
							<FilterMenu
								key={data.id}
								namafilter={data.nama_kategori}
								onClick={() => handleCategorySelect(data)}
							/>
						))}
					</div>
					<div className="mt-10">
						<div className="flex items-center">
							<h1 className="font-semibold text-2xl w-[250px]">
								{selectedCategory
									? selectedCategory.nama_kategori
									: "Semua Menu"}
							</h1>
							<hr className="w-full" />
						</div>
						{filteredMenus.length > 0 ? (
							<div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-4">
								{filteredMenus.map((data) => (
									<Card key={data.id} className="flex-col rounded-md p-3">
										<div className="bg-slate-100 rounded-lg">
											<Image
												src={data.gambar}
												alt={data.nama_menu}
												width={300}
												height={300}
												className="w-full h-[250px] rounded-sm object-cover"
											/>
										</div>
										<div className="flex flex-col w-full my-4">
											<div className="flex items-center justify-between">
												<p className="font-semibold">{data.nama_menu}</p>
												<p className="font-semibold">{formatRupiahShort(data.harga)}</p>
											</div>
											<p className="text-gray-400 w-full text-sm">
												{data.deskripsi}
											</p>
										</div>
									</Card>
								))}
							</div>
						) : (
							<div className="flex flex-col h-[500px] justify-center items-center">
								<MdOutlineFoodBank className="text-5xl" />
								<h1 className="text-center text-2xl font-semibold">
									Tidak ada menu
								</h1>
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default MenuPage;
