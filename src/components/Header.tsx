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
        <Image alt="Logo" src="/vulkan.png" width={150} height={100} />
      </Link>

      <NavigationMenu className="space-x-4">
        <Link href={"/domains"} className="hover:text-blue-700 font-medium">
          Domínios
        </Link>
        <Link href={"/accounts"} className="hover:text-blue-700 font-medium">
          Contas
        </Link>
        <Link href={"/Overview"} className="hover:text-blue-700 font-medium">
          candidaturas
        </Link>
        <Button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="w-9 h-9 p-2"
        >
          <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
      </NavigationMenu>
    </header>
  );
}
