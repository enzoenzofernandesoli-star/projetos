import { useMemo, useState } from "react";
import { projetos, servicos, type Projeto, type ServicoId } from "./projetos";
import { Janela, MioloJanela } from "./components/Janela";
import { Visualizador } from "./components/Visualizador";
import { LogoVVC } from "./components/LogoVVC";

function CardProjeto({
  projeto,
  aoAbrir,
}: {
  projeto: Projeto;
  aoAbrir: () => void;
}) {
  const abrivel = Boolean(projeto.url);
  return (
    <article className="group">
      <button
        type="button"
        onClick={aoAbrir}
        disabled={!abrivel}
        aria-label={
          abrivel
            ? `Abrir prévia de ${projeto.nome}`
            : `${projeto.nome} — ${projeto.restricao}`
        }
        className="block w-full text-left transition-transform duration-300 ease-[var(--ease-out)] enabled:group-hover:-translate-y-1 disabled:cursor-default"
      >
        <div className="aspect-[16/10] shadow-[0_18px_50px_rgba(2,8,20,.55)] transition-[box-shadow] duration-300 group-hover:shadow-[0_22px_60px_rgba(24,119,255,.2)]">
          <Janela projeto={projeto}>
            <MioloJanela projeto={projeto} />
            {abrivel && (
              <span className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full border border-signal-bright/70 bg-ink/70 px-5 py-2.5 text-xs text-signal-bright">
                  Ver o site ↗
                </span>
              </span>
            )}
            {!abrivel && !projeto.ilustrativo && (
              <span className="absolute right-2 bottom-2 rounded-md bg-ink/80 px-2 py-1 text-[10px] text-ivory/60">
                {projeto.restricao}
              </span>
            )}
          </Janela>
        </div>
      </button>

      <div className="pt-4">
        <p className="rotulo text-signal-bright">{projeto.tipo}</p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl text-ivory">
          {projeto.nome}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ivory/70">
          {projeto.descricao}
        </p>
      </div>
    </article>
  );
}

export default function App() {
  const [aba, setAba] = useState<ServicoId>("sites");
  const [aberto, setAberto] = useState<Projeto | null>(null);

  const lista = useMemo(() => projetos.filter((p) => p.servico === aba), [aba]);
  const servicoAtual = servicos.find((s) => s.id === aba)!;
  const aoVivo = projetos.filter((p) => p.url).length;

  return (
    <div className="min-h-screen">
      {/* ---------- Cabeçalho ---------- */}
      <header className="fixed inset-x-0 top-0 z-40 border-b border-ivory/12 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-6 sm:px-10">
          <a
            href="#topo"
            className="flex min-h-11 items-center gap-3.5"
            aria-label="VIVECI — início"
          >
            <LogoVVC className="h-4 w-auto text-ivory" />
            <span className="hidden h-5 w-px bg-ivory/25 sm:block" />
            <span className="hidden font-[family-name:var(--font-display)] text-xs tracking-[0.22em] text-ivory sm:block">
              VIVECI
            </span>
          </a>
          <a
            href="https://wa.me/5511963755999"
            target="_blank"
            rel="noreferrer"
            className="inline-flex min-h-11 items-center gap-3 rounded-full border border-ivory/50 pr-1.5 pl-4 text-xs text-ivory transition-colors duration-200 hover:border-signal-bright hover:text-signal-bright"
          >
            Falar com a Viveci
            <span
              className="grid size-8 place-items-center rounded-full border border-ivory/30"
              aria-hidden
            >
              →
            </span>
          </a>
        </div>
      </header>

      {/* ---------- Primeira dobra ---------- */}
      <section
        id="topo"
        className="relative isolate flex min-h-[92svh] items-end overflow-hidden bg-navy pt-16 sm:items-center"
      >
        <img
          src="/android-vvc.png"
          alt="Android de acabamento preto e azul representando a tecnologia da Viveci"
          fetchPriority="high"
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[62%] w-full object-cover object-[62%_top] sm:inset-y-0 sm:right-0 sm:left-auto sm:h-full sm:w-[72%] sm:object-[center_top]"
        />
        {/*
          Véu direcional. No computador a copy vive à esquerda e a imagem à
          direita, então o escurecimento é horizontal. No celular os dois
          ocupam a mesma coluna: o android fica no topo e o véu é vertical,
          fechando antes do texto começar.
        */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(2,13,27,.5)_0%,rgba(2,13,27,.28)_24%,rgba(2,13,27,.9)_52%,#020d1b_66%)] sm:bg-[linear-gradient(90deg,rgba(2,13,27,.96)_0%,rgba(2,13,27,.86)_30%,rgba(2,13,27,.2)_60%,transparent_100%)]"
        />

        <div className="mx-auto w-full max-w-[1400px] px-6 pt-[46svh] pb-16 sm:px-10 sm:py-20">
          <p className="rotulo text-signal-bright">VVC Digital Studio</p>
          <h1 className="mt-6 max-w-2xl font-[family-name:var(--font-display)] text-[clamp(2rem,5.4vw,3.9rem)] leading-[1.08] tracking-[0.02em] text-ivory">
            Projetos que você pode abrir agora.
          </h1>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-ivory/75">
            Cada janela abaixo é o site real, rodando aqui dentro. Clique para
            navegar sem sair desta página. {aoVivo} dos {projetos.length}{" "}
            projetos estão no ar.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#projetos"
              className="inline-flex min-h-12 items-center gap-4 rounded-full border border-ivory/85 pr-1.5 pl-6 text-sm text-ivory transition-colors duration-200 hover:border-signal-bright hover:text-signal-bright"
            >
              Ver os projetos
              <span
                className="grid size-9 place-items-center rounded-full bg-ivory text-navy"
                aria-hidden
              >
                ↓
              </span>
            </a>
            <span className="rotulo text-ivory/55">
              Estratégia <i className="not-italic text-signal-bright">/</i> Design{" "}
              <i className="not-italic text-signal-bright">/</i> Tecnologia
            </span>
          </div>
        </div>
      </section>

      {/* ---------- Grade ---------- */}
      <section
        id="projetos"
        className="bg-[radial-gradient(ellipse_60%_40%_at_50%_0%,rgba(24,119,255,.12),transparent_60%)]"
      >
        <div className="mx-auto max-w-[1400px] px-6 pt-16 pb-24 sm:px-10 sm:pt-20">
          {/* Abas por serviço. São botões com role="tab": as setas do teclado
              trocam de aba, como o usuário espera de uma barra de abas. */}
          <div
            role="tablist"
            aria-label="Serviços"
            className="-mx-6 mb-2 flex gap-1 overflow-x-auto px-6 sm:mx-0 sm:px-0"
            onKeyDown={(evento) => {
              const passo =
                evento.key === "ArrowRight" ? 1 : evento.key === "ArrowLeft" ? -1 : 0;
              if (!passo) return;
              evento.preventDefault();
              const atual = servicos.findIndex((s) => s.id === aba);
              const proximo = servicos[(atual + passo + servicos.length) % servicos.length];
              setAba(proximo.id);
              document.getElementById(`aba-${proximo.id}`)?.focus();
            }}
          >
            {servicos.map((servico) => {
              const ativo = aba === servico.id;
              const quantos = projetos.filter((p) => p.servico === servico.id).length;
              return (
                <button
                  key={servico.id}
                  id={`aba-${servico.id}`}
                  role="tab"
                  type="button"
                  aria-selected={ativo}
                  aria-controls="painel-servico"
                  tabIndex={ativo ? 0 : -1}
                  onClick={() => setAba(servico.id)}
                  className={`relative flex min-h-12 flex-none items-center gap-2 border-b-2 px-4 text-sm whitespace-nowrap transition-colors duration-200 ${
                    ativo
                      ? "border-signal-bright text-ivory"
                      : "border-transparent text-ivory/55 hover:text-ivory/85"
                  }`}
                >
                  {servico.nome}
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] ${
                      ativo ? "bg-signal/20 text-signal-bright" : "bg-ivory/8 text-ivory/45"
                    }`}
                  >
                    {quantos}
                  </span>
                </button>
              );
            })}
          </div>
          <div className="mb-11 border-t border-steel/18 pt-5">
            <p className="max-w-xl text-sm leading-relaxed text-ivory/65">
              {servicoAtual.resumo}
            </p>
          </div>

          <div
            id="painel-servico"
            role="tabpanel"
            aria-labelledby={`aba-${aba}`}
            className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3"
          >
            {lista.map((projeto) => (
              <CardProjeto
                key={projeto.nome}
                projeto={projeto}
                aoAbrir={() => setAberto(projeto)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Rodapé ---------- */}
      <footer className="border-t border-steel/18 bg-ink">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-6 py-12 sm:flex-row sm:items-end sm:justify-between sm:px-10">
          <div>
            <LogoVVC className="h-6 w-auto text-ivory/85" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-ivory/60">
              Sua visão. Nossa tecnologia. Sites para negócios que atendem gente
              todo dia.
            </p>
          </div>
          <p className="rotulo text-ivory/45">© 2026 Viveci Digital Studio</p>
        </div>
      </footer>

      {aberto && (
        <Visualizador projeto={aberto} aoFechar={() => setAberto(null)} />
      )}
    </div>
  );
}
