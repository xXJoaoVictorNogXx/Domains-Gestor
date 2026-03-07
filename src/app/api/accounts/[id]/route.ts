import { NextResponse } from "next/server";
import { db } from "@/src/lib/db";

export async function PATCH(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    const index = db.accounts.findIndex((a) => String(a.id) === String(params.id));

    if (index === -1) {
      return NextResponse.json({ error: "Conta não encontrada" }, { status: 404 });
    }

    db.accounts[index] = { ...db.accounts[index], ...body };

    return NextResponse.json(db.accounts[index], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao atualizar conta" }, { status: 400 });
  }
}

export async function DELETE(
  request: Request, 
  { params }: { params: { id: string } }
) {
  try {
    const index = db.accounts.findIndex((a) => String(a.id) === String(params.id));

    if (index === -1) {
      return NextResponse.json({ error: "Conta não encontrada" }, { status: 404 });
    }

    db.accounts.splice(index, 1);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Erro ao deletar conta" }, { status: 400 });
  }
}