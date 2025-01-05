"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Minus, Plus, Soup } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import FilterMenu from "./components/FilterMenu";
import { formatRupiah } from "@/lib/formatRupiah";
import { useCart } from "@/hooks/useCart";
import OrderItem from "./components/OrderItem";
import OrderNotes from "./components/OrderNotes";
import OrderPaymentMethod from "./components/OrderPaymentMethod";
import OrderSummary from "./components/OrderSummary";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { generateCodePayment } from "@/lib/generateId";
import { toast } from "sonner";

const fetchData = async (url) => {
	const response = await fetch(url);
	if (!response.ok) throw new Error("Failed to fetch data");
	return response.json();
};

const PageOrderMenu = () => {
	const [dataMenus, setDataMenus] = useState([]);
	const [dataFilterMenu, setDataFilterMenu] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const { addToCart, cart, removeFromCart, getTotalPrice, setCart } = useCart();
	const [codePayment, setCodePayment] = useState(generateCodePayment());
	const [tipePayment, setTipePayment] = useState("Cash");
	const [note, setNote] = useState("");
	const [name, setName] = useState("");
	const [typeOrder, setTypeOrder] = useState("");

	const totalQuantity = useMemo(
		() => cart.reduce((acc, item) => acc + item.quantity, 0),
		[cart]
	);
	const totalPrice = useMemo(() => getTotalPrice(), [getTotalPrice]);

	const itemsToOrder = useMemo(
		() =>
			cart.map(({ id, quantity, harga, nama_menu }) => ({
				id_menu: id,
				quantity,
				harga,
				nama: nama_menu,
			})),
		[cart]
	);

	useEffect(() => {
		const loadData = async () => {
			try {
				const [menuData, kategoriData] = await Promise.all([
					fetchData(`${process.env.NEXT_PUBLIC_API_URL}/menu`),
					fetchData(`${process.env.NEXT_PUBLIC_API_URL}/kategori`),
				]);
				setDataMenus(menuData.data);
				setDataFilterMenu(kategoriData.data);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		loadData();
	}, []);

	const handlePayment = async () => {
		const payload = {
			tipe_payment: tipePayment,
			mode: typeOrder,
			total: totalPrice,
			items: itemsToOrder,
			code_payment: codePayment,
			nama_pelanggan: name,
			status: "preparing",
			catatan: note || "-",
		};

		const { data } = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/pesanan`,
			payload,
			{ headers: { "Content-Type": "application/json" } }
		);

		if (data) {
			setName("");
			setCart([]);
			setNote("");
			setTypeOrder("");
			toast.success("Pesanan berhasil dibuat");
		}
	};

	const handlePlaceOrder = async () => {
		setIsLoading(true);
		try {
			await handlePayment();
		} catch (error) {
			console.error("Error placing order:", error);
		} finally {
			setIsLoading(false);
		}
	};

	const filteredMenus = useMemo(
		() =>
			selectedCategory
				? dataMenus.filter((menu) => menu.id_kategori === selectedCategory.id)
				: dataMenus,
		[selectedCategory, dataMenus]
	);

	return (
		<div className="">
			<div className="flex gap-4">
				<div className="flex flex-col gap-4 w-full h-full">
					<h1 className="text-2xl font-semibold">
						{selectedCategory ? selectedCategory.nama_kategori : "Semua Menu"}
					</h1>
					<div className="flex items-center flex-wrap gap-4 overflow-auto w-full">
						{dataFilterMenu.map((data) => (
							<FilterMenu
								key={data.id}
								namafilter={data.nama_kategori}
								onClick={() => setSelectedCategory(data)}
							/>
						))}
					</div>
					<div className="flex flex-col gap-4">
						{filteredMenus.length > 0 ? (
							<div className="grid grid-cols-4 gap-4">
								{filteredMenus.map((data) => {
									const cartItem = cart.find((item) => item.id === data.id);
									return (
										<Card
											className={`flex flex-col rounded-md ${
												cartItem ? "border-orange-500" : ""
											}`}
											key={data.id}
										>
											<div className="rounded-md overflow-hidden p-2 bg-slate-50">
												<Image
													src={data.gambar}
													width={500}
													height={500}
													alt={data.nama_menu}
													className="object-cover rounded-md h-[200px]"
												/>
											</div>
											<div className="flex flex-col px-3 py-3 w-full">
												<h1 className="text-base font-semibold">
													{data.nama_menu}
												</h1>
												<p className="truncate w-full text-sm text-muted-foreground">
													{data.deskripsi}
												</p>
												<div className="flex justify-between items-center mt-3">
													<p className="text-base font-bold">
														{formatRupiah(data.harga)}
													</p>
													<div className="flex justify-between items-center gap-2">
														{cartItem && cartItem.quantity > 0 && (
															<>
																<Button
																	variant="outline"
																	size="icon"
																	onClick={() => removeFromCart(data)}
																>
																	<Minus />
																</Button>
																<p className="px-1">{cartItem.quantity}</p>
															</>
														)}
														<Button
															variant="outline"
															size="icon"
															onClick={() => addToCart(data)}
														>
															<Plus />
														</Button>
													</div>
												</div>
											</div>
										</Card>
									);
								})}
							</div>
						) : (
							<div className="flex flex-col h-[500px] justify-center items-center">
								<Soup size={40} />
								<h1 className="text-center text-2xl font-semibold">
									Tidak ada menu
								</h1>
							</div>
						)}
					</div>
				</div>

				<Card className="flex flex-col w-[700px] border rounded-md h-full">
					<OrderItem cart={cart} totalQuantity={totalQuantity} />
					<div className="flex flex-col gap-2 border-b p-4">
						<h1 className="text-base font-semibold">Customer Info</h1>
						<div className="flex items-center gap-2">
							<div className="w-full">
								<Label className="text-xs">Nama</Label>
								<Input
									type="text"
									placeholder="Nama"
									value={name}
									onChange={(e) => setName(e.target.value)}
								/>
							</div>
							<div className="w-full">
								<Label className="text-xs">Tipe Order</Label>
								<Select
									value={typeOrder}
									onValueChange={setTypeOrder}
								>
									<SelectTrigger>
										<SelectValue placeholder="Tipe Order" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="Dine In">Dine in</SelectItem>
										<SelectItem value="Take Away">Take Away</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
						<OrderNotes note={note} setNote={setNote} />
					</div>
					<OrderPaymentMethod
						tipePayment={tipePayment}
						handlePaymentChange={setTipePayment}
					/>
					<OrderSummary
						totalPrice={totalPrice}
						tax={0}
						total={totalPrice}
						discount={0}
					/>

					<div className="p-4">
						<Button
							className="w-full py-6 rounded-lg flex items-center justify-center bg-orange-500 text-white hover:bg-slate-800"
							onClick={handlePlaceOrder}
							disabled={isLoading}
						>
							{isLoading ? "Loading..." : "Place Order"}
						</Button>
					</div>
				</Card>
			</div>
		</div>
	);
};

export default PageOrderMenu;
