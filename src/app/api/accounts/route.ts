import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function GET() {
  const { data, error } = await supabase
    .from('accounts')
    .select('*');

  if (error) {
    return NextResponse.json({ error: "Erro ao buscar contas" }, { status: 400 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const newAccount = {
      ...body,
      id: String(Date.now()), 
    };

    const { data, error } = await supabase
      .from('accounts')
      .insert([newAccount])
      .select()
      .single(); 

    if (error) {
      console.error("Erro do Supabase:", error);
      return NextResponse.json({ error: "Erro ao criar conta no banco" }, { status: 400 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}