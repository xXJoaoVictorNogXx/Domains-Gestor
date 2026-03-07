"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getAccount,
  getDomains,
  deleteDomainAccount,
  updateDomainAccount,
} from "@/src/api/axios";
import { useParams } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { Switch } from "@/src/components/ui/switch";
import { useState } from "react";
import { ChangePasswordModal } from "@/src/components/ModalChangePassword";
import { CreateAccountModal } from "@/src/components/ModalAccountDomain";
import { ProtectedRoute } from "@/src/components/protectedRoutes";
import { toast } from "sonner";
import Link from "next/link";

export default function DomainAccounts() {
  const params = useParams();
  const domainId = params.id;
  const queryClient = useQueryClient();

  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );

  const accounts = useQuery({ queryKey: ["accounts"], queryFn: getAccount });
  const domains = useQuery({ queryKey: ["domains"], queryFn: getDomains });

  const deleteMutation = useMutation({
    mutationFn: deleteDomainAccount,
    onSuccess: () => {
      toast.success("Conta removida com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateDomainAccount,
    onSuccess: () => {
      toast.success("Conta atualizada!");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
  });

  if (accounts.isPending || domains.isPending) {
    return (
      <div className="p-10 text-center text-slate-500">
        Carregando contas...
      </div>
    );
  }

  const contasDoDominio =
    accounts.data?.filter((a) => String(a.domainId) === String(domainId)) || [];
  const dominioAtual = domains.data?.find(
    (d) => String(d.id) === String(domainId),
  );

  return (
    <ProtectedRoute>
      <main className="flex flex-col gap-6 items-center min-h-screen bg-secondary py-10">
        <div className="w-full max-w-6xl px-4">
          <div className="mb-8 flex justify-between items-center">
            <Button asChild variant="outline" size="sm">
              <Link href="/domains">&larr; Voltar para Domínios</Link>
            </Button>
            <h1 className="text-3xl font-bold tracking-tight">
              Contas: {dominioAtual?.name || `Domínio ${domainId}`}
            </h1>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              + Nova Conta
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow w-full">
            {contasDoDominio.length > 0 ? (
              <ul className="flex flex-col gap-4">
                {contasDoDominio.map((account) => (
                  <li
                    key={account.id}
                    className="border border-slate-200 p-5 rounded-lg flex flex-col gap-5 bg-slate-50/50"
                  >
                    <div className="flex justify-between items-center border-b pb-4">
                      <div>
                        <span className="text-xs text-muted-foreground uppercase font-bold">
                          E-mail
                        </span>
                        <p className="font-mono text-lg font-medium">
                          {account.email}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="sm"
                        disabled={deleteMutation.isPending}
                        onClick={() => {
                          if (
                            toast.warning("Deseja mesmo remover esta conta?")
                          ) {
                            deleteMutation.mutate(account.id);
                          }
                        }}
                      >
                        ❌ Remover
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold">
                          Status de Acesso
                        </span>
                        <div className="flex items-center gap-2">
                          <Switch
                            checked={account.isBlocked}
                            disabled={updateMutation.isPending}
                            onCheckedChange={(checked) => {
                              updateMutation.mutate({
                                id: account.id,
                                data: { isBlocked: checked },
                              });
                            }}
                          />
                          <span className="text-sm text-muted-foreground">
                            {account.isBlocked ? "Bloqueada" : "Ativa"}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold">
                          Storage (GB)
                        </span>
                        <div className="flex items-center gap-2">
                          <input
                            id={`storage-${account.id}`}
                            type="number"
                            defaultValue={account.storage || 10}
                            className="flex h-10 w-full rounded-md border border-input px-3 py-2 text-sm max-w-25"
                          />
                          <Button
                            variant="secondary"
                            size="sm"
                            disabled={updateMutation.isPending}
                            onClick={() => {
                              const inputElement = document.getElementById(
                                `storage-${account.id}`,
                              ) as HTMLInputElement;
                              updateMutation.mutate({
                                id: account.id,
                                data: { storage: Number(inputElement.value) },
                              });
                            }}
                          >
                            💾 Salvar
                          </Button>
                        </div>
                      </div>

                      <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold">Segurança</span>
                        <Button
                          variant="outline"
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
              <p className="text-center py-8 text-muted-foreground">
                Nenhuma conta encontrada.
              </p>
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
        <CreateAccountModal
          key={isCreateModalOpen ? "open" : "closed"}
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={(data) =>
            toast.success("Conta criada com sucesso!") ||
            queryClient.invalidateQueries({ queryKey: ["accounts"] })
          }
          isLoading={false}
        />
      </main>
    </ProtectedRoute>
  );
}
