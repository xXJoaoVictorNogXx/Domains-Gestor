/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { getAccount } from "@/src/api/axios";
import Image from "next/image";
import { Button } from "@/src/components/ui/button";
import { Card, CardContent } from "@/src/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/src/components/ui/field";
import { Input } from "@/src/components/ui/input";
import Link from "next/link";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";

export default function login() {
  return (
    <main className="flex flex-col gap-6 items-center min-h-screen justify-center bg-secondary">
      <Card className="overflow-hidden p-0 md:w-250">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6">
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
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
                <Input id="password" type="password" required />
              </Field>
              <Field>
                <Button
                  type="submit"
                  className="w-full"
                  disabled={users.isPending}
                  onClick={(e) => {
                    toast("Funcionalidade de login ainda não implementada.");
                  }}
                >
                  {users.isPending ? "Entrando..." : "Entrar"}
                </Button>
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">
                Ou continue com
              </FieldSeparator>
              <Field className=" ">
                <Button variant="outline" type="button">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  <span className="sr-only">Login with Google</span>
                </Button>
              </Field>
              <FieldDescription className="text-center">
                <a href="#"></a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="bg-muted relative hidden md:block">
            <Image
              src="/vulkan.png"
              alt="Image"
              width={100}
              height={100}
              className="h-full w-full"
            />
          </div>
          {/*
           {error && (
            <p className="text-sm font-medium text-destructive">{error}</p> }
          )} 
            */}
          <div className="mt-4 text-center text-sm">
            Não tem uma conta?
            <Link href="/cadastro" className="underline">
              Cadastre-se
            </Link>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
