import type { Projeto } from "../projetos";

/**
 * Capa dos projetos conceituais: a primeira dobra inteira de um site, montada
 * em HTML — menu, chamada, apoio, dois botões e a linha de prova.
 *
 * Tudo dimensionado em `cqw`, unidade do container: a mesma composição serve
 * ao cartão de 400px do grid e à janela grande do visualizador, sem dois
 * conjuntos de tamanhos.
 *
 * As fotos vêm de banco com licença livre para uso comercial e ficam
 * hospedadas em `public/conceitos` — nada é carregado de terceiro em tempo de
 * execução. Cada conceito tem a própria fonte: uma barbearia não usa a mesma
 * tipografia de um escritório de advocacia.
 */
export function CapaConceito({ projeto }: { projeto: Projeto }) {
  const p = projeto.paleta ?? {
    fundo: "#0b1220",
    campo: "#152238",
    tinta: "#f4f1e9",
    acento: "#1877ff",
  };
  const fonte = projeto.fonte ?? "var(--font-display)";
  const layout = projeto.layout ?? "editorial";
  const centro = layout === "central";
  const [linha1, linha2] = projeto.chamada ?? ["", ""];
  const pagina = projeto.pagina;

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      style={{ background: p.fundo, color: p.tinta }}
    >
      {projeto.imagem && (
        <img
          src={projeto.imagem}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      )}

      {/* Véu na cor do conceito. Sem ele a foto ganha do texto. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: centro
            ? `radial-gradient(ellipse 86% 86% at 50% 46%, ${p.fundo}e6, ${p.fundo}f2 58%, ${p.fundo}fa)`
            : `linear-gradient(96deg, ${p.fundo}fa 0%, ${p.fundo}ee 38%, ${p.fundo}80 68%, ${p.fundo}b3 100%)`,
        }}
      />

      {/* ---- barra de navegação ---- */}
      <header className="absolute inset-x-0 top-0 flex items-center justify-between gap-[3cqw] px-[5cqw] py-[3.2cqw]">
        <span
          className="shrink-0 text-[2.4cqw] tracking-[0.22em] whitespace-nowrap uppercase"
          style={{ fontFamily: fonte }}
        >
          {projeto.nome}
        </span>
        <nav className="flex min-w-0 items-center gap-[2.6cqw] overflow-hidden text-[1.9cqw] opacity-75">
          {pagina?.menu.map((item) => (
            <span key={item} className="whitespace-nowrap">
              {item}
            </span>
          ))}
        </nav>
        <span
          className="hidden rounded-full px-[2.4cqw] py-[1.1cqw] text-[1.9cqw] whitespace-nowrap sm:inline"
          style={{ background: p.acento, color: p.fundo }}
        >
          {pagina?.botoes[0]}
        </span>
      </header>

      {/* ---- primeira dobra ---- */}
      <div
        className={`absolute inset-x-0 top-[12cqw] bottom-[8cqw] flex flex-col justify-center px-[5cqw] ${
          centro ? "items-center text-center" : "items-start"
        }`}
      >
        <span
          className="text-[1.9cqw] tracking-[0.26em] uppercase"
          style={{ color: p.acento }}
        >
          {pagina?.kicker}
        </span>

        <h3
          className="mt-[2cqw] text-[6.6cqw] leading-[1.04]"
          style={{ fontFamily: fonte }}
        >
          {linha1}
          <br />
          {linha2}
        </h3>

        <p
          className={`mt-[2.2cqw] text-[2.2cqw] leading-snug opacity-80 ${
            centro ? "max-w-[70cqw]" : "max-w-[52cqw]"
          }`}
        >
          {pagina?.sub}
        </p>

        <div className="mt-[2.8cqw] flex items-center gap-[2cqw]">
          <span
            className="rounded-full px-[3.4cqw] py-[1.5cqw] text-[2.1cqw] whitespace-nowrap"
            style={{ background: p.acento, color: p.fundo }}
          >
            {pagina?.botoes[0]}
          </span>
          <span
            className="rounded-full border px-[3.4cqw] py-[1.5cqw] text-[2.1cqw] whitespace-nowrap"
            style={{ borderColor: `${p.tinta}66` }}
          >
            {pagina?.botoes[1]}
          </span>
        </div>
      </div>

      {/* ---- linha de prova, rente ao pé da dobra ---- */}
      <p
        className={`absolute inset-x-0 bottom-[3cqw] px-[5cqw] text-[1.9cqw] opacity-60 ${
          centro ? "text-center" : ""
        }`}
      >
        {pagina?.prova}
      </p>
    </div>
  );
}
