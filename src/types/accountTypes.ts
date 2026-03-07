import * as z from "zod";
export interface Account {
  id: string;
  email: string;
  storage: number;
  isBlocked: boolean;
  domainId: string;
}

export interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  accountId: string | null;
}

export interface CreateAccountModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: {
    email: string;
    password: string;
    storage: number;
  }) => void;
}

export const createAccountSchema = z.object({
  email: z.string().email("E-mail inválido").min(1, "O e-mail é obrigatório"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
  storage: z.number().min(1, "O limite mínimo é 1GB").max(1000, "Limite máximo de 1TB"),
});

export type CreateAccountFormData = z.infer<typeof createAccountSchema>;

export interface CreateAccountModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSubmit: (data: CreateAccountFormData) => void;
}