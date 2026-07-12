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
      className="relative bg-ink text-paper pt-28 md:pt-32 pb-10 md:pb-14 px-6 md:px-12 overflow-hidden"
    >
      {/* Ambient warm glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-40 w-[70vw] h-[70vw] rounded-full opacity-40 blur-[120px]"
        style={{ background: "radial-gradient(circle, var(--accent-warm), transparent 60%)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0 2px, rgba(255,255,255,.5) 2px 3px)",
        }}
      />

      {/* Top meta row */}
      <div className="relative max-w-7xl mx-auto flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.35em] text-paper/50 hero-tag mb-10 md:mb-16">
        <span>Portfolio · MMXXVI</span>
        <span className="hidden md:inline">Minsk — Belarus</span>
        <span>N°01 / Hero</span>
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10 items-end">
        <div className="md:col-span-7 order-2 md:order-1 relative">
          <span className="hero-tag block font-serif italic text-accent-warm text-2xl md:text-3xl mb-3">
            — {t.hero.tagline}
          </span>
          <h1 className="font-display text-[24vw] md:text-[13vw] leading-[0.82] tracking-tighter text-paper">
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

          <div className="hero-tag mt-8 md:mt-10 grid grid-cols-3 gap-3 md:gap-6 max-w-xl border-t border-paper/15 pt-6">
            {[
              { l: "English", v: "C1" },
              { l: "Français", v: "B2" },
              { l: "Español", v: "B2" },
            ].map((x) => (
              <div key={x.l}>
                <div className="font-display text-4xl md:text-5xl text-accent-warm leading-none">
                  {x.v}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60">
                  {x.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="md:col-span-5 order-1 md:order-2 relative">
          <div className="absolute -inset-2 md:-inset-3 bg-accent-warm/30 blur-2xl rounded-sm" aria-hidden />
          <div className="relative overflow-hidden rounded-sm border border-paper/10">
            <img
              ref={imgRef}
              src={heroImg}
              alt="Yaroslav portrait"
              width={800}
              height={1000}
              className="w-full aspect-[4/5] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end font-mono text-[9px] uppercase tracking-[0.3em] text-paper/80">
              <span>Yaroslav</span>
              <span>· 2026</span>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mt-14 md:mt-20 flex justify-between items-end font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50 hero-tag max-w-7xl mx-auto border-t border-paper/10 pt-6">
        <span>RU · EN · FR · ES</span>
        <span className="animate-pulse">↓ {t.hero.scroll}</span>
      </div>
    </section>
  );
}