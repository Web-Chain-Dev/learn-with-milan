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
      className="relative text-ink pt-28 md:pt-32 pb-16 md:pb-24 px-6 md:px-12 overflow-hidden"
      style={{ backgroundColor: "oklch(0.905 0.012 75)" }}
    >
      {/* Layered paper texture */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-multiply"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, rgba(80,60,40,0.18), transparent 55%), radial-gradient(circle at 80% 70%, rgba(60,50,40,0.14), transparent 60%), radial-gradient(circle at 50% 100%, rgba(120,90,60,0.10), transparent 60%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.15  0 0 0 0 0.10  0 0 0 0 0.05  0 0 0 0.5 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(30,20,10,0.18) 100%)",
        }}
      />

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-12 items-center">
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
          <div className="mt-8 flex flex-wrap gap-2 font-mono text-[11px] uppercase tracking-widest hero-tag">
            <span className="px-3 py-1.5 border border-ink/25 rounded-full">English C1</span>
            <span className="px-3 py-1.5 border border-ink/25 rounded-full">Français B2</span>
            <span className="px-3 py-1.5 border border-ink/25 rounded-full">Español B2</span>
          </div>
        </div>
        <div className="md:col-span-5 order-1 md:order-2 relative overflow-hidden rounded-sm bg-ink/5 shadow-2xl">
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
      <div className="relative mt-16 md:mt-24 flex justify-between items-end font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 hero-tag max-w-7xl mx-auto">
        <span>Minsk · 2026</span>
        <span>↓ {t.hero.scroll}</span>
      </div>
    </section>
  );
}