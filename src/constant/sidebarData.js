const { User, LucideMenuSquare } = require("lucide-react");
const { BiFoodMenu } = require("react-icons/bi");
const { LuChefHat } = require("react-icons/lu");
const { MdOutlineSpaceDashboard, MdOutlineNoteAlt } = require("react-icons/md");

export const OrderNavData = {
	navMain: [
		{
			title: "Kelola Menu",
			url: "#",
			items: [
				{
					title: "Dashboard",
					url: "/dashboard-order/home",
					icon: <MdOutlineSpaceDashboard />,
				},
				{ title: "Menu", url: "/dashboard-order/menu", icon: <BiFoodMenu /> },
				{
					title: "Kategori Menu",
					url: "/dashboard-order/kategori-menu",
					icon: <LucideMenuSquare />,
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
					icon: <MdOutlineNoteAlt />,
				},
				{
					title: "Pesanan",
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
		{
			title: "Kelola User",
			url: "#",
			items: [
				{
					title: "User",
					url: "/dashboard-order/user",
					icon: <User />,
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
				{ title: "Menu", url: "/dashboard-home/menu", icon: <BiFoodMenu /> },
				{
					title: "Menu Populer",
					url: "/dashboard-home/menu-populer",
					icon: <BiFoodMenu />,
				},
				{
					title: "Feedback",
					url: "/dashboard-home/feedback",
					icon: <MdOutlineSpaceDashboard />,
				},
			],
		},
	],
};
