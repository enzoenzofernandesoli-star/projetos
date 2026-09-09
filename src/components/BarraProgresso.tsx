import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/**
 * Termômetro de leitura no topo.
 *
 * Escreve `scaleX` por `gsap.quickSetter`: animar `width` obrigaria o
 * navegador a refazer layout a cada quadro de rolagem. A leitura do scroll é
 * limitada a uma por quadro.
 */
export function BarraProgresso() {
  const barra = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barra.current;
    if (!el) return;

    const escrever = gsap.quickSetter(el, "scaleX") as (valor: number) => void;
    let pendente = false;

    const medir = () => {
      pendente = false;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      escrever(total > 0 ? Math.min(Math.max(window.scrollY / total, 0), 1) : 0);
    };
    const agendar = () => {
      if (pendente) return;
      pendente = true;
      requestAnimationFrame(medir);
    };

    medir();
    window.addEventListener("scroll", agendar, { passive: true });
    window.addEventListener("resize", agendar, { passive: true });
    return () => {
      window.removeEventListener("scroll", agendar);
      window.removeEventListener("resize", agendar);
    };
  }, []);

  return (
    <div className="progresso-topo" aria-hidden>
      <div ref={barra} className="progresso-fio" />
    </div>
  );
}
