import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer
      id="contact"
      className="py-10 px-6 md:px-12 border-t border-ink/10 flex flex-col md:flex-row justify-between items-center gap-6 bg-paper text-ink"
    >
      <div className="font-mono text-[10px] uppercase tracking-widest text-ink/50">
        {t.footer.rights}
      </div>
      <div className="flex gap-6 md:gap-8 font-sans font-bold text-xs uppercase tracking-tight">
        {t.footer.links.map((l) => (
          <a key={l} href="#" className="hover:text-accent transition-colors">
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}