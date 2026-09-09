import { useRef, type RefObject } from "react";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "../lib/gsap";

/**
 * Parallax da primeira dobra: as camadas andam em velocidades diferentes
 * conforme a seção sai da tela.
 *
 * O android deriva para cima e a copy desce, abrindo distância entre os dois
 * — se andassem juntos não haveria profundidade nenhuma.
 */
export function useHeroParallax(escopo: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const raiz = escopo.current;
      if (!raiz) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const camadas: { sel: string; y: number }[] = [
          { sel: "[data-camada='foto']", y: -12 },
          { sel: "[data-camada='veu']", y: -6 },
          { sel: "[data-camada='texto']", y: 34 },
        ];

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: raiz,
            start: "top top",
            end: "bottom top",
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        });

        camadas.forEach(({ sel, y }) => {
          const alvos = raiz.querySelectorAll(sel);
          if (!alvos.length) return;
          // duração explícita: sem ela o tween para na metade do percurso
          tl.to(alvos, { yPercent: y, duration: 1, ease: "none" }, 0);
        });

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      return () => mm.revert();
    },
    { scope: escopo }
  );

  return useRef(null);
}
