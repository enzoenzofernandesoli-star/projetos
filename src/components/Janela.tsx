import type { Projeto } from "../projetos";

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
            {projeto.url ? "🔒" : "—"}
          </span>
          <span className="truncate text-[11px] text-ivory/65">
            {projeto.url ? dominio(projeto.url) : projeto.restricao}
          </span>
        </div>
      </div>
      <div className="relative min-h-0 flex-1 bg-ink">{children}</div>
    </div>
  );
}

/**
 * Miolo dos itens sem captura de tela: os exemplos de serviço, que não têm
 * site para fotografar. Desenho abstrato de interface — não é foto de
 * trabalho entregue, e não deve virar uma.
 */
export function PainelExemplo({ projeto }: { projeto: Projeto }) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-[linear-gradient(140deg,rgba(11,34,58,.55),rgba(2,13,27,.9))]">
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_78%_18%,rgba(24,119,255,.2),transparent_62%)]"
      />
      <div className="relative flex h-full flex-col gap-3 p-5">
        <div className="h-1.5 w-16 rounded-full bg-signal-bright/70" />
        <p className="font-[family-name:var(--font-display)] text-base leading-snug text-ivory/90">
          {projeto.nome}
        </p>
        <div className="mt-auto space-y-2" aria-hidden>
          <div className="h-2 w-full rounded-full bg-ivory/12" />
          <div className="h-2 w-4/5 rounded-full bg-ivory/10" />
          <div className="h-2 w-2/3 rounded-full bg-ivory/8" />
        </div>
      </div>
    </div>
  );
}

/** Capa quando existe; painel quando o item é um exemplo de serviço. */
export function MioloJanela({
  projeto,
  className = "",
}: {
  projeto: Projeto;
  className?: string;
}) {
  if (!projeto.capa) return <PainelExemplo projeto={projeto} />;
  return (
    <img
      src={projeto.capa}
      alt={`Página inicial do projeto ${projeto.nome}`}
      loading="lazy"
      className={`absolute inset-0 size-full object-cover object-top ${className}`}
    />
  );
}
