import Image from "next/image";
import React from "react";

const Tentang = () => {
	return (
		<section className="min-h-[80vh] pt-40" id="tentang">
			<div className="max-w-screen-xl mx-auto">
				<div className="flex gap-4 md:gap-0 flex-col-reverse md:flex-row md:justify-between items-center p-4">
					<div className="md:w-1/2 mt-4 md:mt-0">
						<Image
							src="/asset-room.png"
							alt="hero"
							width={500}
							height={500}
							className=""
						/>
					</div>
					<div className="flex flex-col md:w-1/2">
						<p className="text-xl font-medium text-headingText font-custom">
							Tentang Kami
						</p>
						<h1 className="text-[2.5rem] font-bold mb-4">
							Selamat Datang di Bakso Dono Reborn!
						</h1>
						<p className="text-base text-justify">
							Kami adalah tempat di mana
							setiap kelezatan dari kombinasi bertemu. Di sini, kami bangga
							menyajikan mie dan bakso yang kami produksi sendiri, menggunakan
							bahan-bahan segar dan berkualitas tinggi. Setiap hari, tim kami
							bekerja dengan penuh dedikasi untuk membuat mie yang kenyal dan
							bakso yang juicy, dengan resep yang istimewa. Kami percaya bahwa
							cita rasa terbaik dimulai dari bahan yang terbaik, sehingga kami
							selalu memilih bahan-bahan lokal yang segar. Bergabunglah bersama
							kami di Bakso Dono Reborn, dan rasakan perbedaan dari mie dan
							bakso yang diolah dengan sepenuh hati!
						</p>
						<div className="flex md:flex-row flex-col items-start md:items-center md:justify-start mt-8">
							<div className="basis-1/2 flex items-center border-l-4 border-headingText p-2">
								<p className="text-5xl font-bold text-headingText px-4">15</p>
								<div className="flex flex-col gap-0 pl-2">
									<p className="text-base">Tahun</p>
									<p className="uppercase text-sm font-bold">Pengalaman</p>
								</div>
							</div>
							<div className="basis-1/2 flex items-center border-l-4 border-headingText  p-2">
								<p className="text-5xl font-bold text-headingText px-4">30</p>
								<div className="flex item flex-col gap-0 pl-2">
									<p className="text-base">Menu</p>
									<p className="uppercase text-sm font-bold">
										Makanan dan Minuman
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Tentang;
