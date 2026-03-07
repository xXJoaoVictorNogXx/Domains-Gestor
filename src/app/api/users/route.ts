import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";

export async function GET() {
  return NextResponse.json(db.users);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Verifica se o e-mail já existe
    const userExists = db.users.some(u => u.email === body.email);
    if (userExists) {
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 400 });
    }

    const newUser = {
      ...body,
      id: String(Date.now()),
    };
    
    db.users.push(newUser);
    
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao registrar usuário" }, { status: 400 });
  }
}