import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n";
import desk from "@/assets/pricing-desk.jpg";

gsap.registerPlugin(ScrollTrigger);

export function Pricing() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const [ctaHover, setCtaHover] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".price-row", {
        y: 40,
        opacity: 0,
        stagger: 0.2,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".price-img", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 70%" },
      });
      gsap.from(".price-line", {
        scaleX: 0,
        transformOrigin: "left",
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ref.current, start: "top 80%" },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="py-24 md:py-40 px-6 md:px-12 bg-paper text-ink">
      <div className="max-w-5xl mx-auto">
        <div className="price-line h-px w-full bg-ink/15" />
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <div className="font-sans font-bold text-[10px] uppercase tracking-[0.4em] mb-14 text-ink/50 italic">
              {t.pricing.kicker}
            </div>
            <div className="space-y-14">
              {[t.pricing.individual, t.pricing.group].map((plan, i) => (
                <div key={i} className="price-row group">
                  <div className="flex justify-between items-end mb-3 gap-4">
                    <span className="font-display text-3xl md:text-4xl uppercase tracking-tight">
                      {plan.title}
                    </span>
                    <span className="font-mono text-lg md:text-xl text-accent whitespace-nowrap">
                      {plan.price}
                    </span>
                  </div>
                  <div className="h-px w-full bg-ink/10 mb-3 origin-left group-hover:bg-accent transition-colors duration-500" />
                  <p className="text-ink/60 text-sm font-sans leading-relaxed max-w-sm">
                    {plan.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="price-img overflow-hidden rounded-sm">
              <img
                src={desk}
                alt="Desk"
                loading="lazy"
                width={900}
                height={900}
                className="w-full aspect-square object-cover"
              />
            </div>
            <a
              href="#contact"
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              className="mt-4 relative block bg-ink text-paper text-center py-6 font-display text-xl md:text-2xl uppercase tracking-widest overflow-hidden rounded-sm"
            >
              <span
                className="absolute inset-0 bg-accent transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)]"
                style={{ transform: ctaHover ? "translateY(0%)" : "translateY(100%)" }}
              />
              <span className="relative">{t.pricing.cta}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}