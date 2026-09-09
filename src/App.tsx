import { useMemo, useState } from "react";
import { categorias, projetos, type Projeto } from "./projetos";
import { Janela } from "./components/Janela";
import { Visualizador } from "./components/Visualizador";

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
          abrivel ? `Abrir prévia de ${projeto.nome}` : `${projeto.nome} — ${projeto.restricao}`
        }
        className="block w-full text-left transition-transform duration-300 ease-[var(--ease-out)] enabled:group-hover:-translate-y-1 disabled:cursor-default"
      >
        <div className="aspect-[16/10] shadow-[0_18px_50px_rgba(2,8,20,.55)] transition-[box-shadow] duration-300 group-hover:shadow-[0_22px_60px_rgba(24,119,255,.18)]">
          <Janela projeto={projeto}>
            <img
              src={projeto.capa}
              alt={`Página inicial do projeto ${projeto.nome}`}
              loading="lazy"
              className="absolute inset-0 size-full object-cover object-top"
            />
            {abrivel && (
              <span className="pointer-events-none absolute inset-0 grid place-items-center bg-ink/55 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <span className="rounded-full border border-signal-bright/70 bg-ink/70 px-5 py-2.5 text-xs text-signal-bright">
                  Ver o site ↗
                </span>
              </span>
            )}
            {!abrivel && (
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
  const [filtro, setFiltro] = useState<string>("Todos");
  const [aberto, setAberto] = useState<Projeto | null>(null);

  const lista = useMemo(
    () => (filtro === "Todos" ? projetos : projetos.filter((p) => p.categoria === filtro)),
    [filtro]
  );

  const aoVivo = projetos.filter((p) => p.url).length;

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_70%_50%_at_50%_-10%,rgba(24,119,255,.14),transparent_60%)]">
      <header className="mx-auto max-w-[1400px] px-6 pt-14 pb-10 sm:px-10 sm:pt-20">
        <p className="rotulo text-signal-bright">VVC Digital Studio</p>
        <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-display)] text-3xl leading-tight tracking-[0.02em] text-ivory sm:text-5xl">
          Projetos que você pode abrir agora.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-ivory/70">
          Cada janela abaixo é o site real, rodando aqui dentro. Clique para
          navegar sem sair desta página. {aoVivo} dos {projetos.length} projetos
          estão no ar.
        </p>

        <nav className="mt-9 flex flex-wrap gap-2" aria-label="Filtrar por tipo">
          {categorias.map((categoria) => {
            const ativo = filtro === categoria;
            return (
              <button
                key={categoria}
                type="button"
                onClick={() => setFiltro(categoria)}
                aria-pressed={ativo}
                className={`min-h-11 rounded-full border px-4 text-xs transition-colors duration-200 ${
                  ativo
                    ? "border-signal-bright bg-signal/12 text-signal-bright"
                    : "border-steel/30 text-ivory/70 hover:border-steel/60 hover:text-ivory"
                }`}
              >
                {categoria}
              </button>
            );
          })}
        </nav>
      </header>

      <main className="mx-auto max-w-[1400px] px-6 pb-24 sm:px-10">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 xl:grid-cols-3">
          {lista.map((projeto) => (
            <CardProjeto
              key={projeto.nome}
              projeto={projeto}
              aoAbrir={() => setAberto(projeto)}
            />
          ))}
        </div>
      </main>

      <footer className="mx-auto max-w-[1400px] border-t border-steel/18 px-6 py-8 text-xs text-ivory/50 sm:px-10">
        <p>VIVECI · VVC Digital Studio — sua visão, nossa tecnologia.</p>
      </footer>

      {aberto && <Visualizador projeto={aberto} aoFechar={() => setAberto(null)} />}
    </div>
  );
}
