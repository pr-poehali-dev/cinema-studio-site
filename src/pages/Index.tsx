import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7552fb7d-7f75-4810-ba84-b421ad32ac81/files/c13a0022-90fa-4b9b-aae5-e6d6eff27f3c.jpg";

const PORTFOLIO = [
  {
    id: 1,
    title: "Последний рассвет",
    category: "Художественный фильм",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=600&q=80",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 2,
    title: "Город в тумане",
    category: "Документальный",
    year: "2024",
    thumb: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=600&q=80",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 3,
    title: "Pulse — рекламная кампания",
    category: "Реклама",
    year: "2023",
    thumb: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&q=80",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 4,
    title: "Северный ветер",
    category: "Короткометражный",
    year: "2023",
    thumb: "https://images.unsplash.com/photo-1605106702734-205df224ecce?w=600&q=80",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 5,
    title: "Эхо столицы",
    category: "Документальный",
    year: "2023",
    thumb: "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?w=600&q=80",
    videoId: "dQw4w9WgXcQ",
  },
  {
    id: 6,
    title: "Нить",
    category: "Художественный фильм",
    year: "2022",
    thumb: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=600&q=80",
    videoId: "dQw4w9WgXcQ",
  },
];

const SERVICES = [
  {
    icon: "Film",
    title: "Полнометражное кино",
    desc: "Создание художественных и документальных фильмов от идеи до финального монтажа",
  },
  {
    icon: "Video",
    title: "Рекламное производство",
    desc: "Рекламные ролики, имиджевые видео и брендинг-контент для бизнеса",
  },
  {
    icon: "Clapperboard",
    title: "Короткометражки",
    desc: "Авторское кино, фестивальные работы, студенческие проекты и арт-видео",
  },
  {
    icon: "MonitorPlay",
    title: "Пост-продакшн",
    desc: "Цветокоррекция, монтаж, спецэффекты и звуковое оформление",
  },
  {
    icon: "Camera",
    title: "Фотопроизводство",
    desc: "Имиджевые съёмки, кинофотографии и визуальный контент для медиа",
  },
  {
    icon: "Mic",
    title: "Звуковой дизайн",
    desc: "Оригинальные саундтреки, озвучка и профессиональная звукозапись",
  },
];

const STATS = [
  { value: "12+", label: "лет в индустрии" },
  { value: "80+", label: "реализованных проектов" },
  { value: "14", label: "наград на фестивалях" },
  { value: "30+", label: "постоянных клиентов" },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Section({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("Все");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = ["Все", "Художественный фильм", "Документальный", "Реклама", "Короткометражный"];
  const filtered = filter === "Все" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ece8df] grain-overlay overflow-x-hidden">

      {/* NAV */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1f1f1f]" : ""}`}>
        <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
            <div className="w-7 h-7 border border-[#c9a96e] flex items-center justify-center">
              <div className="w-3 h-3 bg-[#c9a96e]" />
            </div>
            <span className="font-cormorant text-xl font-semibold tracking-widest text-[#ece8df] uppercase">КиноАрт</span>
          </button>

          <ul className="hidden md:flex items-center gap-10">
            {[
              ["hero", "Главная"],
              ["about", "О студии"],
              ["portfolio", "Портфолио"],
              ["services", "Услуги"],
              ["contacts", "Контакты"],
            ].map(([id, label]) => (
              <li key={id}>
                <button
                  onClick={() => scrollTo(id)}
                  className="nav-link font-montserrat text-xs tracking-[0.15em] uppercase text-[#999] hover:text-[#c9a96e] transition-colors"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="hidden md:flex items-center gap-2 border border-[#c9a96e] px-5 py-2 text-xs tracking-[0.15em] uppercase font-montserrat text-[#c9a96e] hover:bg-[#c9a96e] hover:text-[#0a0a0a] transition-all duration-300"
            onClick={() => scrollTo("contacts")}
          >
            Обсудить проект
          </button>

          <button className="md:hidden text-[#ece8df]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
          </button>
        </nav>

        {mobileMenuOpen && (
          <div className="md:hidden bg-[#0d0d0d] border-t border-[#1f1f1f] px-6 pb-6">
            {[
              ["hero", "Главная"],
              ["about", "О студии"],
              ["portfolio", "Портфолио"],
              ["services", "Услуги"],
              ["contacts", "Контакты"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="block w-full text-left py-3 font-montserrat text-sm tracking-widest uppercase text-[#999] hover:text-[#c9a96e] transition-colors border-b border-[#1a1a1a]"
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Киностудия" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/60 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 pb-24 md:pb-32 w-full">
          <div className="max-w-3xl">
            <p className="fade-in-up font-montserrat text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-6">
              Профессиональное кинопроизводство
            </p>
            <div className="line-anim h-px bg-[#c9a96e] w-24 mb-8" />
            <h1 className="fade-in-up-delay-1 font-cormorant text-5xl md:text-8xl font-light leading-[0.9] tracking-tight text-[#ece8df] mb-8">
              Каждый кадр —<br />
              <em className="text-[#c9a96e] not-italic">история</em>
            </h1>
            <p className="fade-in-up-delay-2 font-montserrat text-sm md:text-base text-[#888] leading-relaxed max-w-xl mb-12">
              Создаём художественные фильмы, рекламные ролики и документальное кино.
              Полный цикл производства — от сценария до финального монтажа.
            </p>
            <div className="fade-in-up-delay-3 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("portfolio")}
                className="bg-[#c9a96e] text-[#0a0a0a] px-8 py-4 font-montserrat text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#e0be87] transition-colors"
              >
                Смотреть работы
              </button>
              <button
                onClick={() => scrollTo("contacts")}
                className="border border-[#ece8df]/30 text-[#ece8df] px-8 py-4 font-montserrat text-xs tracking-[0.2em] uppercase hover:border-[#c9a96e] hover:text-[#c9a96e] transition-all"
              >
                Обсудить проект
              </button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-3">
          <span
            className="font-montserrat text-xs tracking-[0.2em] uppercase text-[#555]"
            style={{ writingMode: "vertical-rl" }}
          >
            Прокрутите вниз
          </span>
          <div className="w-px h-16 bg-gradient-to-b from-[#555] to-transparent" />
        </div>
      </section>

      {/* STATS */}
      <Section>
        <div className="border-y border-[#1f1f1f]">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4">
            {STATS.map((s, i) => (
              <div key={i} className={`py-10 px-6 text-center ${i < 3 ? "border-r border-[#1f1f1f]" : ""}`}>
                <div className="font-cormorant text-4xl md:text-5xl text-[#c9a96e] font-light mb-2">{s.value}</div>
                <div className="font-montserrat text-xs tracking-[0.15em] uppercase text-[#666]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Section>
            <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center">
              <div>
                <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">О студии</p>
                <h2 className="font-cormorant text-4xl md:text-6xl font-light leading-tight text-[#ece8df] mb-8">
                  Создаём кино,<br />которое остаётся
                </h2>
                <div className="h-px bg-[#2a2a2a] mb-8" />
                <p className="font-montserrat text-sm text-[#777] leading-relaxed mb-6">
                  КиноАрт Студия — независимая производственная компания с более чем 12-летним опытом. Мы специализируемся на создании художественного и документального кино, рекламных роликов и имиджевых видеоматериалов.
                </p>
                <p className="font-montserrat text-sm text-[#777] leading-relaxed mb-10">
                  Наша команда — профессионалы с опытом работы на ведущих российских и международных съёмочных площадках. Мы убеждены, что каждый проект — это диалог между режиссёром и зрителем.
                </p>
                <button
                  onClick={() => scrollTo("contacts")}
                  className="font-montserrat text-xs tracking-[0.2em] uppercase text-[#c9a96e] border-b border-[#c9a96e] pb-1 hover:text-[#e0be87] hover:border-[#e0be87] transition-colors"
                >
                  Познакомиться с командой →
                </button>
              </div>
              <div className="relative">
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=800&q=80"
                    alt="Съёмочный процесс"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/40 to-transparent" />
                </div>
                <div className="absolute -bottom-6 -left-6 w-48 h-48 border border-[#c9a96e]/20 pointer-events-none" />
                <div className="absolute -top-4 -right-4 w-24 h-24 border border-[#c9a96e]/30 pointer-events-none" />
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="py-24 md:py-36 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
              <div>
                <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Наши работы</p>
                <h2 className="font-cormorant text-4xl md:text-6xl font-light text-[#ece8df]">Портфолио</h2>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`font-montserrat text-xs tracking-[0.1em] uppercase px-4 py-2 border transition-all duration-200 ${
                      filter === cat
                        ? "bg-[#c9a96e] border-[#c9a96e] text-[#0a0a0a]"
                        : "border-[#2a2a2a] text-[#666] hover:border-[#c9a96e] hover:text-[#c9a96e]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <Section key={item.id}>
                <div
                  className="portfolio-item group cursor-pointer"
                  onClick={() => setActiveVideo(item.videoId)}
                >
                  <div className="relative aspect-video overflow-hidden bg-[#111]">
                    <img
                      src={item.thumb}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700"
                    />
                    <div className="video-overlay absolute inset-0 bg-[#0a0a0a]/70 opacity-0 transition-opacity duration-300 flex items-center justify-center">
                      <div className="w-16 h-16 border-2 border-[#c9a96e] rounded-full flex items-center justify-center">
                        <Icon name="Play" size={22} className="text-[#c9a96e] ml-1" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-[#0a0a0a]/80 px-2 py-1">
                      <span className="font-montserrat text-xs text-[#666]">{item.year}</span>
                    </div>
                  </div>
                  <div className="pt-4 pb-2">
                    <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#c9a96e] mb-2">{item.category}</p>
                    <h3 className="font-cormorant text-xl text-[#ece8df] group-hover:text-[#c9a96e] transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {activeVideo && (
        <div
          className="fixed inset-0 z-50 bg-[#0a0a0a]/95 flex items-center justify-center p-4 md:p-12"
          onClick={() => setActiveVideo(null)}
        >
          <button
            className="absolute top-6 right-6 text-[#ece8df] hover:text-[#c9a96e] transition-colors"
            onClick={() => setActiveVideo(null)}
          >
            <Icon name="X" size={28} />
          </button>
          <div
            className="w-full max-w-5xl aspect-video bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`}
              className="w-full h-full"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
          </div>
        </div>
      )}

      {/* SERVICES */}
      <section id="services" className="py-24 md:py-36">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Section>
            <div className="mb-16">
              <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Что мы делаем</p>
              <h2 className="font-cormorant text-4xl md:text-6xl font-light text-[#ece8df] max-w-xl">
                Услуги кинопроизводства
              </h2>
            </div>
          </Section>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#1a1a1a]">
            {SERVICES.map((s, i) => (
              <Section key={i}>
                <div className="service-card bg-[#0a0a0a] p-8 border border-transparent transition-all duration-300 h-full">
                  <div className="w-10 h-10 border border-[#2a2a2a] flex items-center justify-center mb-6">
                    <Icon name={s.icon} size={18} className="text-[#c9a96e]" fallback="Film" />
                  </div>
                  <h3 className="font-cormorant text-2xl text-[#ece8df] mb-3">{s.title}</h3>
                  <p className="font-montserrat text-sm text-[#666] leading-relaxed">{s.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 md:py-36 bg-[#060606]">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <Section>
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              <div>
                <p className="font-montserrat text-xs tracking-[0.3em] uppercase text-[#c9a96e] mb-4">Контакты</p>
                <h2 className="font-cormorant text-4xl md:text-6xl font-light text-[#ece8df] mb-8">
                  Начнём ваш<br />проект вместе
                </h2>
                <p className="font-montserrat text-sm text-[#777] leading-relaxed mb-12 max-w-md">
                  Расскажите нам о вашей идее. Мы готовы обсудить любой формат — от короткометражки до полного метра.
                </p>

                <div className="space-y-6">
                  {[
                    { icon: "Mail", label: "Email", value: "info@kinoart-studio.ru" },
                    { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                    { icon: "MapPin", label: "Адрес", value: "Москва, ул. Мосфильмовская, 1" },
                  ].map((c) => (
                    <div key={c.label} className="flex items-center gap-4 pb-4 border-b border-[#1a1a1a]">
                      <div className="w-10 h-10 border border-[#2a2a2a] flex items-center justify-center flex-shrink-0">
                        <Icon name={c.icon} size={16} className="text-[#c9a96e]" fallback="Circle" />
                      </div>
                      <div>
                        <p className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#555] mb-1">{c.label}</p>
                        <p className="font-montserrat text-sm text-[#ece8df]">{c.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#555] block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      placeholder="Иван Петров"
                      className="w-full bg-transparent border-b border-[#2a2a2a] focus:border-[#c9a96e] outline-none py-3 font-montserrat text-sm text-[#ece8df] placeholder:text-[#444] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#555] block mb-2">Телефон или Email</label>
                    <input
                      type="text"
                      placeholder="+7 (999) 000-00-00"
                      className="w-full bg-transparent border-b border-[#2a2a2a] focus:border-[#c9a96e] outline-none py-3 font-montserrat text-sm text-[#ece8df] placeholder:text-[#444] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#555] block mb-2">Тип проекта</label>
                    <select className="w-full bg-[#0a0a0a] border-b border-[#2a2a2a] focus:border-[#c9a96e] outline-none py-3 font-montserrat text-sm text-[#ece8df] transition-colors appearance-none cursor-pointer">
                      <option value="" className="bg-[#111]">Выберите тип</option>
                      <option value="film" className="bg-[#111]">Художественный фильм</option>
                      <option value="doc" className="bg-[#111]">Документальный фильм</option>
                      <option value="ad" className="bg-[#111]">Рекламный ролик</option>
                      <option value="short" className="bg-[#111]">Короткометражка</option>
                      <option value="other" className="bg-[#111]">Другое</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-montserrat text-[10px] tracking-[0.2em] uppercase text-[#555] block mb-2">О проекте</label>
                    <textarea
                      rows={4}
                      placeholder="Расскажите о вашей идее..."
                      className="w-full bg-transparent border-b border-[#2a2a2a] focus:border-[#c9a96e] outline-none py-3 font-montserrat text-sm text-[#ece8df] placeholder:text-[#444] transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[#c9a96e] text-[#0a0a0a] py-4 font-montserrat text-xs tracking-[0.2em] uppercase font-semibold hover:bg-[#e0be87] transition-colors mt-4"
                  >
                    Отправить заявку
                  </button>
                </form>
              </div>
            </div>
          </Section>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#1a1a1a] py-8">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 border border-[#c9a96e] flex items-center justify-center">
              <div className="w-2 h-2 bg-[#c9a96e]" />
            </div>
            <span className="font-cormorant text-sm tracking-widest uppercase text-[#555]">КиноАрт Студия</span>
          </div>
          <p className="font-montserrat text-xs text-[#444]">© 2024 КиноАрт. Все права защищены.</p>
          <div className="flex gap-4">
            {["Instagram", "Youtube", "Send"].map((icon) => (
              <button
                key={icon}
                className="w-8 h-8 border border-[#2a2a2a] flex items-center justify-center hover:border-[#c9a96e] hover:text-[#c9a96e] text-[#555] transition-all"
              >
                <Icon name={icon} size={14} fallback="Circle" />
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}