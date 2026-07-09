import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";
import portrait from "@/assets/hero-portrait.jpg";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".about-line > span", {
        yPercent: 110,
        opacity: 0,
        duration: 1,
        ease: "expo.out",
        stagger: 0.08,
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".about-stat", {
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: ".about-stats", start: "top 80%" },
      });
      gsap.to(".about-img", {
        yPercent: -15,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const words = t.about.title.split(" ");

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 bg-paper text-ink">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 relative overflow-hidden rounded-sm">
          <img
            src={portrait}
            alt="Milan portrait"
            loading="lazy"
            width={800}
            height={1200}
            className="about-img w-full aspect-[3/4] object-cover grayscale"
          />
          <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest text-paper mix-blend-difference">
            Milan, 20 / Minsk
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-col justify-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-accent mb-8">
            {t.about.kicker}
          </div>
          <h2 className="font-serif italic text-4xl md:text-6xl leading-[1.05] mb-10 text-pretty">
            {words.map((w, i) => (
              <span key={i} className="about-line inline-block overflow-hidden mr-2">
                <span className="inline-block">{w}</span>
              </span>
            ))}
          </h2>
          <p className="text-lg md:text-xl text-ink/70 max-w-xl leading-relaxed">{t.about.body}</p>
          <div className="about-stats mt-16 grid grid-cols-3 gap-6 border-t border-ink/10 pt-8">
            {t.about.stats.map((s, i) => (
              <div key={i} className="about-stat">
                <div className="font-display text-5xl md:text-6xl text-accent leading-none">{s.n}</div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-widest text-ink/50">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}