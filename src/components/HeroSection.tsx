import { useEffect, useRef, useState } from "react";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/7552fb7d-7f75-4810-ba84-b421ad32ac81/files/c13a0022-90fa-4b9b-aae5-e6d6eff27f3c.jpg";

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

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <>
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
    </>
  );
}
