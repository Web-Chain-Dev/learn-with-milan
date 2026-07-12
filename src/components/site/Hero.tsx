import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useI18n } from "@/lib/i18n";
import heroImg from "@/assets/hero-portrait.jpg";

export function Hero() {
  const { t } = useI18n();
  const rootRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Split-letter reveal
      const chars = rootRef.current?.querySelectorAll<HTMLElement>(".hero-char");
      if (chars) {
        gsap.from(chars, {
          yPercent: 110,
          opacity: 0,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.04,
          delay: 0.2,
        });
      }
      gsap.from(".hero-tag", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.1,
        delay: 1,
      });
      gsap.from(imgRef.current, {
        scale: 1.2,
        duration: 2.4,
        ease: "expo.out",
      });

      // Parallax on scroll
      const onScroll = () => {
        const y = window.scrollY;
        if (imgRef.current) {
          gsap.to(imgRef.current, { y: y * 0.3, duration: 0.6, ease: "power2.out", overwrite: true });
        }
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      return () => window.removeEventListener("scroll", onScroll);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const nameLines = t.hero.name.split("\n");

  return (
    <section
      ref={rootRef}
      className="relative bg-paper text-ink pt-28 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
        <div className="md:col-span-7 order-2 md:order-1">
          <h1 className="font-display text-[22vw] md:text-[11vw] leading-[0.85] tracking-tighter">
            {nameLines.map((line, li) => (
              <span key={li} className="block overflow-hidden">
                <span className="inline-block">
                  {Array.from(line).map((ch, i) => (
                    <span key={i} className="hero-char inline-block">
                      {ch === " " ? "\u00A0" : ch}
                    </span>
                  ))}
                </span>
              </span>
            ))}
          </h1>
          <p className="hero-tag mt-6 font-mono text-[11px] uppercase tracking-[0.35em] text-ink/60">
            {t.hero.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-widest">
            <span className="hero-tag px-3 py-1.5 border border-ink/20 rounded-full">English C1</span>
            <span className="hero-tag px-3 py-1.5 border border-ink/20 rounded-full">Français B2</span>
            <span className="hero-tag px-3 py-1.5 border border-ink/20 rounded-full">Español B2</span>
          </div>
        </div>
        <div className="md:col-span-5 order-1 md:order-2 relative overflow-hidden rounded-sm bg-ink/5">
          <img
            ref={imgRef}
            src={heroImg}
            alt="Yaroslav portrait"
            width={800}
            height={1000}
            className="w-full aspect-[4/5] object-cover"
          />
        </div>
      </div>
      <div className="mt-16 md:mt-24 flex justify-between items-end font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hero-tag max-w-7xl mx-auto">
        <span>Minsk · 2026</span>
        <span>↓ {t.hero.scroll}</span>
      </div>
    </section>
  );
}