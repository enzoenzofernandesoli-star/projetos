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

/** Só o domínio, que é o que a barra de endereço mostra em destaque. */
export function dominio(url: string) {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Endereço partido em duas peças, como o navegador faz: o nome do site em
 * destaque e o sufixo apagado. É o que deixa
 * `barbearia-buenos-aires.vercel.app` apresentável sem inventar um domínio
 * que o cliente não tem.
 */
function partirEndereco(projeto: Projeto): { nome: string; sufixo: string } | null {
  const host = projeto.url
    ? dominio(projeto.url)
    : projeto.exclusivo
      ? `${dominioDe(projeto.nome)}.com.br`
      : projeto.dominio;
  if (!host) return null;
  const ponto = host.indexOf(".");
  return ponto < 0
    ? { nome: host, sufixo: "" }
    : { nome: host.slice(0, ponto), sufixo: host.slice(ponto) };
}

function Cadeado({ cor }: { cor: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke={cor}
      strokeWidth="2"
      aria-hidden
      className="size-full"
    >
      <rect x="4.5" y="10.5" width="15" height="10" rx="2.4" />
      <path d="M8 10.5V7.6a4 4 0 0 1 8 0v2.9" />
    </svg>
  );
}

/**
 * Moldura de janela de navegador. É só a casca: o miolo vem por `children`,
 * que no grid é a capa e no visualizador é o site ao vivo.
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
  const endereco = partirEndereco(projeto);
  const restrito = !projeto.url && !projeto.exclusivo;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-steel/25 bg-navy">
      <div
        className={`${alturaBarra} flex flex-none items-center gap-2.5 border-b border-steel/20 bg-electric/70 px-3`}
      >
        <div className="flex flex-none gap-1.5" aria-hidden>
          <span className="size-2 rounded-full bg-[#ff5f57]/65" />
          <span className="size-2 rounded-full bg-[#febc2e]/65" />
          <span className="size-2 rounded-full bg-[#28c840]/65" />
        </div>

        {/* Controles do navegador. Decorativos: dão a leitura de janela real. */}
        <div
          className="hidden flex-none items-center gap-2 text-ivory/25 sm:flex"
          aria-hidden
        >
          <span className="text-xs leading-none">‹</span>
          <span className="text-xs leading-none">›</span>
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            className="size-2.5"
          >
            <path d="M20 11a8 8 0 1 0-2.3 5.7" />
            <path d="M20 4.5V11h-6.4" />
          </svg>
        </div>

        <div className="flex min-w-0 flex-1 items-center gap-2 rounded-full bg-ink/60 px-2.5 py-[3px]">
          <span className="size-2.5 flex-none" aria-hidden>
            <Cadeado cor={restrito ? "rgba(244,241,233,.38)" : "#57a9ff"} />
          </span>
          <span className="truncate text-[11px] leading-4">
            {endereco ? (
              <>
                <span className="text-ivory/90">{endereco.nome}</span>
                <span className="text-ivory/40">{endereco.sufixo}</span>
              </>
            ) : (
              <span className="text-ivory/45">{projeto.restricao}</span>
            )}
          </span>
          {restrito && endereco && (
            <span className="ml-auto flex-none rounded-full bg-ivory/10 px-1.5 text-[9px] whitespace-nowrap text-ivory/55">
              restrito
            </span>
          )}
        </div>
      </div>
      <div className="relative min-h-0 flex-1 bg-ink [container-type:inline-size]">
        {children}
      </div>
    </div>
  );
}

/** Capa quando existe; a página do conceito quando não existe. */
export function MioloJanela({
  projeto,
  className = "",
}: {
  projeto: Projeto;
  className?: string;
}) {
  if (!projeto.capa && projeto.exclusivo) return <CapaConceito projeto={projeto} />;
  if (!projeto.capa) return (
    <div className="absolute inset-0 flex flex-col justify-end bg-[radial-gradient(circle_at_75%_20%,rgba(24,119,255,.35),transparent_55%),linear-gradient(135deg,#102844,#020d1b)] p-5 text-ivory">
      <span className="rotulo text-signal-bright">Projeto digital</span>
      <strong className="mt-3 font-[family-name:var(--font-display)] text-lg">{projeto.nome}</strong>
    </div>
  );
  return (
    <img
      src={projeto.capa}
      alt={`Página inicial do projeto ${projeto.nome}`}
      loading="lazy"
      className={`absolute inset-0 size-full object-cover object-top ${className}`}
    />
  );
}
