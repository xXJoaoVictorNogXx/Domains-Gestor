"use client";

import { usePathname } from "next/navigation";
import Header from "@/src/components/Header";

export default function RootProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const autorizedPages = ["/login"];
  const isAutorized = autorizedPages.includes(pathname);

  return (
    <div>
      {isAutorized ? null : <Header />}
      {children}
    </div>
  );
}
