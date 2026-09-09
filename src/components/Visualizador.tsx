import { useEffect, useRef, useState } from "react";
import type { Projeto } from "../projetos";
import { Janela, dominio } from "./Janela";

/**
 * Abre o projeto ao vivo dentro da página, numa janela grande.
 *
 * O iframe só existe enquanto o visualizador está aberto — deixar dez sites
 * carregados no grid ao mesmo tempo custaria memória e rede sem ninguém estar
 * olhando. Enquanto o site carrega, a capa fica por baixo para a janela nunca
 * aparecer vazia.
 */
export function Visualizador({
  projeto,
  aoFechar,
}: {
  projeto: Projeto;
  aoFechar: () => void;
}) {
  const [carregado, setCarregado] = useState(false);
  const fechar = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const aoTeclar = (evento: KeyboardEvent) => {
      if (evento.key === "Escape") aoFechar();
    };
    document.addEventListener("keydown", aoTeclar);
    const anterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    fechar.current?.focus();
    return () => {
      document.removeEventListener("keydown", aoTeclar);
      document.body.style.overflow = anterior;
    };
  }, [aoFechar]);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-ink/92 p-3 backdrop-blur-sm sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Prévia de ${projeto.nome}`}
      onClick={(evento) => {
        if (evento.target === evento.currentTarget) aoFechar();
      }}
    >
      <div className="mx-auto flex w-full max-w-[1400px] flex-none items-center justify-between gap-4 pb-3">
        <div className="min-w-0">
          <h2 className="truncate font-[family-name:var(--font-display)] text-lg text-ivory sm:text-xl">
            {projeto.nome}
          </h2>
          <p className="truncate text-xs text-ivory/60">{projeto.tipo}</p>
        </div>
        <div className="flex flex-none items-center gap-2">
          {projeto.url && (
            <a
              className="hidden min-h-11 items-center rounded-full border border-ivory/45 px-4 text-xs transition-colors duration-200 hover:border-signal-bright hover:text-signal-bright sm:inline-flex"
              href={projeto.url}
              target="_blank"
              rel="noreferrer"
            >
              Abrir em nova aba ↗
            </a>
          )}
          <button
            ref={fechar}
            type="button"
            onClick={aoFechar}
            aria-label="Fechar prévia"
            className="grid size-11 place-items-center rounded-full border border-ivory/45 text-lg transition-colors duration-200 hover:border-signal-bright hover:text-signal-bright"
          >
            ✕
          </button>
        </div>
      </div>

      <div className="mx-auto min-h-0 w-full max-w-[1400px] flex-1">
        <Janela projeto={projeto} alturaBarra="h-11">
          <img
            src={projeto.capa}
            alt=""
            aria-hidden
            className={`absolute inset-0 size-full object-cover object-top transition-opacity duration-500 ${
              carregado ? "opacity-0" : "opacity-60"
            }`}
          />
          {projeto.url ? (
            <iframe
              src={projeto.url}
              title={`Site do projeto ${projeto.nome}`}
              onLoad={() => setCarregado(true)}
              className="absolute inset-0 size-full border-0"
              loading="eager"
              referrerPolicy="no-referrer"
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : (
            <div className="absolute inset-0 grid place-items-center p-6 text-center">
              <p className="max-w-sm text-sm text-ivory/75">{projeto.restricao}</p>
            </div>
          )}
        </Janela>
      </div>

      {projeto.url && (
        <p className="mx-auto w-full max-w-[1400px] flex-none pt-2 text-center text-[11px] text-ivory/45 sm:text-left">
          {dominio(projeto.url)} — site real, navegável aqui dentro.
        </p>
      )}
    </div>
  );
}
