import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const HERO_SLIDES = [
  {
    url: "https://cdn.poehali.dev/projects/c51b58f8-9c32-4de0-b203-6925cd3e2fc7/bucket/1eed7e06-2958-4dbc-806c-b10281e82561.jpg",
    caption: "Туристы из Акмолинской области",
  },
  {
    url: "https://cdn.poehali.dev/projects/c51b58f8-9c32-4de0-b203-6925cd3e2fc7/bucket/322b8ab6-c2fb-456d-a307-8de5f962148e.jpg",
    caption: "Открытие туристического сезона «Регион 55»",
  },
  {
    url: "https://cdn.poehali.dev/projects/c51b58f8-9c32-4de0-b203-6925cd3e2fc7/bucket/f4eabf1f-df5f-4dfa-9bb3-35e1f131844d.jpg",
    caption: "Народный календарь кукол",
  },
  {
    url: "https://cdn.poehali.dev/projects/c51b58f8-9c32-4de0-b203-6925cd3e2fc7/bucket/545fcb69-e512-4c66-927e-56f71daa6feb.jpg",
    caption: "Мастер-класс по засолке капусты",
  },
  {
    url: "https://cdn.poehali.dev/projects/c51b58f8-9c32-4de0-b203-6925cd3e2fc7/bucket/4352b7b0-41fb-483e-8639-c53add71f69e.jpg",
    caption: "Конференция в Красноярске",
  },
];

const NEWS = [
  {
    id: 1,
    date: "15 марта 2026",
    title: "Мастер-класс по народной вышивке",
    text: "Приглашаем всех желающих на обучающий мастер-класс по традиционной русской вышивке. Опытные мастерицы центра поделятся секретами старинного ремесла.",
    tag: "Мастер-класс",
  },
  {
    id: 2,
    date: "10 марта 2026",
    title: "Открытие выставки «Узоры земли»",
    text: "В нашем центре открылась новая выставка традиционных изделий народных мастеров региона. Экспозиция представляет более 200 уникальных предметов.",
    tag: "Выставка",
  },
  {
    id: 3,
    date: "5 марта 2026",
    title: "Фольклорный ансамбль выступил на гала-концерте",
    text: "Наш ансамбль народной песни «Росинка» занял первое место на региональном фестивале фольклора и получил диплом лауреата.",
    tag: "События",
  },
];

const EVENTS = [
  {
    id: 1,
    date: "22",
    month: "МАР",
    title: "Праздник Масленицы",
    place: "Площадь перед центром",
    time: "12:00",
    type: "Праздник",
  },
  {
    id: 2,
    date: "29",
    month: "МАР",
    title: "Концерт народной музыки",
    place: "Большой зал, 2-й этаж",
    time: "18:00",
    type: "Концерт",
  },
  {
    id: 3,
    date: "5",
    month: "АПР",
    title: "Ярмарка народных мастеров",
    place: "Фойе центра",
    time: "10:00",
    type: "Ярмарка",
  },
  {
    id: 4,
    date: "12",
    month: "АПР",
    title: "Лекция «История народного костюма»",
    place: "Лекционный зал",
    time: "16:00",
    type: "Лекция",
  },
];

const GALLERY = [
  {
    id: 1,
    title: "Традиционная вышивка",
    category: "Текстиль",
    url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Деревянная резьба",
    category: "Резьба",
    url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Народная керамика",
    category: "Керамика",
    url: "https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Фольклорный ансамбль",
    category: "Выступления",
    url: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Плетение корзин",
    category: "Ремёсла",
    url: "https://images.unsplash.com/photo-1585652757173-60fd3ce6b5f2?w=400&h=300&fit=crop",
  },
  {
    id: 6,
    title: "Праздничный костюм",
    category: "Костюм",
    url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=400&h=300&fit=crop",
  },
];

const DOCUMENTS = [
  { id: 1, title: "Устав центра народной традиционной культуры", type: "PDF", size: "1.2 МБ", date: "2024" },
  { id: 2, title: "Программа развития на 2024–2026 годы", type: "PDF", size: "3.5 МБ", date: "2024" },
  { id: 3, title: "Отчёт о деятельности за 2025 год", type: "PDF", size: "2.8 МБ", date: "2025" },
  { id: 4, title: "Правила посещения и пользования центром", type: "PDF", size: "0.5 МБ", date: "2023" },
  { id: 5, title: "Положение о народных коллективах", type: "PDF", size: "0.8 МБ", date: "2024" },
];

type Section = "home" | "news" | "events" | "gallery" | "documents";

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlideIndex((i) => (i + 1) % HERO_SLIDES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const nav = [
    { id: "home", label: "Главная" },
    { id: "news", label: "Новости" },
    { id: "events", label: "Афиша" },
    { id: "gallery", label: "Галерея" },
    { id: "documents", label: "Документы" },
  ];

  return (
    <div style={{ background: "var(--folk-cream)", minHeight: "100vh" }}>
      {/* Header */}
      <header style={{ background: "var(--folk-red)" }} className="sticky top-0 z-50 shadow-lg">
        <div style={{ background: "var(--folk-gold)", height: "4px" }} className="w-full" />
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setActiveSection("home")}
            className="flex items-center gap-3"
            style={{ background: "none", border: "none", cursor: "pointer" }}
          >
            <div
              style={{
                background: "var(--folk-gold)",
                color: "var(--folk-dark)",
                width: 42,
                height: 42,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Cormorant Garamond, serif",
                fontWeight: 700,
                fontSize: 20,
                flexShrink: 0,
              }}
            >
              ЦК
            </div>
            <div className="text-left">
              <div style={{ fontFamily: "Cormorant Garamond, serif", color: "var(--folk-cream)", fontSize: 16, fontWeight: 600, lineHeight: 1.2 }}>
                Центр народной культуры
              </div>
              <div style={{ fontFamily: "Cormorant Garamond, serif", color: "var(--folk-ochre)", fontSize: 13, fontWeight: 400, lineHeight: 1.2 }}>
                «Слобода»
              </div>
            </div>
          </button>

          <nav className="hidden md:flex items-center gap-6">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as Section)}
                className="nav-link text-sm font-medium"
                style={{
                  color: activeSection === item.id ? "var(--folk-ochre)" : "rgba(245,237,216,0.85)",
                  fontFamily: "Golos Text, sans-serif",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <button
            className="md:hidden"
            style={{ color: "var(--folk-cream)", background: "none", border: "none", cursor: "pointer" }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ background: "var(--folk-brown)" }} className="md:hidden px-4 pb-4">
            {nav.map((item) => (
              <button
                key={item.id}
                onClick={() => { setActiveSection(item.id as Section); setMobileMenuOpen(false); }}
                className="block w-full text-left py-3 border-b"
                style={{
                  color: "var(--folk-cream)",
                  borderColor: "rgba(245,237,216,0.15)",
                  background: "none",
                  fontFamily: "Golos Text, sans-serif",
                  fontSize: 15,
                  cursor: "pointer",
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
        <div style={{ background: "var(--folk-gold)", height: "3px" }} className="w-full" />
      </header>

      {/* HOME */}
      {activeSection === "home" && (
        <div>
          {/* Hero Slider */}
          <section className="relative overflow-hidden" style={{ minHeight: 520 }}>
            {/* Slides */}
            {HERO_SLIDES.map((slide, i) => (
              <img
                key={slide.url}
                src={slide.url}
                alt={slide.caption}
                className="absolute inset-0 w-full h-full object-cover"
                style={{
                  opacity: i === slideIndex ? 1 : 0,
                  transition: "opacity 1s ease-in-out",
                  zIndex: i === slideIndex ? 1 : 0,
                }}
              />
            ))}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to right, rgba(10,5,2,0.82) 0%, rgba(10,5,2,0.55) 55%, rgba(10,5,2,0.18) 100%)", zIndex: 2 }}
            />
            {/* Caption badge bottom right */}
            <div
              className="absolute bottom-6 right-6 px-3 py-1 text-xs"
              style={{ background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.7)", zIndex: 3, backdropFilter: "blur(4px)" }}
            >
              {HERO_SLIDES[slideIndex].caption}
            </div>
            {/* Dot indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2" style={{ zIndex: 3 }}>
              {HERO_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlideIndex(i)}
                  style={{
                    width: i === slideIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === slideIndex ? "var(--folk-gold)" : "rgba(255,255,255,0.4)",
                    border: "none",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    padding: 0,
                  }}
                />
              ))}
            </div>
            {/* Arrow buttons */}
            <button
              onClick={() => setSlideIndex((slideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:opacity-80"
              style={{ zIndex: 3, background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.2)", color: "white", width: 40, height: 40, borderRadius: "50%", cursor: "pointer" }}
            >
              <Icon name="ChevronLeft" size={20} />
            </button>
            <button
              onClick={() => setSlideIndex((slideIndex + 1) % HERO_SLIDES.length)}
              className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center transition-all hover:opacity-80"
              style={{ zIndex: 3, background: "rgba(0,0,0,0.35)", border: "1px solid rgba(255,255,255,0.2)", color: "white", width: 40, height: 40, borderRadius: "50%", cursor: "pointer" }}
            >
              <Icon name="ChevronRight" size={20} />
            </button>

            <div className="relative container mx-auto px-4 py-24 flex flex-col justify-center" style={{ minHeight: 520, zIndex: 2 }}>
              <div className="max-w-2xl animate-fade-in-up">
                <div
                  className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest uppercase"
                  style={{ background: "var(--folk-gold)", color: "var(--folk-dark)" }}
                >
                  ◆ Народные традиции ◆
                </div>
                <h1
                  style={{
                    fontFamily: "Cormorant Garamond, serif",
                    fontSize: "clamp(36px, 6vw, 68px)",
                    lineHeight: 1.1,
                    color: "#ffffff",
                    fontWeight: 600,
                    marginBottom: 20,
                    textShadow: "0 2px 12px rgba(0,0,0,0.5)",
                  }}
                >
                  Центр народной<br />
                  <span style={{ color: "var(--folk-ochre)" }}>традиционной культуры</span><br />
                  «Слобода»
                </h1>
                <p style={{ color: "rgba(255,255,255,0.88)", fontSize: 17, lineHeight: 1.7, maxWidth: 480, textShadow: "0 1px 6px rgba(0,0,0,0.5)" }}>
                  Сохраняем и передаём живое наследие народного искусства — вышивку, песни, ремёсла и обряды наших предков.
                </p>
                <div className="flex flex-wrap gap-3 mt-8">
                  <button
                    onClick={() => setActiveSection("events")}
                    className="px-6 py-3 font-medium transition-all hover:opacity-90"
                    style={{ background: "var(--folk-gold)", color: "var(--folk-dark)", fontFamily: "Golos Text, sans-serif", border: "none", cursor: "pointer", fontSize: 15 }}
                  >
                    Афиша мероприятий
                  </button>
                  <button
                    onClick={() => setActiveSection("gallery")}
                    className="px-6 py-3 font-medium transition-all hover:opacity-80"
                    style={{ background: "transparent", color: "var(--folk-cream)", fontFamily: "Golos Text, sans-serif", border: "1px solid rgba(245,237,216,0.4)", cursor: "pointer", fontSize: 15 }}
                  >
                    Галерея
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Features strip */}
          <div style={{ background: "var(--folk-red)" }} className="py-4">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-8">
                {[
                  { icon: "Music", text: "Фольклорные ансамбли" },
                  { icon: "Palette", text: "Мастер-классы" },
                  { icon: "BookOpen", text: "Архив традиций" },
                  { icon: "Users", text: "Народные коллективы" },
                ].map((f) => (
                  <div key={f.text} className="flex items-center gap-2">
                    <Icon name={f.icon} size={16} style={{ color: "var(--folk-ochre)" }} />
                    <span style={{ color: "var(--folk-cream)", fontSize: 13, fontFamily: "Golos Text, sans-serif" }}>{f.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Latest news */}
          <section className="container mx-auto px-4 py-16">
            <div className="ornament-divider mb-10">
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: "var(--folk-dark)", fontWeight: 600, whiteSpace: "nowrap" }}>
                Последние новости
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {NEWS.map((item, i) => (
                <article
                  key={item.id}
                  className="folk-card"
                  style={{ background: "white", borderTop: "3px solid var(--folk-red)", padding: 24 }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs px-2 py-1" style={{ background: "var(--folk-gold)", color: "var(--folk-dark)", fontFamily: "Golos Text" }}>
                      {item.tag}
                    </span>
                    <span style={{ color: "var(--folk-terra)", fontSize: 12 }}>{item.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 20, fontWeight: 600, color: "var(--folk-dark)", marginBottom: 10 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: "#5a4a3a", fontSize: 14, lineHeight: 1.7 }}>{item.text}</p>
                  <button
                    onClick={() => setActiveSection("news")}
                    className="mt-4 text-sm font-medium"
                    style={{ color: "var(--folk-red)", background: "none", border: "none", cursor: "pointer", fontFamily: "Golos Text" }}
                  >
                    Читать далее →
                  </button>
                </article>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setActiveSection("news")}
                className="px-8 py-3 font-medium transition-all hover:opacity-80"
                style={{ border: "2px solid var(--folk-red)", color: "var(--folk-red)", background: "transparent", cursor: "pointer", fontFamily: "Golos Text" }}
              >
                Все новости
              </button>
            </div>
          </section>

          {/* Events preview */}
          <section style={{ background: "var(--folk-brown)" }} className="py-16">
            <div className="container mx-auto px-4">
              <div className="ornament-divider mb-10">
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: "var(--folk-cream)", fontWeight: 600, whiteSpace: "nowrap" }}>
                  Ближайшие события
                </h2>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {EVENTS.map((e) => (
                  <div
                    key={e.id}
                    className="folk-card p-5"
                    style={{ background: "rgba(245,237,216,0.08)", border: "1px solid rgba(200,130,10,0.3)" }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-center flex-shrink-0" style={{ background: "var(--folk-gold)", padding: "8px 12px", minWidth: 54 }}>
                        <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 28, fontWeight: 700, color: "var(--folk-dark)", lineHeight: 1 }}>
                          {e.date}
                        </div>
                        <div style={{ fontSize: 11, color: "var(--folk-dark)", fontWeight: 600, letterSpacing: 1 }}>{e.month}</div>
                      </div>
                      <div>
                        <div style={{ color: "var(--folk-ochre)", fontSize: 11, fontWeight: 600, letterSpacing: 1, marginBottom: 4 }}>
                          {e.type.toUpperCase()}
                        </div>
                        <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 17, color: "var(--folk-cream)", fontWeight: 600, marginBottom: 6 }}>
                          {e.title}
                        </div>
                        <div className="flex items-center gap-1" style={{ color: "rgba(245,237,216,0.6)", fontSize: 12 }}>
                          <Icon name="MapPin" size={12} />
                          <span>{e.place}</span>
                        </div>
                        <div className="flex items-center gap-1 mt-1" style={{ color: "rgba(245,237,216,0.6)", fontSize: 12 }}>
                          <Icon name="Clock" size={12} />
                          <span>{e.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <button
                  onClick={() => setActiveSection("events")}
                  className="px-8 py-3 font-medium transition-all hover:opacity-80"
                  style={{ border: "2px solid var(--folk-gold)", color: "var(--folk-gold)", background: "transparent", cursor: "pointer", fontFamily: "Golos Text" }}
                >
                  Вся афиша
                </button>
              </div>
            </div>
          </section>

          {/* Gallery preview */}
          <section className="container mx-auto px-4 py-16">
            <div className="ornament-divider mb-10">
              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 36, color: "var(--folk-dark)", fontWeight: 600, whiteSpace: "nowrap" }}>
                Галерея
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {GALLERY.map((img) => (
                <div key={img.id} className="folk-card relative overflow-hidden group" style={{ aspectRatio: "4/3" }}>
                  <img
                    src={img.url}
                    alt={img.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 flex flex-col justify-end p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: "linear-gradient(to top, rgba(42,21,6,0.85), transparent)" }}
                  >
                    <div style={{ fontFamily: "Cormorant Garamond, serif", color: "var(--folk-cream)", fontSize: 16, fontWeight: 600 }}>
                      {img.title}
                    </div>
                    <div style={{ color: "var(--folk-ochre)", fontSize: 12 }}>{img.category}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <button
                onClick={() => setActiveSection("gallery")}
                className="px-8 py-3 font-medium transition-all hover:opacity-80"
                style={{ border: "2px solid var(--folk-red)", color: "var(--folk-red)", background: "transparent", cursor: "pointer", fontFamily: "Golos Text" }}
              >
                Смотреть всю галерею
              </button>
            </div>
          </section>
        </div>
      )}

      {/* NEWS PAGE */}
      {activeSection === "news" && (
        <section className="container mx-auto px-4 py-12">
          <div className="ornament-divider mb-10">
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 42, color: "var(--folk-dark)", fontWeight: 600, whiteSpace: "nowrap" }}>
              Новости
            </h1>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {NEWS.map((item) => (
              <article
                key={item.id}
                className="folk-card"
                style={{ background: "white", borderTop: "3px solid var(--folk-red)", padding: 28 }}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-2 py-1" style={{ background: "var(--folk-gold)", color: "var(--folk-dark)" }}>
                    {item.tag}
                  </span>
                  <span style={{ color: "var(--folk-terra)", fontSize: 13 }}>{item.date}</span>
                </div>
                <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 24, fontWeight: 600, color: "var(--folk-dark)", marginBottom: 12 }}>
                  {item.title}
                </h2>
                <p style={{ color: "#5a4a3a", fontSize: 15, lineHeight: 1.75 }}>{item.text}</p>
                <button
                  className="mt-5 text-sm font-medium"
                  style={{ color: "var(--folk-red)", background: "none", border: "none", cursor: "pointer", fontFamily: "Golos Text" }}
                >
                  Читать полностью →
                </button>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* EVENTS PAGE */}
      {activeSection === "events" && (
        <section className="container mx-auto px-4 py-12">
          <div className="ornament-divider mb-10">
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 42, color: "var(--folk-dark)", fontWeight: 600, whiteSpace: "nowrap" }}>
              Афиша
            </h1>
          </div>
          <div className="max-w-3xl mx-auto flex flex-col gap-4">
            {EVENTS.map((e) => (
              <div
                key={e.id}
                className="folk-card flex gap-0 overflow-hidden"
                style={{ background: "white" }}
              >
                <div
                  className="flex flex-col items-center justify-center px-6 py-5 flex-shrink-0"
                  style={{ background: "var(--folk-red)", minWidth: 90 }}
                >
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 38, fontWeight: 700, color: "var(--folk-cream)", lineHeight: 1 }}>
                    {e.date}
                  </div>
                  <div style={{ fontSize: 13, color: "var(--folk-ochre)", fontWeight: 600, letterSpacing: 2 }}>{e.month}</div>
                </div>
                <div className="p-5 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5" style={{ background: "var(--folk-gold)", color: "var(--folk-dark)" }}>
                      {e.type}
                    </span>
                    <span className="flex items-center gap-1" style={{ color: "#999", fontSize: 13 }}>
                      <Icon name="Clock" size={13} />
                      {e.time}
                    </span>
                  </div>
                  <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 22, fontWeight: 600, color: "var(--folk-dark)", marginBottom: 6 }}>
                    {e.title}
                  </h2>
                  <div className="flex items-center gap-1" style={{ color: "#888", fontSize: 13 }}>
                    <Icon name="MapPin" size={13} />
                    <span>{e.place}</span>
                  </div>
                </div>
                <div className="flex items-center pr-5">
                  <button
                    className="px-4 py-2 text-sm font-medium transition-all hover:opacity-80"
                    style={{ background: "var(--folk-red)", color: "var(--folk-cream)", border: "none", cursor: "pointer", fontFamily: "Golos Text" }}
                  >
                    Подробнее
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* GALLERY PAGE */}
      {activeSection === "gallery" && (
        <section className="container mx-auto px-4 py-12">
          <div className="ornament-divider mb-10">
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 42, color: "var(--folk-dark)", fontWeight: 600, whiteSpace: "nowrap" }}>
              Галерея
            </h1>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {GALLERY.map((img) => (
              <div
                key={img.id}
                className="folk-card relative overflow-hidden group"
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "linear-gradient(to top, rgba(42,21,6,0.9), transparent)" }}
                >
                  <div style={{ fontFamily: "Cormorant Garamond, serif", color: "var(--folk-cream)", fontSize: 18, fontWeight: 600 }}>
                    {img.title}
                  </div>
                  <div style={{ color: "var(--folk-ochre)", fontSize: 13 }}>{img.category}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* DOCUMENTS PAGE */}
      {activeSection === "documents" && (
        <section className="container mx-auto px-4 py-12">
          <div className="ornament-divider mb-10">
            <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 42, color: "var(--folk-dark)", fontWeight: 600, whiteSpace: "nowrap" }}>
              Документы
            </h1>
          </div>
          <div className="max-w-2xl mx-auto flex flex-col gap-3">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="folk-card flex items-center gap-4 p-5"
                style={{ background: "white", borderLeft: "4px solid var(--folk-red)" }}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center"
                  style={{ width: 48, height: 48, background: "rgba(139,32,32,0.08)", color: "var(--folk-red)" }}
                >
                  <Icon name="FileText" size={24} />
                </div>
                <div className="flex-1">
                  <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: 18, fontWeight: 600, color: "var(--folk-dark)", marginBottom: 4 }}>
                    {doc.title}
                  </div>
                  <div style={{ fontSize: 13, color: "#888" }}>
                    {doc.type} · {doc.size} · {doc.date}
                  </div>
                </div>
                <button
                  className="flex-shrink-0 flex items-center gap-1 px-3 py-2 text-sm transition-all hover:opacity-80"
                  style={{ color: "var(--folk-red)", border: "1px solid var(--folk-red)", background: "transparent", cursor: "pointer", fontFamily: "Golos Text" }}
                >
                  <Icon name="Download" size={15} />
                  Скачать
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <footer style={{ background: "var(--folk-dark)" }} className="mt-16 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", color: "var(--folk-ochre)", fontSize: 22, fontWeight: 600, marginBottom: 12 }}>
                «Слобода»
              </h3>
              <p style={{ color: "rgba(245,237,216,0.6)", fontSize: 14, lineHeight: 1.7 }}>
                Центр народной традиционной культуры «Слобода» — место, где живут и передаются из поколения в поколение народные традиции.
              </p>
            </div>
            <div>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", color: "var(--folk-ochre)", fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
                Разделы
              </h3>
              {nav.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as Section)}
                  className="block mb-2 text-sm transition-colors hover:opacity-80"
                  style={{ color: "rgba(245,237,216,0.6)", background: "none", border: "none", cursor: "pointer", fontFamily: "Golos Text" }}
                >
                  ◆ {item.label}
                </button>
              ))}
            </div>
            <div>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", color: "var(--folk-ochre)", fontSize: 18, fontWeight: 600, marginBottom: 12 }}>
                Контакты
              </h3>
              <div className="flex flex-col gap-2">
                {[
                  { icon: "MapPin", text: "г. Москва, ул. Народная, 1" },
                  { icon: "Phone", text: "+7 (495) 000-00-00" },
                  { icon: "Mail", text: "info@kulturacenter.ru" },
                ].map((c) => (
                  <div key={c.text} className="flex items-center gap-2">
                    <Icon name={c.icon} size={14} style={{ color: "var(--folk-gold)", flexShrink: 0 }} />
                    <span style={{ color: "rgba(245,237,216,0.6)", fontSize: 13 }}>{c.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div
            className="pt-6 text-center"
            style={{ borderTop: "1px solid rgba(200,130,10,0.2)", color: "rgba(245,237,216,0.35)", fontSize: 13 }}
          >
            © 2026 Центр народной традиционной культуры «Слобода». Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
}