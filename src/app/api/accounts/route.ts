import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";

export async function GET() {
  return NextResponse.json(db.accounts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const newAccount = {
      ...body,
      id: String(Date.now()), 
    };
    
    db.accounts.push(newAccount);
    
    return NextResponse.json(newAccount, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao criar conta" }, { status: 400 });
  }
}