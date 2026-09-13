#!/usr/bin/env node
/**
 * Sincroniza a vitrine com a conta da Vercel.
 *
 *   npm run sincronizar          lista o que falta e o que mudou
 *   npm run sincronizar -- --aplicar   escreve em src/projetos.ts e baixa capas
 *
 * Usa a CLI da Vercel após login na máquina — nenhum token precisa ser
 * guardado no repositório nem passado adiante.
 *
 * Nada entra na vitrine sem passar por três checagens, porque um cartão que
 * abre errado é pior do que cartão nenhum:
 *
 *   1. responde 200
 *   2. não envia X-Frame-Options nem frame-ancestors, senão a janela ao vivo
 *      fica em branco
 *   3. tem título próprio — "Create Next App" e afins são projeto vazio
 *
 * O que passa entra marcado com `revisar: true`, para você escrever a
 * descrição e conferir o serviço antes de mostrar a cliente.
 */

import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), "..");
const ARQUIVO = join(RAIZ, "src", "projetos.ts");
const CAPAS = join(RAIZ, "public", "capas");
const APLICAR = process.argv.includes("--aplicar");

/**
 * Projetos que existem na conta mas não são portfólio: a própria vitrine, os
 * sites do estúdio, rascunhos e duplicatas. Para incluir algum, tire daqui.
 */
const IGNORAR = new Set([
  "projetos",
  "vivecisites",
  "vivecisites-vbls",
  "web",
  "viveci-appp",
  "meu-space",
  "prospector-xp4n",
  "maps-prospector",
  "vvc-command-center",
]);

const TITULOS_VAZIOS = [
  "create next app",
  "vite + react",
  "react app",
  "next.js",
  "untitled",
  "",
];

const cor = {
  ok: (t) => `\x1b[32m${t}\x1b[0m`,
  aviso: (t) => `\x1b[33m${t}\x1b[0m`,
  erro: (t) => `\x1b[31m${t}\x1b[0m`,
  fraco: (t) => `\x1b[2m${t}\x1b[0m`,
};

/**
 * No Windows a CLI é um `.cmd`. Desde o Node 20 o `execFileSync` recusa
 * arquivo de lote sem `shell: true` — dá ENOENT sem a extensão e EINVAL com
 * ela. Os argumentos aqui são fixos ou numéricos, então o shell é seguro.
 */
const CLI = process.platform === "win32" ? "vercel.cmd" : "vercel";
const PELO_SHELL = process.platform === "win32";

/** Todas as páginas de `vercel project ls`, com a URL de produção. */
function listarDaVercel() {
  const projetos = [];
  let proximo = null;

  for (let pagina = 0; pagina < 20; pagina++) {
    const args = ["project", "ls"];
    if (proximo) args.push("--next", proximo);
    /*
     * A tabela sai no stderr, não no stdout: fora de um terminal a CLI trata
     * a listagem como mensagem de progresso. Lendo só o stdout, o script
     * encontrava zero projetos e não reclamava de nada.
     */
    const r = spawnSync(CLI, args, {
      encoding: "utf8",
      shell: PELO_SHELL,
      maxBuffer: 8 * 1024 * 1024,
    });
    if (r.error) throw r.error;
    const saida = `${r.stdout ?? ""}
${r.stderr ?? ""}`;
    if (r.status !== 0 || /no existing credentials|starting login flow|not logged in/i.test(saida)) {
      throw new Error(`Vercel indisponível ou sem login. Execute "vercel login" e tente novamente. Detalhe: ${saida.trim().slice(-350)}`);
    }

    for (const linha of saida.split("\n")) {
      const m = linha.match(/^\s*(\S+)\s+(https:\/\/\S+)\s/);
      if (m && m[1] !== "Project") projetos.push({ nome: m[1], url: m[2] });
    }

    const cursor = saida.match(/--next (\d+)/);
    if (!cursor) break;
    proximo = cursor[1];
  }
  if (!projetos.length) throw new Error("A Vercel não retornou projetos reconhecíveis. Confira o login e o formato da listagem; nada foi alterado.");
  return projetos;
}

/** Status, cabeçalhos de moldura e título — as três checagens de uma vez. */
async function inspecionar(url) {
  try {
    const r = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    const html = await r.text();
    const xfo = r.headers.get("x-frame-options");
    const csp = r.headers.get("content-security-policy") ?? "";
    const metaCsp = /frame-ancestors/i.test(html);
    const titulo = (html.match(/<title[^>]*>([^<]*)/i)?.[1] ?? "").trim();
    return {
      status: r.status,
      final: r.url,
      moldura: !xfo && !/frame-ancestors/i.test(csp) && !metaCsp,
      titulo,
      vazio: TITULOS_VAZIOS.includes(titulo.toLowerCase()),
      login: /\/(auth|login|sign-in)/.test(r.url),
    };
  } catch (erro) {
    return { status: 0, erro: String(erro.message ?? erro) };
  }
}

function capturar(url, destino) {
  const chrome =
    process.env.CHROME_PATH ??
    "C:/Program Files/Google/Chrome/Application/chrome.exe";
  if (!existsSync(chrome)) return false;
  try {
    execFileSync(
      chrome,
      [
        "--headless=new",
        "--disable-gpu",
        "--hide-scrollbars",
        "--window-size=1440,900",
        `--screenshot=${destino}`,
        "--virtual-time-budget=9000",
        url,
      ],
      { stdio: "ignore", timeout: 60000 }
    );
    return existsSync(destino);
  } catch {
    return false;
  }
}

const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const titulacao = (s) =>
  s
    .split("-")
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

function blocoTS({ nome, url, titulo, capa }) {
  const descricao = titulo && titulo !== titulacao(nome)
    ? titulo.slice(0, 150)
    : "Projeto publicado pela Viveci. Explore a prévia para conhecer o site.";
  return `  {
    nome: ${JSON.stringify(titulacao(nome))},
    tipo: "Projeto digital",
    descricao: ${JSON.stringify(descricao)},
    servico: "outros",
    capa: ${JSON.stringify(capa)},
    url: ${JSON.stringify(url)},
    adicionadoEm: ${JSON.stringify(new Date().toISOString().slice(0, 10))},
    revisar: true,
  },
`;
}

// ---------------------------------------------------------------- execução

const fonte = readFileSync(ARQUIVO, "utf8");
const jaTem = (url, nome) =>
  fonte.includes(`"${url}"`) ||
  fonte.includes(`"${url.replace(/^https:\/\//, "")}"`) ||
  new RegExp(`nome: "${titulacao(nome)}"`).test(fonte);

console.log(cor.fraco("Consultando a Vercel..."));
let daVercel;
try {
  daVercel = listarDaVercel();
} catch (erro) {
  console.error(cor.erro(String(erro.message ?? erro)));
  process.exit(1);
}
console.log(cor.fraco(`${daVercel.length} projetos na conta.\n`));

const novos = [];
const recusados = [];

for (const p of daVercel) {
  if (IGNORAR.has(p.nome)) continue;
  if (jaTem(p.url, p.nome)) continue;

  const info = await inspecionar(p.url);
  const motivo =
    info.status !== 200
      ? `responde ${info.status || "erro"}`
      : info.login
        ? "cai em tela de login"
        : !info.moldura
          ? "bloqueia janela (X-Frame-Options)"
          : info.vazio
            ? `sem título próprio ("${info.titulo}")`
            : null;

  if (motivo) {
    recusados.push({ ...p, motivo });
    console.log(`${cor.aviso("pulado")}  ${p.nome.padEnd(22)} ${cor.fraco(motivo)}`);
    continue;
  }

  novos.push({ ...p, titulo: info.titulo });
  console.log(`${cor.ok("novo")}    ${p.nome.padEnd(22)} ${cor.fraco(info.titulo)}`);
}

/*
 * A conta tem várias implantações do mesmo site — quatro do Maria Flor, duas
 * do Imobilis. Como a CLI lista da mais recente para a mais antiga, fica a
 * primeira de cada título e as outras são descartadas.
 */
const porTitulo = new Map();
const repetidos = [];
for (const p of novos) {
  const chave = p.titulo.toLowerCase().trim();
  if (porTitulo.has(chave)) repetidos.push(p);
  else porTitulo.set(chave, p);
}
novos.length = 0;
novos.push(...porTitulo.values());
for (const d of repetidos) {
  console.log(
    `${cor.fraco("repetido")} ${d.nome.padEnd(22)} ${cor.fraco("mesma pagina de outro projeto")}`
  );
}

console.log(
  `\n${novos.length} para entrar · ${repetidos.length} repetidos · ${recusados.length} pulados · ${
    daVercel.length - novos.length - repetidos.length - recusados.length
  } já na vitrine ou ignorados`
);

if (!novos.length) process.exit(0);

if (!APLICAR) {
  console.log(cor.fraco("\nRode com --aplicar para inserir e baixar as capas."));
  process.exit(0);
}

mkdirSync(CAPAS, { recursive: true });
let blocos = "";

for (const p of novos) {
  const arquivo = `${slug(p.nome)}.png`;
  const destino = join(CAPAS, arquivo);
  const feito = capturar(p.url, destino);
  console.log(
    feito ? `${cor.ok("capa")}    ${arquivo}` : `${cor.aviso("sem capa")} ${p.nome}`
  );
  blocos += blocoTS({ ...p, capa: feito ? `/capas/${arquivo}` : "" });
}

const marca = "  // ---------------- Aplicativos ----------------";
if (!fonte.includes(marca)) {
  console.error(cor.erro("Não achei onde inserir em projetos.ts. Nada foi escrito."));
  process.exit(1);
}
writeFileSync(ARQUIVO, fonte.replace(marca, `${blocos}\n${marca}`), "utf8");

console.log(
  cor.ok(`\n${novos.length} inserido(s) em src/projetos.ts, marcados com revisar: true.`)
);
console.log(cor.fraco("Ajuste tipo, descrição e serviço, rode npm run build e publique."));
