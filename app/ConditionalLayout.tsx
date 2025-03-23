"use client";

import { usePathname } from "next/navigation";
import MainLayout from "./MainLayout";
import Sky from "./pictures/stacked-waves-haikei-4.svg";
import Image from "next/image";
import Footer from "./components/Footer";

export default function ConditionalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const noLayoutRoutes = ["/"]; // Add the route(s) where you don't want to apply MainLayout

  const isNoLayoutRoute = noLayoutRoutes.includes(pathname);

  return isNoLayoutRoute ? (
    <div>
      <main className="bg-gradient-to-b from-black from-30% to-[#ff0404] to-100% min-h-screen flex flex-col">
        <div className="fixed top-0 left-0 w-screen h-full z-0">
          <Image src={Sky} alt="Background" fill className="object-cover" />
        </div>
        {children}
        <Footer />
      </main>
    </div>
  ) : (
    <MainLayout>{children}</MainLayout>
  );
}
