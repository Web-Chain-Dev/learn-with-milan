import { useI18n } from "@/lib/i18n";

export function Nav() {
  const { lang, setLang, t } = useI18n();
  return (
    <nav className="fixed top-0 left-0 w-full z-50 mix-blend-difference px-6 md:px-10 py-6 flex justify-between items-center text-white pointer-events-none">
      <div className="font-sans font-bold tracking-tighter text-sm md:text-base pointer-events-auto">
        {t.nav.name}
      </div>
      <div className="flex gap-4 font-mono text-[10px] uppercase tracking-widest pointer-events-auto">
        <button
          onClick={() => setLang("ru")}
          className={lang === "ru" ? "opacity-100" : "opacity-40 hover:opacity-100 transition-opacity"}
        >
          RU
        </button>
        <span className="opacity-40">/</span>
        <button
          onClick={() => setLang("en")}
          className={lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-100 transition-opacity"}
        >
          EN
        </button>
      </div>
    </nav>
  );
}