"use client";

import React, { useState } from "react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import { toast } from "sonner";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const Reservasi = () => {
	const [date, setDate] = useState();
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [people, setPeople] = useState("");
	const [request, setRequest] = useState("");
	const [ruangan, setRuangan] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		// Validation
		if (!name || !phone || !date || !people || !request || !ruangan) {
			toast.error("Semua kolom harus diisi.");
			return;
		}

		const reservationData = {
			nama_pelanggan: name,
			kontak: phone,
			tanggal_reservasi: date,
			jumlah_orang: people,
			catatan: request,
			ruangan,
		};

		createReservation(reservationData);
	};

	const createReservation = async (reservationData) => {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/reservasi`,
			reservationData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 201) {
			toast.success("Reservasi berhasil dibuat.");
			sendWhatsAppMessage(reservationData);
			setRuangan("");
			setName("");
			setPhone("");
			setDate(null);
			setPeople("");
			setRequest("");
		} else {
			toast.error("Reservasi gagal dibuat.");
		}
	};

	const sendWhatsAppMessage = (reservationData) => {
		const message = `Reservasi baru:\nNama: ${reservationData.nama_pelanggan}\nKontak: ${reservationData.kontak}\nTanggal: ${reservationData.tanggal_reservasi}\nJumlah Orang: ${reservationData.jumlah_orang}\nCatatan: ${reservationData.catatan}\nRuangan: ${reservationData.ruangan}`;
		const phoneNumber = "0895609977877";
		const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
			message
		)}`;
		window.open(whatsappUrl, "_blank");
	};

	return (
		<section className="min-h-[80vh] pt-40" id="reservasi">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col md:flex-row bg-[#0F172B] rounded-md mx-6 md:mx-0">
					<div className="w-full h-[600px] py-10 md:pl-10 px-6 md:px-0">
						<iframe
							className="rounded-md"
							width="100%"
							height="100%"
							src="https://www.youtube.com/embed/KyQEZmanhZ0"
							title="YouTube video player"
							frameBorder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowFullScreen
						></iframe>
					</div>
					<div className="flex flex-col justify-center p-10 w-full h-[600px] ">
						<p className="text-lg font-custom text-headingText">Reservasi</p>
						<h1 className="text-[2.5rem] font-bold text-white">
							Reservasi Tempat
						</h1>
						<form onSubmit={handleSubmit}>
							<div className="flex flex-col w-full gap-4 mt-4">
								<div className="flex gap-4">
									<Input
										type="text"
										className="bg-white text-black text-base rounded-sm h-[60px]"
										placeholder="Nama Anda"
										value={name}
										onChange={(e) => setName(e.target.value)}
									/>
									<Input
										type="number"
										className="bg-white text-black text-base rounded-sm h-[60px]"
										placeholder="Nomor HP"
										value={phone}
										onChange={(e) => setPhone(e.target.value)}
									/>
								</div>
								<div className="flex gap-4 w-full">
									<Input
										type="datetime-local"
										className="bg-white text-black text-base rounded-sm h-[60px] w-full"
									/>
									<Select value={people} onValueChange={setPeople}>
										<SelectTrigger className="w-full h-[60px] bg-white text-base rounded-sm placeholder:text-muted-foreground">
											<SelectValue
												placeholder="Jumlah Orang"
												className="text-base placeholder:text-muted-foreground"
											/>
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{Array.from({ length: 35 }, (_, i) => (
													<SelectItem
														key={i + 1}
														value={`${i + 1} Orang`}
														className="text-black"
													>
														{`${i + 1} Orang`}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<Select value={ruangan} onValueChange={setRuangan}>
									<SelectTrigger className="w-full h-[60px] bg-white text-base rounded-sm placeholder:text-muted-foreground">
										<SelectValue
											placeholder="Ruangan"
											className="placeholder:text-muted-foreground"
										/>
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectItem value="Lantai 1 Utama">
												Lantai 1 Utama
											</SelectItem>
											<SelectItem value="Lantai 2 Karaoke">
												Lantai 2 Karaoke
											</SelectItem>
											<SelectItem value="Lantai 3 Arena">
												Lantai 3 Arena
											</SelectItem>
										</SelectGroup>
									</SelectContent>
								</Select>
								<Textarea
									placeholder="Catatan"
									className="bg-white text-black text-base rounded-sm h-[100px]"
									value={request}
									onChange={(e) => setRequest(e.target.value)}
								/>
								<Button
									type="submit"
									className="bg-[#FEA92B] text-white h-[60px] rounded-sm mb-3"
								>
									Reservasi
								</Button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Reservasi;
