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
		icon: "/favicon.ico",
	},
};

const LayoutDashboardHome = ({ children }) => {
	return (
		<>
			<Toaster position="top-center" />
			<SidebarProvider>
				<SidebarDashboard
					data={HomeNavData}
					header={<SidebarDashboardHeader />}
				>
					<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
				</SidebarDashboard>
			</SidebarProvider>
		</>
	);
};

export default LayoutDashboardHome;
