"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateDomainAccount } from "@/src/api/axios";
import { Button } from "@/src/components/ui/button";
import { toast } from "sonner";
import { ChangePasswordModalProps } from "@/src/types/accountTypes";

export function ChangePasswordModal({
  isOpen,
  accountId,
  onClose,
}: ChangePasswordModalProps) {
  const [newPassword, setNewPassword] = useState("");
  const queryClient = useQueryClient();

  const updatePasswordMutation = useMutation({
    mutationFn: updateDomainAccount,
    onSuccess: () => {
      toast.success("Senha alterada com sucesso!");
      setNewPassword("");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
      onClose();
    },
    onError: () => toast.error("Erro ao alterar senha."),
  });

  if (!isOpen || !accountId) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePasswordMutation.mutate({
      id: accountId,
      data: { password: newPassword },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-sm rounded-xl border bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-slate-900">Nova Senha</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            placeholder="Digite a nova senha"
            className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
          />
          <div className="flex justify-end gap-3 mt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={updatePasswordMutation.isPending}>
              {updatePasswordMutation.isPending
                ? "Salvando..."
                : "Salvar Senha"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
