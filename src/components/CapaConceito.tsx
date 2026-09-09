import type { Projeto } from "../projetos";

/**
 * Capa dos projetos conceituais: um mock de página desenhado em SVG, com a
 * paleta do próprio conceito. Não é captura de site que existe — é ilustração.
 *
 * O desenho muda de arranjo conforme `layout`, para as capas não parecerem a
 * mesma coisa repintada.
 */
export function CapaConceito({ projeto }: { projeto: Projeto }) {
  const p = projeto.paleta ?? {
    fundo: "#0b1220",
    campo: "#152238",
    tinta: "#f4f1e9",
    acento: "#1877ff",
  };
  const layout = projeto.layout ?? "editorial";
  /*
   * O id vira referência dentro do SVG (`url(#...)`). Nome com espaço ou
   * acento quebra a referência em silêncio e o bloco pinta de preto — foi o
   * que aconteceu na primeira versão.
   */
  const id = `${layout}-${projeto.nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "")}`;

  return (
    <svg
      viewBox="0 0 800 470"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 size-full"
      role="img"
      aria-label={`Composição visual do projeto ${projeto.nome}`}
    >
      <defs>
        <linearGradient id={`f-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={p.campo} />
          <stop offset="100%" stopColor={p.fundo} />
        </linearGradient>
        <linearGradient id={`v-${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={p.acento} stopOpacity="0.34" />
          <stop offset="100%" stopColor={p.fundo} stopOpacity="0.05" />
        </linearGradient>
      </defs>

      <rect width="800" height="470" fill={`url(#f-${id})`} />

      {/* barra de navegação */}
      <g opacity="0.85">
        <text x="44" y="46" fill={p.tinta} fontSize="15" letterSpacing="4" fontFamily="Michroma, sans-serif">
          {projeto.nome.toUpperCase().slice(0, 16)}
        </text>
        <rect x="560" y="34" width="52" height="6" rx="3" fill={p.tinta} opacity="0.4" />
        <rect x="626" y="34" width="52" height="6" rx="3" fill={p.tinta} opacity="0.4" />
        <rect x="692" y="26" width="66" height="24" rx="12" fill={p.acento} opacity="0.9" />
      </g>

      {layout === "editorial" && (
        <>
          <rect x="430" y="96" width="330" height="330" rx="10" fill={`url(#v-${id})`} />
          <rect x="430" y="96" width="330" height="330" rx="10" fill="none" stroke={p.acento} strokeOpacity="0.35" />
          <text x="44" y="200" fill={p.tinta} fontSize="52" fontFamily="Michroma, sans-serif">
            {projeto.chamada?.[0]}
          </text>
          <text x="44" y="262" fill={p.tinta} fontSize="52" fontFamily="Michroma, sans-serif">
            {projeto.chamada?.[1]}
          </text>
          <rect x="44" y="300" width="300" height="7" rx="3.5" fill={p.tinta} opacity="0.28" />
          <rect x="44" y="322" width="230" height="7" rx="3.5" fill={p.tinta} opacity="0.2" />
          <rect x="44" y="366" width="182" height="42" rx="21" fill={p.acento} />
        </>
      )}

      {layout === "central" && (
        <>
          <circle cx="400" cy="250" r="180" fill={`url(#v-${id})`} />
          <text x="400" y="228" textAnchor="middle" fill={p.tinta} fontSize="46" fontFamily="Michroma, sans-serif">
            {projeto.chamada?.[0]}
          </text>
          <text x="400" y="286" textAnchor="middle" fill={p.tinta} fontSize="46" fontFamily="Michroma, sans-serif">
            {projeto.chamada?.[1]}
          </text>
          <rect x="300" y="330" width="200" height="7" rx="3.5" fill={p.tinta} opacity="0.24" />
          <rect x="309" y="378" width="182" height="42" rx="21" fill={p.acento} />
        </>
      )}

      {layout === "galeria" && (
        <>
          <text x="44" y="150" fill={p.tinta} fontSize="46" fontFamily="Michroma, sans-serif">
            {projeto.chamada?.[0]}
          </text>
          <text x="44" y="204" fill={p.tinta} fontSize="46" fontFamily="Michroma, sans-serif">
            {projeto.chamada?.[1]}
          </text>
          {[0, 1, 2].map((i) => (
            <rect
              key={i}
              x={44 + i * 245}
              y={252}
              width="222"
              height="196"
              rx="9"
              fill={`url(#v-${id})`}
              stroke={p.acento}
              strokeOpacity="0.3"
            />
          ))}
        </>
      )}
    </svg>
  );
}
