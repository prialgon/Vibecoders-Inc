import BaseTemplate from "@/components/BaseTemplate/BaseTemplate";
import "./globals.css";

export const metadata = {
  title: "VibeGPT",
};
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
