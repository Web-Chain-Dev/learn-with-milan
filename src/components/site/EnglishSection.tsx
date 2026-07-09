import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";
import img from "@/assets/english-london.jpg";

gsap.registerPlugin(ScrollTrigger);

export function EnglishSection() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".eng-title", {
        xPercent: -10,
        opacity: 0,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 60%" },
      });
      gsap.from(".eng-img", {
        clipPath: "inset(100% 0 0 0)",
        duration: 1.6,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 60%" },
      });
      gsap.to(".eng-img img", {
        yPercent: 15,
        ease: "none",
        scrollTrigger: { trigger: ref.current, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.from(".eng-tag", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ".eng-tags", start: "top 85%" },
      });
      gsap.from(".eng-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".eng-line", start: "top 90%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="min-h-screen bg-ink text-paper py-24 md:py-40 px-6 md:px-12 flex flex-col justify-center relative overflow-hidden">
      <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-[0.4em] text-accent">
        01 / 03 — English
      </div>
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
        <div className="eng-img order-2 md:order-1 relative overflow-hidden rounded-sm">
          <img
            src={img}
            alt="London architecture"
            loading="lazy"
            width={800}
            height={1200}
            className="w-full aspect-[2/3] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-ink/40 to-transparent pointer-events-none" />
        </div>
        <div className="order-1 md:order-2">
          <h2 className="eng-title font-display text-7xl md:text-9xl mb-8 leading-none tracking-tighter text-accent">
            {t.english.title}
          </h2>
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-paper/50 mb-6">
            {t.english.level}
          </div>
          <p className="font-sans text-lg md:text-2xl leading-relaxed text-pretty">
            {t.english.body}
          </p>
          <div className="eng-tags mt-10 flex flex-wrap gap-2">
            {t.english.tags.map((tag, i) => (
              <span
                key={i}
                className="eng-tag px-3 py-1.5 border border-paper/20 rounded-full font-mono text-[10px] uppercase tracking-widest text-paper/70"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="eng-line mt-12 h-[1px] w-full bg-accent/40" />
          <div className="mt-6 font-mono text-xs uppercase tracking-[0.3em] text-accent">
            {t.english.focus}
          </div>
        </div>
      </div>
    </section>
  );
}