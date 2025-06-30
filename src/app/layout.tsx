"use client";
import type { Metadata } from "next";
import "./globals.css";
import { LocationProvider } from "@/context/LocationContext";
import { NavBar } from "@/components/navBar/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col h-screen">
        <NavBar />
        <LocationProvider>
          <main className="flex-1 overflow-hidden">{children}</main>
        </LocationProvider>
      </body>
    </html>
  );
}
