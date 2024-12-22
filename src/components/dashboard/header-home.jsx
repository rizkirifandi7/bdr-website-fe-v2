"use client";
import React from "react";
import { FaRegUser } from "react-icons/fa6";
import { LogOut } from "lucide-react";
import { removeCookie } from "@/actions/cookies";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
import Link from "next/link";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";

const SidebarDashboardHeader = () => {
  const [user, setUser] = React.useState(null);

  const handleLogout = async () => {
    try {
      removeCookie("auth_session");
      toast.success("Logout berhasil.");
    } catch (error) {
      toast.error("Logout gagal.");
      console.error("Error logging out:", error);
    }
  };

  React.useEffect(() => {
    const tokenJwt = Cookies.get("auth_session");
    if (tokenJwt) {
      setUser(jwtDecode(tokenJwt));
    }
  }, []);

  return (
    <>
      <header className="flex justify-between shrink-0 items-center border-b px-4">
        <div className="flex items-center h-16 gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <p className="inline-flex items-center gap-2 px-3 py-1 border rounded-md text-base font-medium capitalize">
              <FaRegUser />
              {user ? user.nama : "User "}
            </p>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-auto me-5">
            <DropdownMenuLabel>Akun Saya</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <Button variant="outline" onClick={handleLogout} asChild>
              <Link href="/signin">
                <DropdownMenuItem>
                  <LogOut /> Keluar
                </DropdownMenuItem>
              </Link>
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
    </>
  );
};

export default SidebarDashboardHeader;
