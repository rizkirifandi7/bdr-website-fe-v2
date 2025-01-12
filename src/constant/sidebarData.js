import { FaRegUser } from "react-icons/fa";
import { FiHome, FiShoppingBag } from "react-icons/fi";
import { TbReportAnalytics } from "react-icons/tb";
const { BiFoodMenu } = require("react-icons/bi");
const { LuChefHat, LuSquareMenu } = require("react-icons/lu");
const {
	MdOutlineSpaceDashboard,
	MdOutlineNoteAlt,
	MdOutlineFastfood,
} = require("react-icons/md");

export const OrderNavData = {
	navMain: [
		{
			title: "Kelola Dashboard",
			url: "#",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard-order/home",
					icon: <FiHome />,
				},
			],
		},
		{
			title: "Kelola Menu",
			url: "#",
			items: [
				{
					title: "Kelola Menu",
					url: "/dashboard-order/menu",
					icon: <BiFoodMenu />,
				},
				{
					title: "Kategori Menu",
					url: "/dashboard-order/kategori-menu",
					icon: <LuSquareMenu />,
				},
				{
					title: "Beli Bahan Baku",
					url: "/dashboard-order/order-bahan",
					icon: <FiShoppingBag />,
				},
			],
		},
		{
			title: "Kelola Pesanan",
			url: "#",
			items: [
				{
					title: "Order Menu",
					url: "/dashboard-order/order-menu",
					icon: <MdOutlineFastfood />,
				},
				{
					title: "List Pesanan",
					url: "/dashboard-order/pesanan",
					icon: <MdOutlineNoteAlt />,
				},
				{
					title: "Manajemen Pesanan",
					url: "/dashboard-order/kitchen-list",
					icon: <LuChefHat />,
				},
			],
		},
	],
};

export const HomeNavData = {
	navMain: [
		{
			title: "Kelola Dashboard",
			url: "#",
			items: [
				{
					title: "Reservasi",
					url: "/dashboard-home/reservasi",
					icon: <MdOutlineSpaceDashboard />,
				},
				{
					title: "Kategori Menu",
					url: "/dashboard-home/kategori-menu",
					icon: <BiFoodMenu />,
				},
				{ title: "Menu", url: "/dashboard-home/menu", icon: <BiFoodMenu /> },
				{
					title: "Feedback",
					url: "/dashboard-home/feedback",
					icon: <MdOutlineSpaceDashboard />,
				},
			],
		},
	],
};

export const SuperAdminNavData = {
	navMain: [
		{
			title: "Kelola Bahan Baku",
			url: "#",
			items: [
				{
					title: "Bahan Baku",
					url: "/dashboard-superadmin/bahan-baku",
					icon: <MdOutlineSpaceDashboard />,
				},
				{
					title: "Pesanan Bahan Baku",
					url: "/dashboard-superadmin/pesanan-bahan",
					icon: <BiFoodMenu />,
				},
			],
		},
		{
			title: "Kelola Mitra",
			url: "#",
			items: [
				{
					title: "Laporan Penjualan",
					url: "/dashboard-superadmin/laporan-penjualan",
					icon: <BiFoodMenu />,
				},
				{
					title: "Akun Mitra",
					url: "/dashboard-superadmin/akun-mitra",
					icon: <FaRegUser />,
				},
			],
		},
	],
};
