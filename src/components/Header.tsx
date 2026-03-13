"use client";
import Image from "next/image";
import Link from "next/link";
import { NavigationMenu } from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

export default function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between p-4">
      <Link href={"/domains"}>
        <Image alt="Logo" src="/domainBG.png" width={150} height={100} />
      </Link>

      <NavigationMenu className="space-x-4">
        <Link href={"/domains"} className="hover:text-blue-700 font-medium">
          Domínios
        </Link>
        <Link href={"/accounts"} className="hover:text-blue-700 font-medium">
          Contas
        </Link>
      </NavigationMenu>
    </header>
  );
}
