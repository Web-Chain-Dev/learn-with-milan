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
    <section ref={rootRef} className="relative h-svh min-h-[600px] flex flex-col justify-end p-6 md:p-12 overflow-hidden bg-ink">
      <img
        ref={imgRef}
        src={heroImg}
        alt="Milan Frolov portrait"
        width={1920}
        height={1080}
        className="absolute inset-0 w-full h-full object-cover opacity-70"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
      <div className="relative z-10 max-w-6xl">
        <h1 className="font-display text-[18vw] md:text-[15vw] leading-[0.85] tracking-tighter text-paper">
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
        <div className="mt-8 flex flex-wrap gap-3 text-paper/85 font-mono text-xs uppercase tracking-widest">
          <span className="hero-tag px-4 py-1.5 border border-paper/30 rounded-full backdrop-blur-md">
            English C1
          </span>
          <span className="hero-tag px-4 py-1.5 border border-paper/30 rounded-full backdrop-blur-md">
            Français B2
          </span>
          <span className="hero-tag px-4 py-1.5 border border-paper/30 rounded-full backdrop-blur-md">
            Español B2
          </span>
        </div>
      </div>
      <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 z-10 font-mono text-[10px] uppercase tracking-[0.3em] text-paper/60 hero-tag">
        ↓ {t.hero.scroll}
      </div>
    </section>
  );
}