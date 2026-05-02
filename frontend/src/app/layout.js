"use client";
import BaseTemplate from "@/components/BaseTemplate/BaseTemplate";
import "./globals.css";

import { AuthProvider } from "@/context/AuthContext";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <BaseTemplate>{children}</BaseTemplate>
        </AuthProvider>
      </body>
    </html>
  );
}
