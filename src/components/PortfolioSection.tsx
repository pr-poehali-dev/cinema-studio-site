import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

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

const CATEGORIES = ["Все", "Художественный фильм", "Документальный", "Реклама", "Короткометражный"];

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

interface PortfolioSectionProps {
  activeVideo: string | null;
  setActiveVideo: (id: string | null) => void;
  filter: string;
  setFilter: (f: string) => void;
}

export default function PortfolioSection({ activeVideo, setActiveVideo, filter, setFilter }: PortfolioSectionProps) {
  const filtered = filter === "Все" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === filter);

  return (
    <>
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
                {CATEGORIES.map((cat) => (
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
    </>
  );
}
