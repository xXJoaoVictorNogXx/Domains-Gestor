"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/src/components/ui/button";
import { createAccount } from "@/src/api/axios";
import { registerSchema } from "@/src/schemas/registerSchema";
import { toast } from "sonner";
import { ZodError } from "zod";
import { useMutation } from "@tanstack/react-query";
import { ProtectedRoute } from "@/src/components/protectedRoutes";

export default function Register() {
  const registerMutation = useMutation({
    mutationFn: createAccount,
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
      router.push("/login");
    },
    onError: () => {
      toast.error("Erro ao criar a conta. Tente novamente.");
    },
  });

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    toast.error(null);
    setIsLoading(true);

    const validation = registerSchema.safeParse({
      name,
      email,
      password,
      confirmPassword,
    });

    const zodError = validation.success ? null : (validation.error as ZodError);

    if (!validation.success) {
      console.log("Validation error:", validation);
      toast.error(
        zodError?.issues?.[0]?.message ||
          "Dados inválidos. Verifique os campos e tente novamente.",
      );

      const mensagemErro =
        zodError?.issues?.[0]?.message ||
        "Dados inválidos. Verifique os campos e tente novamente.";

      toast.error(mensagemErro);
      setIsLoading(false);
      return;
    }

    registerMutation.mutate(
      {
        name: validation.data.name,
        email: validation.data.email,
        password: validation.data.password,
      },
      {
        onError: (error) => {
          const mensagemErro =
            error instanceof Error
              ? error.message
              : "Erro ao criar a conta. Tente novamente.";
          toast.error(mensagemErro);
        },
      },
    );

    setIsLoading(false);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-slate-100 p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-slate-900">
            Criar Nova Conta
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Preencha os dados abaixo para se cadastrar no sistema.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Nome Completo
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="João da Silva"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="joao@exemplo.com"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Confirmar Senha
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              placeholder="••••••••"
              disabled={isLoading}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md border border-destructive/20 font-medium text-center">
              {error}
            </div>
          )}

          <Button type="submit" className="w-full mt-2" disabled={isLoading}>
            {isLoading ? "Cadastrando..." : "Cadastrar"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-600">
          Já possui uma conta?
          <Link
            href="/login"
            className="font-semibold text-primary hover:underline"
          >
            Faça login aqui
          </Link>
        </div>
      </div>
    </main>
  );
}
