import React from "react";
import { Toaster } from "sonner";

export const metadata = {
  title: "Login | Demiehan",
  description: "Demiehan",
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
