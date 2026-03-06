"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/src/api/axios";

import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import { Input } from "@/src/components/ui/input";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/src/components/ui/field";

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const token =
        data.accessToken || data.user.token || data.user.accessToken;

      if (token) {
        localStorage.setItem("fake-jwt-token", token);
      }
      console.log("Resposta do login:", data);
      toast.success("Login realizado com sucesso!");

      router.push("/domains");
    },
    onError: (error) => {
      console.error("Erro no login:", error);
      toast.error("E-mail ou senha incorretos. Tente novamente.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.warning("Por favor, preencha todos os campos.");
      return;
    }

    loginMutation.mutate({ email, password });
  };

  return (
    <main className="flex flex-col gap-6 items-center min-h-screen justify-center bg-secondary">
      <Card className="overflow-hidden p-0 md:w-200">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form
            className="p-6 flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center mb-4">
                <h1 className="text-2xl font-bold">Login</h1>
                <p className="text-muted-foreground text-balance">
                  Faça login na sua conta para continuar
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@exemplo.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Senha</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Esqueceu a sua senha?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              <Field className="mt-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loginMutation.isPending}
                >
                  <Link href={"/domains"}>
                    {loginMutation.isPending ? "Entrando..." : "Entrar"}
                  </Link>
                </Button>
              </Field>

              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card my-4">
                Ou continue com
              </FieldSeparator>

              <Field>
                <Button variant="outline" type="button" className="w-full">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    className="mr-2 h-4 w-4"
                  >
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  Login com Google
                </Button>
              </Field>
            </FieldGroup>

            <div className="mt-6 text-center text-sm">
              Não tem uma conta?{" "}
              <Link
                href="/register"
                className="underline font-semibold text-primary"
              >
                Cadastre-se
              </Link>
            </div>
          </form>

          <div className="bg-muted relative hidden md:block">
            <Image
              src="/vulkan.png"
              alt="Image"
              fill
              className="object-cover"
            />
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
