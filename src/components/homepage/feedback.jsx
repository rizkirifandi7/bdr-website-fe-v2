"use client";

import React, { useState } from "react";
import {
	Card,
	CardHeader,
	CardDescription,
	CardContent,
	CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { toast } from "sonner";
import axios from "axios";
import StarRating from "./star-rating";
import { Input } from "../ui/input";

export const Feedback = () => {
	const [nama, setNama] = useState("");
	const [noTelepon, setNoTelepon] = useState("");
	const [ratingMenu, setRatingMenu] = useState(0);
	const [ratingPelayanan, setRatingPelayanan] = useState(0);
	const [ratingRestoran, setRatingRestoran] = useState(0);
	const [saran, setSaran] = useState("");
	const [kritik, setKritik] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (
			!ratingMenu ||
			!ratingPelayanan ||
			!ratingRestoran ||
			!saran ||
			!kritik
		) {
			toast.error("Semua kolom harus diisi.");
			return;
		}

		const feedbackData = {
			nama,
			nomor_hp: noTelepon,
			saran,
			kritik,
			rating_menu: ratingMenu,
			rating_pelayanan: ratingPelayanan,
			rating_restoran: ratingRestoran,
		};

		createFeedback(feedbackData);
	};

	const createFeedback = async (reservationData) => {
		const response = await axios.post(
			`${process.env.NEXT_PUBLIC_API_URL}/feedback`,
			reservationData,
			{
				headers: {
					"Content-Type": "application/json",
				},
			}
		);

		if (response.status === 201) {
			toast.success("Feedback berhasil dibuat.");
			setNama("");
			setNoTelepon("");
			setRatingMenu(0);
			setRatingPelayanan(0);
			setRatingRestoran(0);
			setSaran("");
			setKritik("");
		} else {
			toast.error("Feedback gagal dibuat.");
		}
	};

	return (
		<section className="min-h-[80vh] pt-32" id="layanan">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex flex-col md:flex-row md:justify-between mt-10 px-6">
					<div className="flex flex-col justify-start items-start gap-4">
						<p className=" text-xl text-[#FEA92B] font-custom">Testimoni</p>
						<h1 className="text-3xl md:text-4xl font-bold">
							Feedback Pelanggan
						</h1>
						<div className="w-[80%] mt-2">
							<p className="text-lg">
								Kami sangat menghargai setiap feedback yang anda berikan.
								Berikan kami kritik dan saran untuk membantu kami meningkatkan
								kualitas layanan kami.
							</p>
						</div>
					</div>

					<div className=" flex justify-center items-center mt-10 md:mt-0">
						<Card className="w-full md:w-[550px]">
							<CardHeader>
								<CardTitle>Testimoni</CardTitle>
								<CardDescription>
									Berikan feedback anda mengenai layanan kami.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form onSubmit={handleSubmit}>
									<div className="flex flex-col w-full gap-4">
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating" className="text-sm">
												Nama
											</Label>
											<Input
												type="text"
												placeholder="Input nama...(optional)"
												className="shadow-none"
												value={nama}
												onChange={(e) => setNama(e.target.value)}
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating" className="text-sm">
												No.Telepon
											</Label>
											<Input
												type="number"
												placeholder="Input no.telepon...(optional)"
												className="shadow-none"
												value={noTelepon}
												onChange={(e) => setNoTelepon(e.target.value)}
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating_restoran" className="text-sm">
												Restoran
											</Label>
											<StarRating
												rating={ratingRestoran}
												setRating={setRatingRestoran}
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating_pelayanan" className="text-sm">
												Pelayanan
											</Label>
											<StarRating
												rating={ratingPelayanan}
												setRating={setRatingPelayanan}
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating_menu" className="text-sm">
												Menu
											</Label>
											<StarRating
												rating={ratingMenu}
												setRating={setRatingMenu}
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="saran" className="text-sm">
												Saran
											</Label>
											<Textarea
												id="saran"
												placeholder="Catatan Saran"
												value={saran}
												onChange={(e) => setSaran(e.target.value)}
												className="bg-white text-black text-base rounded-sm h-[100px]"
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="kritik" className="text-sm">
												Kritik
											</Label>
											<Textarea
												id="kritik"
												placeholder="Catatan Kritik"
												value={kritik}
												onChange={(e) => setKritik(e.target.value)}
												className="bg-white text-black text-base rounded-sm h-[100px]"
											/>
										</div>
									</div>
									<Button
										type="submit"
										className="w-full py-5 bg-[#FEA92B] text-white text-base mt-4"
									>
										Submit
									</Button>
								</form>
							</CardContent>
						</Card>
					</div>
				</div>
			</div>
		</section>
	);
};
