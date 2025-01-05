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
						<p className="text-sm md:text-base mt-4 text-center md:text-left md:w-[600px]">
							Kami hadir untuk memanjakan anda dengan cita rasa autentik mie dan
							bakso yang lezat! Di Bakso Dono Reborn, setiap mangkuk kami,
							disiapkan dengan bahan-bahan segar dan resep istimewa. Nikmati
							kelezatan mie yang kenyal dan bakso yang juicy dalam suasana
							hangat dan ramah. Bergabunglah bersama kami dan rasakan kenikmatan
							yang tak tertandingi di setiap suapan!
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
							width={400}
							height={400}
							className="w-[300px] h-[300px] md:w-auto md:h-auto animate-spin-slow"
						/>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Jumbotron;
