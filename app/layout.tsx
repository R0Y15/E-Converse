import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster"

import "./globals.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "react-datepicker/dist/react-datepicker.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Converse",
  description: "The All New Video Conferencing App",
  icons: {
    icon: "/icons/logo.svg",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
        appearance={{
          layout: {
            logoImageUrl: '/icons/logo.svg',
            socialButtonsVariant: 'iconButton'
          },
          variables: {
            colorText: "#FFFFFF",
            colorPrimary: "#0E78F9",
            colorBackground: "#1c1f2e",
            colorInputBackground: "#252a41",
            colorInputText: "#FFFFFF",
          }
        }}
      >
        <body className={`${inter.className} bg-dark-2`}>
          {children}
          <Toaster />
        </body>
      </ClerkProvider>
    </html >
  );
}
