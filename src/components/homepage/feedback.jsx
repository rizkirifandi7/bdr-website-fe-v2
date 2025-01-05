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
	const [rating, setRating] = useState(0);
	const [deskripsi, setDeskripsi] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!rating || !deskripsi) {
			toast.error("Semua kolom harus diisi.");
			return;
		}

		const feedbackData = {
			rating,
			deskripsi,
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
			setRating(0);
			setDeskripsi("");
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
						<Card className="w-[450px]">
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
												placeholder="Input nama..."
												className="shadow-none"
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating" className="text-sm">
												No.Telepon
											</Label>
											<Input
												type="number"
												placeholder="Input no.telepon..."
												className="shadow-none"
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating" className="text-sm">
												Restoran
											</Label>
											<StarRating rating={rating} setRating={setRating} />
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating" className="text-sm">
												Pelayanan
											</Label>
											<StarRating rating={rating} setRating={setRating} />
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="rating" className="text-sm">
												Menu
											</Label>
											<StarRating rating={rating} setRating={setRating} />
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="feedback" className="text-sm">
												Feedback
											</Label>
											<Textarea
												id="feedback"
												placeholder="Catatan"
												value={deskripsi}
												onChange={(e) => setDeskripsi(e.target.value)}
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
