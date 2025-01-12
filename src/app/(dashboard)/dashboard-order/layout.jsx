import React from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Toaster } from "sonner";
import SidebarDashboard from "@/components/dashboard/sidebar-dashboard";
import { OrderNavData } from "@/constant/sidebarData";
import DashboardHeaderOrder from "@/components/dashboard/header-order";
import { CartProvider } from "@/hooks/useCart";
import { CartBahanBakuProvider } from "@/hooks/useCartBahan";

export const metadata = {
	title: "Dashboard | Bakso Dono Reborn",
	description: "Bakso Dono Reborn",
	icons: {
		icon: "/favicon.ico",
	},
};

const LayoutAdmin = ({ children }) => {
	return (
		<>
			<Toaster position="top-center" />
			<SidebarProvider>
				<SidebarDashboard data={OrderNavData} header={<DashboardHeaderOrder />}>
					<div className="p-4">
						<CartProvider>
							<CartBahanBakuProvider>{children}</CartBahanBakuProvider>
						</CartProvider>
					</div>
				</SidebarDashboard>
			</SidebarProvider>
		</>
	);
};

export default LayoutAdmin;
