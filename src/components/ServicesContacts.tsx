import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

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

interface ServicesContactsProps {
  scrollTo: (id: string) => void;
}

export default function ServicesContacts({ scrollTo }: ServicesContactsProps) {
  return (
    <>
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
    </>
  );
}
