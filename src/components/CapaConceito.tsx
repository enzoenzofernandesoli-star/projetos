import type { Projeto } from "../projetos";

/**
 * Capa dos projetos conceituais: uma composição de página, com foto real de
 * fundo, a paleta do conceito e a fonte dele.
 *
 * As fotos vêm de banco com licença livre para uso comercial e ficam
 * hospedadas aqui, em `public/conceitos` — nada é carregado de terceiro em
 * tempo de execução.
 *
 * Cada conceito tem a própria fonte, como teria um site de verdade: uma
 * barbearia não usa a mesma tipografia de um escritório de advocacia.
 */
export function CapaConceito({ projeto }: { projeto: Projeto }) {
  const p = projeto.paleta ?? {
    fundo: "#0b1220",
    campo: "#152238",
    tinta: "#f4f1e9",
    acento: "#1877ff",
  };
  const layout = projeto.layout ?? "editorial";
  const fonte = projeto.fonte ?? "var(--font-display)";
  const [linha1, linha2] = projeto.chamada ?? ["", ""];

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: p.fundo }}>
      {projeto.imagem && (
        <img
          src={projeto.imagem}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
      )}

      {/* Véu na cor do conceito: a foto vira fundo, o texto ganha leitura. */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            layout === "central"
              ? `radial-gradient(ellipse 74% 74% at 50% 50%, ${p.fundo}f2, ${p.fundo}cc 62%, ${p.fundo}f7)`
              : `linear-gradient(100deg, ${p.fundo}f7 0%, ${p.fundo}e0 42%, ${p.fundo}66 72%, ${p.fundo}99 100%)`,
        }}
      />

      {/* barra de navegação do site fictício */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between px-[5%] py-[5%]">
        <span
          className="truncate text-[clamp(7px,1.5cqw,11px)] tracking-[0.24em] uppercase"
          style={{ color: p.tinta, fontFamily: fonte }}
        >
          {projeto.nome}
        </span>
        <span className="flex items-center gap-[6%]" aria-hidden>
          <span className="h-[3px] w-[26px] rounded-full opacity-40" style={{ background: p.tinta }} />
          <span className="h-[3px] w-[26px] rounded-full opacity-40" style={{ background: p.tinta }} />
          <span
            className="h-[16px] w-[42px] rounded-full"
            style={{ background: p.acento }}
          />
        </span>
      </div>

      {/* chamada */}
      <div
        className={`absolute inset-0 flex flex-col justify-center px-[6%] ${
          layout === "central" ? "items-center text-center" : "items-start"
        } ${layout === "galeria" ? "justify-start pt-[16%]" : ""}`}
      >
        <p
          className="text-[clamp(15px,6cqw,44px)] leading-[1.06]"
          style={{ color: p.tinta, fontFamily: fonte }}
        >
          {linha1}
          <br />
          {linha2}
        </p>

        {layout !== "galeria" && (
          <>
            <span
              className="mt-[4%] h-[3px] w-[38%] rounded-full opacity-25"
              style={{ background: p.tinta }}
              aria-hidden
            />
            <span
              className="mt-[5%] block h-[9%] min-h-[18px] w-[34%] rounded-full"
              style={{ background: p.acento }}
              aria-hidden
            />
          </>
        )}
      </div>

      {layout === "galeria" && (
        <div className="absolute inset-x-[6%] bottom-[7%] flex gap-[3%]" aria-hidden>
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="h-[70px] flex-1 rounded-md border"
              style={{
                borderColor: `${p.acento}55`,
                background: `linear-gradient(180deg, ${p.acento}26, transparent)`,
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
