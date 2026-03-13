import Link from "next/link";
import { Button } from "@/src/components/ui/button";
import Image from "next/image";

// import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center bg-slate-50 p-6">
      <div className="w-full max-w-3xl flex flex-col items-center text-center space-y-8">
        <div className="mb-4">
          <Image
            src="/domainBG.png"
            alt="Logo do Sistema"
            className=" w-auto object-contain"
            width={300}
            height={300}
          />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Gestão Centralizada de <br className="hidden sm:block" />
            <span className="text-primary">Domínios</span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 md:text-xl leading-relaxed">
            Tenha o controle total do seu ecossistema. Gerencie acessos,
            monitore limites de armazenamento e mantenha as contas dos seus
            domínios seguras em uma interface rápida e intuitiva.
          </p>
        </div>

        <div className="pt-8">
          <Button
            asChild
            size="lg"
            className="text-lg px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all"
          >
            <Link href="/login">Acessar o Sistema 🚀</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
