import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";
import cafe from "@/assets/french-cafe.jpg";
import sculpture from "@/assets/french-sculpture.jpg";
import manuscript from "@/assets/french-manuscript.jpg";

gsap.registerPlugin(ScrollTrigger);

const images = [cafe, sculpture, manuscript];

export function FrenchSection() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const cardsRef = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".fr-display", {
        y: 60,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".fr-title", {
        y: 30,
        opacity: 0,
        duration: 1,
        delay: 0.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      // Fan reveal
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const rot = [-15, 0, 15][i];
        const x = [-120, 0, 120][i];
        gsap.fromTo(
          card,
          { rotate: 0, x: 0, y: 200, opacity: 0 },
          {
            rotate: rot,
            x,
            y: 0,
            opacity: 1,
            duration: 1.4,
            delay: 0.1 * i,
            ease: "expo.out",
            scrollTrigger: { trigger: ".fr-fan", start: "top 75%" },
          }
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const rot = [-15, 0, 15][i];
      const x = [-120, 0, 120][i];
      if (hovered === i) {
        gsap.to(card, { rotate: 0, x, y: -40, scale: 1.08, zIndex: 30, duration: 0.6, ease: "expo.out" });
      } else if (hovered !== null) {
        gsap.to(card, { rotate: rot, x: x * 1.4, y: 0, scale: 0.92, zIndex: 1, duration: 0.6, ease: "expo.out" });
      } else {
        gsap.to(card, { rotate: rot, x, y: 0, scale: 1, zIndex: i, duration: 0.6, ease: "expo.out" });
      }
    });
  }, [hovered]);

  return (
    <section ref={ref} className="min-h-screen bg-paper text-ink py-24 md:py-40 px-6 overflow-hidden relative">
      <div className="absolute top-6 right-6 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
        02 / 03 — Français
      </div>
      <div className="text-center mb-20 md:mb-28">
        <h2 className="fr-display font-serif italic text-6xl md:text-[10rem] text-ink/15 mb-2 leading-none">
          {t.french.display}
        </h2>
        <h3 className="fr-title font-sans font-bold text-2xl md:text-4xl uppercase tracking-[0.3em]">
          {t.french.title}
        </h3>
        <div className="mt-4 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50">
          {t.french.level}
        </div>
      </div>

      <div className="fr-fan relative flex justify-center items-center h-[520px] md:h-[600px]">
        <div className="relative w-56 h-72 md:w-64 md:h-80">
          {t.french.cards.map((card, i) => (
            <div
              key={i}
              ref={(el) => {
                cardsRef.current[i] = el;
              }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              className="absolute inset-0 bg-white p-3 shadow-2xl rounded-sm border border-black/5 cursor-pointer"
              style={{ zIndex: i }}
            >
              <img
                src={images[i]}
                alt={card.title}
                loading="lazy"
                width={600}
                height={750}
                className="w-full h-[75%] object-cover"
              />
              <div className="pt-3">
                <div className="font-serif italic text-sm text-ink">{card.title}</div>
                <div className="font-mono text-[9px] uppercase tracking-widest text-ink/50 mt-1 leading-relaxed">
                  {card.body}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-16 max-w-md mx-auto">
        <p className="text-ink/60 text-sm">{t.french.body}</p>
      </div>
    </section>
  );
}