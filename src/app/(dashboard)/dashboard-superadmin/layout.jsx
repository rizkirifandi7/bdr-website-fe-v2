import React from "react";
import { Toaster } from "sonner";
import { SuperAdminNavData } from "@/constant/sidebarData";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";
import DashboardHeaderOrder from "@/components/dashboard/header-order";

export const metadata = {
	title: "Dashboard Home | Demiehan",
	description: "Demiehan",
	icons: {
		icon: "/logobrand.png",
	},
};

const LayoutDashboardHome = ({ children }) => {
	return (
		<>
			<Toaster position="top-center" />
			<SidebarProvider>
				<SidebarDashboard
					data={SuperAdminNavData}
					judul={"Demiehan"}
					logo={"/logobrand.png"}
					header={<DashboardHeaderOrder />}
				>
					<div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
				</SidebarDashboard>
			</SidebarProvider>
		</>
	);
};

export default LayoutDashboardHome;
