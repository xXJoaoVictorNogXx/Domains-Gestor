import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase"; 

export async function GET() {
  const { data, error } = await supabase
    .from('domains')
    .select('*');

  if (error) {
    return NextResponse.json({ error: "Erro ao procurar domínios" }, { status: 400 });
  }

  return NextResponse.json(data);
}