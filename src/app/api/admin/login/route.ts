import { NextRequest, NextResponse } from "next/server";
import { signToken, ADMIN_PASSWORD, TOKEN_COOKIE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();

    if (password !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Palavra-passe incorreta." }, { status: 401 });
    }

    const token = await signToken();

    const res = NextResponse.json({ success: true });
    res.cookies.set(TOKEN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 8,
      path: "/",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Erro interno." }, { status: 500 });
  }
}

export async function DELETE() {
  const res = NextResponse.json({ success: true });
  res.cookies.delete(TOKEN_COOKIE);
  return res;
}
