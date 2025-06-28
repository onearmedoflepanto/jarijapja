"use client";
import type { Metadata } from "next";
import "./globals.css";
import { NavBar } from "@/components/navBar/NavBar";
import { LocationProvider } from "@/context/LocationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="flex flex-col h-screen">
        <LocationProvider>
          <NavBar />
          <main className="flex-1 overflow-hidden">{children}</main>
        </LocationProvider>
      </body>
    </html>
  );
}
