import React from "react";
import { Toaster } from "sonner";

export const metadata = {
  title: "Login | Bakso Dono Reborn",
  description: "Bakso Dono Reborn",
  icons: {
    icon: "/favicon.ico",
  }
};

const LayoutAuth = ({ children }) => {
  return (
    <>
      <Toaster />
      {children}
    </>
  );
};

export default LayoutAuth;
