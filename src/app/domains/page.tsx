"use client";

import { getDomains } from "@/src/api/axios";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Switch } from "@/src/components/ui/switch"; // Certifique-se de ter instalado: npx shadcn@latest add switch
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function Domains() {
  const domains = useQuery({
    queryKey: ["domains"],
    queryFn: async () => {
      const data = await getDomains();
      return data;
    },
  });

  if (domains.isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando...
      </div>
    );
  }
  if (domains?.data?.error) {
    return (
      <div className="flex h-screen items-center justify-center text-destructive">
        Erro: {domains.data.error}
      </div>
    );
  }
  if (domains?.data?.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        Nenhum domínio encontrado
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-6 items-center min-h-screen bg-secondary py-10">
      <div className="w-full max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Domínios</h1>
          <p className="text-muted-foreground mt-2">
            Gerencie o acesso e visualize as contas vinculadas a cada domínio.
          </p>
        </div>

        <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {domains.data?.map((domain) => (
            <Card
              key={domain.id}
              className="flex flex-col justify-between shadow-sm"
            >
              <CardHeader>
                <CardTitle className="text-xl">{domain.name}</CardTitle>
                <CardDescription>
                  {domain.description || "Sem descrição disponível"}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex items-center justify-between py-4">
                <span className="text-sm font-medium">Bloquear Acesso</span>
                <Switch />
              </CardContent>

              <CardFooter className="pt-2">
                <Button asChild className="w-full" variant="outline">
                  <Link href={`/domains/${domain.id}`}>
                    Ver Contas Cadastradas
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
