import { NextResponse } from "next/server";
import { supabase } from "@/src/lib/supabase";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const { data: users, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', password);

    if (error || !users || users.length === 0) {
      return NextResponse.json({ error: "E-mail ou senha incorretos" }, { status: 401 });
    }

    const user = users[0];

    return NextResponse.json({
      accessToken: `fake-jwt-token-${user.id}`,
      user: user
    });
    
  } catch (error) {
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}