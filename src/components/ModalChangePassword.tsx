"use client";

import { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { ChangePasswordModalProps } from "@/src/types/accountTypes";
import { passwordSchema } from "@/src/schemas/modalSchema";
import { ZodError } from "zod";

export function ChangePasswordModal({
  isOpen,
  onClose,
  accountId,
}: ChangePasswordModalProps) {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validation = passwordSchema.safeParse({ password, confirmPassword });
    const zodError = validation.success ? null : (validation.error as ZodError);

    if (!validation.success) {
      setError(
        zodError?.issues?.[0]?.message ||
          "Dados inválidos. Verifique os campos e tente novamente.",
      );
      return;
    }

    // 3. TODO: Aqui você vai chamar o seu useMutation!
    console.log("Validação Zod passou! Mutation pronta para rodar:", {
      accountId,
      newPassword: validation.data.password,
    });

    alert(`Senha da conta ${accountId} alterada com sucesso!`);
    setPassword("");
    setConfirmPassword("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-800">Alterar Senha</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Conta ID:{" "}
            <span className="font-mono text-primary">{accountId}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Nova Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Digite a nova senha"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Confirmar Nova Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Repita a senha"
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20 font-medium">
              ⚠️ {error}
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">Salvar Senha</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
