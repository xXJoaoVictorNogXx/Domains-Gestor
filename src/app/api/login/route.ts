import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const user = db.users.find((u) => u.email === email && u.password === password);

    if (user) {
      return NextResponse.json({
        accessToken: "fake-jwt-token",
        user: user
      });
    }

    return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    
  } catch (error) {
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}