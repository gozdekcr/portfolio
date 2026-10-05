// Pure CSS marquee: starts reliably on first load (no JS animation timing issues).
// Respects prefers-reduced-motion via the media query below.
export default function Marquee({ items, speed = 28 }) {
  const loop = [...items, ...items]

  return (
    <div className="relative w-full overflow-hidden py-6 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <style>{`
        @keyframes marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee-scroll var(--marquee-speed) linear infinite;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none; }
        }
      `}</style>

      <div
        className="marquee-track flex w-max shrink-0 items-center"
        style={{ '--marquee-speed': `${speed}s` }}
      >
        {loop.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= items.length ? true : undefined}
            className="flex items-center text-lg font-medium tracking-tight text-muted sm:text-xl"
          >
            {item}
            <span className="mx-5 text-lilac/50" aria-hidden>
              &middot;
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
