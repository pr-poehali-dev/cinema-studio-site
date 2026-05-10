import Icon from "@/components/ui/icon";

interface NavbarProps {
  scrolled: boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

const NAV_LINKS = [
  ["hero", "Главная"],
  ["about", "О студии"],
  ["portfolio", "Портфолио"],
  ["services", "Услуги"],
  ["contacts", "Контакты"],
];

export default function Navbar({ scrolled, mobileMenuOpen, setMobileMenuOpen, scrollTo }: NavbarProps) {
  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#0a0a0a]/95 backdrop-blur-sm border-b border-[#1f1f1f]" : ""}`}>
      <nav className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
        <button onClick={() => scrollTo("hero")} className="flex items-center gap-3">
          <div className="w-7 h-7 border border-[#c9a96e] flex items-center justify-center">
            <div className="w-3 h-3 bg-[#c9a96e]" />
          </div>
          <span className="font-cormorant text-xl font-semibold tracking-widest text-[#ece8df] uppercase">КиноАрт</span>
        </button>

        <ul className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map(([id, label]) => (
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
          {NAV_LINKS.map(([id, label]) => (
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
  );
}
