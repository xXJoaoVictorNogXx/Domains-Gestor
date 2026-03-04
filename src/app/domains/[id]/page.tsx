"use client";

import { useSearchParams } from "next/navigation"; // Hook do Next.js para ler a URL
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import { Button } from "@/src/components/ui/button";
import Link from "next/link";
import { axiosInstance, getAccount } from "@/src/api/axios";

export default function ContasDoDominio() {
  const searchParams = useSearchParams();
  const domainId = searchParams.get("domainId");

  const accounts = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const data = await getAccount();
      return data;
    },
    enabled: !!domainId,
  });

  if (!domainId) {
    return (
      <div className="flex h-screen items-center justify-center flex-col gap-4">
        <p>Nenhum domínio selecionado.</p>
        <Button asChild>
          <Link href="/domains">Voltar</Link>
        </Button>
      </div>
    );
  }

  if (accounts.isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        Carregando contas...
      </div>
    );
  }

  if (accounts.isError) {
    return (
      <div className="flex h-screen items-center justify-center text-destructive">
        Erro ao buscar contas.
      </div>
    );
  }

  return (
    <main className="flex flex-col gap-6 items-center min-h-screen bg-secondary py-10">
      <div className="w-full max-w-6xl px-4">
        <div className="mb-8 flex flex-col items-start gap-4">
          <Button asChild variant="outline" size="sm">
            <Link href="/domains">&larr; Voltar para Domínios</Link>
          </Button>

          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Contas Vinculadas
            </h1>
            <p className="text-muted-foreground mt-2">
              Mostrando contas pertencentes ao domínio ID: {domainId}
            </p>
          </div>
        </div>

        {accounts.data?.length === 0 ? (
          <div className="text-center p-10 border rounded-lg bg-background">
            <p className="text-muted-foreground">
              Este domínio ainda não possui contas cadastradas.
            </p>
          </div>
        ) : (
          <div className="gap-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {accounts.data?.map((account) => (
              <Card key={account.id} className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg truncate" title={account.email}>
                    {account.email}
                  </CardTitle>
                  <CardDescription>ID da Conta: {account.id}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between border-b pb-2">
                    <span className="text-muted-foreground">
                      Armazenamento:
                    </span>
                    <span className="font-medium">{account.storage} MB</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <span className="text-muted-foreground">Status:</span>
                    <span
                      className={`font-bold ${account.isBlocked ? "text-destructive" : "text-green-600"}`}
                    >
                      {account.isBlocked ? "Bloqueada" : "Ativa"}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
