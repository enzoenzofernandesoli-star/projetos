import type { Projeto } from "../projetos";
import { CapaConceito } from "./CapaConceito";

/**
 * Nome do conceito virado domínio. O acento precisa ser decomposto antes de
 * limpar: sem isso "Horário" saía "horrio" e "Núcleo" saía "ncleo", porque a
 * letra acentuada caía junto com a pontuação.
 */
export function dominioDe(nome: string) {
  return nome
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");
}

/** Só o domínio, que é o que a barra de endereço de verdade mostra em destaque. */
export function dominio(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Moldura de janela de navegador. É só a casca: o miolo vem por `children`,
 * que no grid é a capa e no modal é o site ao vivo.
 */
export function Janela({
  projeto,
  children,
  alturaBarra = "h-9",
}: {
  projeto: Projeto;
  children: React.ReactNode;
  alturaBarra?: string;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-steel/25 bg-navy">
      <div
        className={`${alturaBarra} flex flex-none items-center gap-3 border-b border-steel/20 bg-electric/70 px-3`}
      >
        <div className="flex flex-none gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-steel/40" />
          <span className="size-2 rounded-full bg-steel/40" />
          <span className="size-2 rounded-full bg-steel/40" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md bg-ink/60 px-2.5 py-1">
          <span className="flex-none text-[10px] text-signal-bright" aria-hidden>
            {projeto.url || projeto.exclusivo ? "🔒" : "—"}
          </span>
          <span className="truncate text-[11px] text-ivory/65">
            {projeto.url
              ? dominio(projeto.url)
              : projeto.exclusivo
                ? `${dominioDe(projeto.nome)}.com.br`
                : projeto.restricao}
          </span>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 bg-ink [container-type:inline-size]">{children}</div>
    </div>
  );
}

/** Capa quando existe; ilustração do conceito quando não existe. */
export function MioloJanela({
  projeto,
  className = "",
}: {
  projeto: Projeto;
  className?: string;
}) {
  if (!projeto.capa) return <CapaConceito projeto={projeto} />;
  return (
    <img
      src={projeto.capa}
      alt={`Página inicial do projeto ${projeto.nome}`}
      loading="lazy"
      className={`absolute inset-0 size-full object-cover object-top ${className}`}
    />
  );
}
