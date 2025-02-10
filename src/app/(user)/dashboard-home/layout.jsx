import React from "react";
import { Toaster } from "sonner";
import { HomeNavData } from "@/constant/sidebarData";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarDashboardHeader from "@/components/dashboard/header-home";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";

export const metadata = {
	title: "Dashboard Home | Bakso Dono Reborn",
	description: "Bakso Dono Reborn",
	icons: {
		icon: [
			{ url: "/favicon.ico", sizes: "any" },
			{ url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
			{ url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
		],
		apple: [{ url: "/icon-192x192.png", sizes: "180x180" }],
	},
	manifest: "/manifest.json",
};

const LayoutDashboardHome = ({ children }) => {
	return (
		<>
			<Toaster position="top-center" />
			<SidebarProvider>
				<SidebarDashboard
					data={HomeNavData}
					judul={"Bakso Dono Reborn"}
					logo={"/logobdr.png"}
					header={<SidebarDashboardHeader />}
				>
					<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
				</SidebarDashboard>
			</SidebarProvider>
		</>
	);
};

export default LayoutDashboardHome;
