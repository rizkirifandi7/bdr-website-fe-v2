import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Jumbotron = () => {
	return (
		<section className="min-h-screen pt-20 md:pt-40 hero-header" id="#">
			<div className="max-w-screen-xl mx-auto text-white">
				<div className="flex flex-col-reverse md:flex-row md:justify-between items-center p-4">
					<div className="flex flex-col items-center md:items-start gap-4 md:w-[600px]">
						<h1 className="text-4xl md:text-7xl font-bold">
							Bakso Dono Reborn
						</h1>
						<p className="text-sm md:text-sm mt-4 text-center md:text-left md:w-[600px]">
							Kami adalah tempat di mana setiap kelezatan dari kombinasi
							bertemu. Di sini, kami bangga menyajikan mie dan bakso yang kami
							produksi sendiri, menggunakan bahan-bahan segar dan berkualitas
							tinggi. Setiap hari, tim kami bekerja dengan penuh dedikasi untuk
							membuat mie yang kenyal dan bakso yang juicy, dengan resep yang
							istimewa. Kami percaya bahwa cita rasa terbaik dimulai dari bahan
							yang terbaik, sehingga kami selalu memilih bahan-bahan lokal yang
							segar. Bergabunglah bersama kami di Bakso Dono Reborn, dan rasakan
							perbedaan dari mie dan bakso yang diolah dengan sepenuh hati!
						</p>

						<div className="flex gap-4 mt-4 md:mt-10">
							<Button className="bg-[#FEA92B] p-6 text-sm md:text-lg ">
								<Link href="/reservasi">Reservasi</Link>
							</Button>
							<Button
								variant="outline"
								className="bg-transparent p-6 text-sm text-white md:text-lg"
							>
								<Link href="/menu">Lihat Menu</Link>
							</Button>
						</div>
					</div>
					<div className="mb-10 md:mb-0">
						<Image
							src="/hero.png"
							alt="hero"
							width={600}
							height={600}
							className="animate-spin-slow"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Jumbotron;
