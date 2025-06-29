"use client";
import React from 'react';
import SideBar from '@/components/sideBar/SideBar';

export default function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-white max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="z-10">
        <SideBar />
      </div>
      <main className="flex-1 relative">
        {children}
      </main>
    </div>
  );
}
