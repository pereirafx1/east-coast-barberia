import fs from "fs";
import path from "path";

export interface Marcacao {
  id: string;
  nome: string;
  telefone: string;
  servico: string;
  data: string;
  hora: string;
  mensagem?: string;
  criadoEm: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "marcacoes.json");

function ensureDataFile() {
  const dir = path.dirname(DATA_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  }
}

export function getMarcacoes(): Marcacao[] {
  ensureDataFile();
  const raw = fs.readFileSync(DATA_FILE, "utf-8");
  return JSON.parse(raw) as Marcacao[];
}

export function addMarcacao(marcacao: Omit<Marcacao, "id" | "criadoEm">): Marcacao {
  ensureDataFile();
  const marcacoes = getMarcacoes();
  const nova: Marcacao = {
    ...marcacao,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    criadoEm: new Date().toISOString(),
  };
  marcacoes.push(nova);
  fs.writeFileSync(DATA_FILE, JSON.stringify(marcacoes, null, 2));
  return nova;
}

export function deleteMarcacao(id: string): boolean {
  ensureDataFile();
  const marcacoes = getMarcacoes();
  const filtered = marcacoes.filter((m) => m.id !== id);
  if (filtered.length === marcacoes.length) return false;
  fs.writeFileSync(DATA_FILE, JSON.stringify(filtered, null, 2));
  return true;
}
