import Image from "next/image";
import Link from "next/link";
import React from "react";
import { CiFacebook, CiInstagram, CiYoutube } from "react-icons/ci";
import { PiTiktokLogo } from "react-icons/pi";

const FooterLink = ({ href, children }) => (
	<a href={href} className="hover:underline">
		{children}
	</a>
);

const FooterSection = ({ title, children }) => (
	<div className="w-[200px]">
		<h2 className="mb-6 text-xl text-headingText font-custom">{title}</h2>
		<div className="flex flex-col gap-4 text-white text-sm">{children}</div>
	</div>
);

const Footer = () => {
	return (
		<footer className="bg-[#0F172B] mt-20">
			<div className="flex flex-col justify-between mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 md:h-[300px] h-full">
				<div className="md:flex md:justify-between">
					<div className="mb-6 md:mb-0">
						<a href="#" className="flex gap-3 items-center">
							<Image src="/logobdr.png" alt="Logo" width={40} height={40} />
							<span className="text-xl font-semibold whitespace-nowrap text-headingText">
								Bakso Dono Reborn
							</span>
						</a>
					</div>
					<div className="grid grid-cols-1 md:gap-8 gap-4 md:grid-cols-4 justify-end items-start">
						<FooterSection title="Perusahaan">
							<FooterLink href="/tentang">Tentang Kami</FooterLink>
							<FooterLink href="/kontak">Kontak Kami</FooterLink>
							<FooterLink href="/reservasi">Reservasi</FooterLink>
						</FooterSection>
						<FooterSection title="Kontak">
							<p>
								Jl. Belakang Pasar No.24, Sadang Serang, Kec.Coblong, Kota
								Bandung 40133 Jawa Barat.
							</p>
							<p>+62 895 6099 77877</p>
							<p>baksodonoreborn@gmail.com</p>
						</FooterSection>
						<FooterSection title="Jam Buka">
							<p>Senin - Minggu</p>
							<p>10.00 - 21.00 WIB</p>
						</FooterSection>
						<FooterSection title="Ikuti Kami">
							<Link
								href="facebook.com/baksodonoreborn"
								className="flex items-center gap-2"
							>
								<CiFacebook /> Facebook
							</Link>
							<Link
								href="instagram.com/baksodonoreborn/"
								className="flex items-center gap-2"
							>
								<CiInstagram /> Instagram
							</Link>
							<Link
								className="flex items-center gap-2"
								href="youtube.com/channel/UCR7Garv3A8D2ED-kVix2nFg"
							>
								<CiYoutube />
								Youtube
							</Link>
							<Link
								className="flex items-center gap-2"
								href="www.tiktok.com/@baksodonoreborn"
							>
								<PiTiktokLogo />
								Tiktok
							</Link>
						</FooterSection>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
