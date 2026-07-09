import { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "ru" | "en";

export const translations = {
  ru: {
    nav: { name: "МИЛАН ФРОЛОВ" },
    hero: {
      name: "МИЛАН\nФРОЛОВ",
      tagline: "Языковой ментор, 20 лет",
      scroll: "прокрутите вниз",
    },
    about: {
      kicker: "О преподавателе",
      title: "Я не преподаю языки. Я строю мосты между культурами.",
      body: "Мне 20 лет. Я родился в русскоязычной среде и последние годы жил внутри трёх других языков: английского — на уровне C1, французского и испанского — на B2. Мои уроки — про свободу говорить, а не про заучивание.",
      stats: [
        { n: "3", l: "языка обучения" },
        { n: "C1", l: "английский" },
        { n: "B2", l: "французский и испанский" },
      ],
    },
    english: {
      title: "ENGLISH",
      level: "Уровень C1 — Advanced",
      body: "Мы не учим правила. Мы учим контекст. Прямолинейный английский для тех, кто готов звучать уверенно в любой точке мира.",
      focus: "Syllabus (01) — Focus: Authority",
      tags: ["Speaking", "IELTS / TOEFL", "Business", "Pronunciation"],
    },
    french: {
      display: "L'Élégance",
      title: "ФРАНЦУЗСКИЙ",
      level: "Уровень B2 — Upper-Intermediate",
      body: "Три карточки — три сцены. Наведи, чтобы услышать Париж.",
      cards: [
        { title: "La lecture", body: "Классические тексты, живая грамматика." },
        { title: "La culture", body: "Кино, шансон, философия — язык изнутри." },
        { title: "La conversation", body: "Разговорная беглость через ритуалы." },
      ],
    },
    spanish: {
      title: "ESPAÑOL",
      subtitle: "Pasión y vida.",
      level: "NIVEL B2",
      body: "Тепло Средиземноморья в каждом уроке. Испанский, каким его слышат в Мадриде и Барселоне.",
    },
    pricing: {
      kicker: "Инвестиция в будущее",
      individual: {
        title: "Индивидуально",
        price: "30 BYN",
        body: "60 минут полного погружения. Персонализированная программа под ваши цели и темп.",
      },
      group: {
        title: "В группе",
        price: "20 BYN",
        body: "До 4 человек. Отработка разговорных навыков в динамичной среде. Цена за человека.",
      },
      cta: "Записаться на урок",
    },
    footer: {
      rights: "© 2026 MILAN FROLOV — LANGUAGE MENTOR",
      links: ["Instagram", "Telegram", "WhatsApp"],
    },
  },
  en: {
    nav: { name: "MILAN FROLOV" },
    hero: {
      name: "MILAN\nFROLOV",
      tagline: "Language mentor, 20 years old",
      scroll: "scroll down",
    },
    about: {
      kicker: "About the tutor",
      title: "I don't teach languages. I build bridges between cultures.",
      body: "I'm 20. Native Russian, C1 in English, B2 in French and Spanish. My lessons are about the freedom to speak, not memorising rules.",
      stats: [
        { n: "3", l: "languages taught" },
        { n: "C1", l: "english" },
        { n: "B2", l: "french and spanish" },
      ],
    },
    english: {
      title: "ENGLISH",
      level: "Level C1 — Advanced",
      body: "We don't learn rules. We learn context. Direct English for those ready to sound confident anywhere in the world.",
      focus: "Syllabus (01) — Focus: Authority",
      tags: ["Speaking", "IELTS / TOEFL", "Business", "Pronunciation"],
    },
    french: {
      display: "L'Élégance",
      title: "FRENCH",
      level: "Level B2 — Upper-Intermediate",
      body: "Three cards, three scenes. Hover to hear Paris.",
      cards: [
        { title: "La lecture", body: "Classic texts, living grammar." },
        { title: "La culture", body: "Cinema, chanson, philosophy — the language from within." },
        { title: "La conversation", body: "Fluency through everyday rituals." },
      ],
    },
    spanish: {
      title: "ESPAÑOL",
      subtitle: "Pasión y vida.",
      level: "LEVEL B2",
      body: "The warmth of the Mediterranean in every lesson. Spanish as it's spoken in Madrid and Barcelona.",
    },
    pricing: {
      kicker: "Investment in your future",
      individual: {
        title: "One-on-one",
        price: "30 BYN",
        body: "60 minutes of full immersion. A personalised programme built for your goals and pace.",
      },
      group: {
        title: "In a group",
        price: "20 BYN",
        body: "Up to 4 people. Dynamic conversational practice. Price per person.",
      },
      cta: "Book a lesson",
    },
    footer: {
      rights: "© 2026 MILAN FROLOV — LANGUAGE MENTOR",
      links: ["Instagram", "Telegram", "WhatsApp"],
    },
  },
} as const;

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: (typeof translations)["ru"] };

const I18nCtx = createContext<Ctx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ru");
  return (
    <I18nCtx.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</I18nCtx.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nCtx);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}