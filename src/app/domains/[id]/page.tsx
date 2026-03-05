/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useQuery } from "@tanstack/react-query";
import { getAccount, getDomains } from "@/src/api/axios";
import { useParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import { useState } from "react";
import { ChangePasswordModal } from "@/src/components/ModalChangePassword";

export default function DomainAccounts() {
  const params = useParams();
  const domainId = params.id;

  const accounts = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const data = await getAccount();
      return data;
    },
  });

  const domains = useQuery({
    queryKey: ["domains"],
    queryFn: async () => {
      const data = await getDomains();
      return data;
    },
  });

  if (accounts.isPending || domains.isPending) {
    return <div className="p-10">Carregando contas deste domínio...</div>;
  }
  const contasDoDominio =
    accounts.data?.filter(
      (account) => String(account.domainId) === String(domainId),
    ) || [];

  const dominioAtual = domains.data?.find(
    (d) => String(d.id) === String(domainId),
  );

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  return (
    <main className="flex flex-col gap-6 items-center min-h-screen bg-secondary py-10">
      <div className="w-full max-w-6xl px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">
            Contas vinculadas: {dominioAtual?.name || `Domínio ${domainId}`}
          </h1>
        </div>
        <div className="bg-white p-6 rounded-lg shadow w-full">
          {contasDoDominio.length > 0 ? (
            <ul className="flex flex-col gap-4">
              {contasDoDominio.map((account) => (
                <li
                  key={account.id}
                  className="border border-slate-200 p-5 rounded-lg flex flex-col gap-5 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  {/* CABEÇALHO DO CARD DA CONTA */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
                        ID da Conta
                      </span>
                      <p className="font-mono text-lg font-medium text-slate-800">
                        {account.id}
                      </p>
                    </div>

                    {/* ❌ REMOVER CONTA */}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => {
                        // Confirmação nativa rápida e fácil para entregar no sábado!
                        const confirmou = window.confirm(
                          "Tem certeza que deseja remover esta conta? Esta ação não pode ser desfeita.",
                        );
                        if (confirmou) {
                          console.log(
                            "TODO: Chamar mutation de exclusão e invalidar query",
                            account.id,
                          );
                        }
                      }}
                    >
                      ❌ Remover Conta
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                    <div className="flex flex-col gap-3">
                      <span className="text-sm font-semibold text-slate-700">
                        Status de Acesso
                      </span>
                      <div className="flex items-center gap-2">
                        {/* No seu Switch, você vai plugar o onCheckedChange chamando a mutation */}
                        <Switch
                          // checked={account.isBlocked} <-- Você vai usar o dado real aqui
                          onCheckedChange={(checked) => {
                            console.log(
                              "TODO: Mutation para alterar status",
                              checked,
                            );
                          }}
                        />
                        <span className="text-sm text-muted-foreground">
                          Bloquear / Desbloquear
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <span className="text-sm font-semibold text-slate-700">
                        Limite de Storage (GB)
                      </span>
                      <div className="flex items-center gap-2">
                        {/* Se não tiver o componente Input do shadcn, use uma tag <input> normal do HTML com as mesmas classes */}
                        <input
                          type="number"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 max-w-[100px]"
                          defaultValue={account.storage || 10}
                          // onChange={(e) => setNovoStorage(e.target.value)} <-- Sugestão para pegar o valor
                        />
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => {
                            console.log(
                              "TODO: Mutation para salvar novo storage",
                            );
                          }}
                        >
                          💾 Salvar
                        </Button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3">
                      <span className="text-sm font-semibold text-slate-700">
                        Segurança
                      </span>
                      <Button
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => {
                          setSelectedAccountId(account.id);
                          setIsPasswordModalOpen(true);
                        }}
                      >
                        🔑 Alterar Senha
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <p>Nenhuma conta encontrada para este domínio.</p>
            </div>
          )}
        </div>
      </div>
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        accountId={selectedAccountId}
        onClose={() => {
          setIsPasswordModalOpen(false);
          setSelectedAccountId(null);
        }}
      />
    </main>
  );
}
