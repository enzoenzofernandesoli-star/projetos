/**
 * Monograma VVC — dois "V" que se cruzam logo abaixo do topo e um "C"
 * quadrado aberto à direita, em linha fina.
 *
 * Mesma geometria do componente do site principal: o braço direito do
 * segundo V aterrissa exatamente no canto superior do C, e o traço tem
 * pontas retas e cantos vivos.
 */
const TRACOS = [
  "M 6 16 L 156 214 L 319 16",
  "M 284 16 L 441 214 L 588 16",
  "M 588 16 L 796 16",
  "M 588 16 L 588 214 L 796 214",
];

export function LogoVVC({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 230"
      role="img"
      aria-label="VVC"
      fill="none"
      stroke="currentColor"
      strokeWidth="10"
      strokeLinecap="butt"
      strokeLinejoin="miter"
    >
      {TRACOS.map((d) => (
        <path key={d} d={d} />
      ))}
    </svg>
  );
}
