"use client";

import { useEffect } from "react";
import { useForm, FieldErrors } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/src/components/ui/button";
import {
  createAccountSchema,
  CreateAccountFormData,
  CreateAccountModalProps,
} from "@/src/types/accountTypes";

export function CreateAccountModal({
  isOpen,
  isLoading,
  onClose,
  onSubmit,
}: CreateAccountModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAccountFormData>({
    resolver: zodResolver(createAccountSchema),
    defaultValues: {
      storage: 10,
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onInvalid = (formErrors: FieldErrors<CreateAccountFormData>) => {
    const errorMessages = Object.values(formErrors);
    if (errorMessages.length > 0) {
      toast.error(errorMessages[0]?.message as string);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-xl border bg-white p-6 shadow-2xl">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            Criar Nova Conta
          </h2>
          <p className="text-sm text-slate-500">
            Preencha os dados para adicionar um novo e-mail ao domínio.
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit, onInvalid)}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              E-mail
            </label>
            <input
              {...register("email")}
              type="email"
              disabled={isLoading}
              placeholder="exemplo@dominio.com"
              className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${
                errors.email
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-input"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Senha Provisória
            </label>
            <input
              {...register("password")}
              type="password"
              disabled={isLoading}
              placeholder="••••••••"
              className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${
                errors.password
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-input"
              }`}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-slate-700">
              Limite (GB)
            </label>
            <input
              {...register("storage", { valueAsNumber: true })}
              type="number"
              disabled={isLoading}
              className={`flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 ${
                errors.storage
                  ? "border-red-500 focus-visible:ring-red-500"
                  : "border-input"
              }`}
            />
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="min-w-30 bg-primary text-white"
            >
              {isLoading ? "Salvando..." : "Criar Conta"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
