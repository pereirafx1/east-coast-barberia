import { NextRequest, NextResponse } from "next/server";
import { addMarcacao, getMarcacoes, deleteMarcacao } from "@/lib/marcacoes";
import { verifyToken, TOKEN_COOKIE } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value ?? "";
  const valid = await verifyToken(token);
  if (!valid) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }
  const marcacoes = getMarcacoes();
  return NextResponse.json(marcacoes);
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { nome, telefone, servico, data, hora, mensagem } = body;

    if (!nome || !telefone || !servico || !data || !hora) {
      return NextResponse.json(
        { error: "Todos os campos obrigatórios devem ser preenchidos." },
        { status: 400 }
      );
    }

    const nova = addMarcacao({ nome, telefone, servico, data, hora, mensagem });
    return NextResponse.json(nova, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Erro interno do servidor." }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const token = req.cookies.get(TOKEN_COOKIE)?.value ?? "";
  const valid = await verifyToken(token);
  if (!valid) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "ID em falta." }, { status: 400 });
  }

  const deleted = deleteMarcacao(id);
  if (!deleted) {
    return NextResponse.json({ error: "Marcação não encontrada." }, { status: 404 });
  }

  return NextResponse.json({ success: true });
}
