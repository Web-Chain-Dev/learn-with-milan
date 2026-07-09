import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";
import wall from "@/assets/spanish-wall.jpg";
import market from "@/assets/spanish-market.jpg";
import flamenco from "@/assets/spanish-flamenco.jpg";

gsap.registerPlugin(ScrollTrigger);

export function SpanishSection() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".sp-tile", {
        opacity: 0,
        scale: 0.9,
        y: 40,
        stagger: 0.12,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.utils.toArray<HTMLElement>(".sp-parallax").forEach((el) => {
        gsap.to(el, {
          yPercent: -15,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-40 px-6 md:px-12 text-white overflow-hidden"
      style={{ backgroundColor: "oklch(0.605 0.185 35)" }}
    >
      <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/70">
        03 / 03 — Español
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-12 gap-3 md:gap-4 auto-rows-[140px] md:auto-rows-[200px]">
        <div className="sp-tile col-span-12 md:col-span-8 row-span-2 overflow-hidden rounded-xl relative group">
          <img src={wall} alt="Seville wall" loading="lazy" width={1200} height={800} className="sp-parallax w-full h-[120%] object-cover" />
        </div>
        <div className="sp-tile col-span-6 md:col-span-4 row-span-3 flex flex-col justify-end p-6 md:p-8 bg-black/20 rounded-xl backdrop-blur-sm">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-3 text-white/70">
            {t.spanish.level}
          </div>
          <h2 className="font-display text-5xl md:text-7xl leading-none mb-4">{t.spanish.title}</h2>
          <p className="font-serif italic text-lg mb-3">{t.spanish.subtitle}</p>
          <p className="font-sans text-sm leading-relaxed opacity-85">{t.spanish.body}</p>
        </div>
        <div className="sp-tile col-span-6 md:col-span-4 row-span-2 overflow-hidden rounded-xl">
          <img src={market} alt="Spanish market" loading="lazy" width={600} height={600} className="sp-parallax w-full h-[120%] object-cover" />
        </div>
        <div className="sp-tile col-span-6 md:col-span-4 row-span-2 overflow-hidden rounded-xl">
          <img src={flamenco} alt="Flamenco" loading="lazy" width={600} height={800} className="sp-parallax w-full h-[120%] object-cover" />
        </div>
        <div className="sp-tile col-span-12 md:col-span-4 row-span-1 bg-white text-ink flex items-center justify-center rounded-xl p-4">
          <span className="font-display text-3xl tracking-tighter" style={{ color: "oklch(0.605 0.185 35)" }}>
            ¡HOLA!
          </span>
        </div>
      </div>
    </section>
  );
}