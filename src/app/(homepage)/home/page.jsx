import React from "react";
import Jumbotron from "@/components/homepage/jumbotron";
import Kontak from "@/components/homepage/kontak";
import Layanan from "@/components/homepage/layanan";
import MenuPopuler from "@/components/homepage/menu-populer";
import Reservasi from "@/components/homepage/reservasi";
import Tentang from "@/components/homepage/tentang";

const Home = React.memo(() => {
	return (
		<>
			<Jumbotron />
			<MenuPopuler />
			<Layanan />
			<Tentang />
			<Reservasi />
			<Kontak />
		</>
	);
});

export default Home;