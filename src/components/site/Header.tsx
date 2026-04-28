import { Phone, Mail } from "lucide-react";

const directors = [
  { name: "Mano Lavan", email: "lavan@southstonefs.com", phone: "07572 188580" },
  { name: "Ruban Arul", email: "ruban@southstonefs.com", phone: "07985 196181" },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Calculators", href: "#calculators" },
  { label: "Directors", href: "#directors" },
  { label: "FAQ", href: "#faq" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Header = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-noir/80 border-b border-gold/15">
      <div className="container-edge">
        {/* Top tier: Brand • Director contacts • CTA */}
        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr_auto] items-center gap-6 py-4">
          <a href="#top" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-sm bg-gradient-gold flex items-center justify-center text-noir font-serif text-xl font-semibold">S</div>
            <div className="leading-tight">
              <div className="font-serif text-xl tracking-wide">Southstone</div>
              <div className="eyebrow text-[0.6rem]">Financial Services</div>
            </div>
          </a>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-10">
            {directors.map((d) => (
              <div key={d.email} className="text-center md:text-left">
                <div className="text-xs eyebrow mb-1">{d.name}</div>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-1 text-sm">
                  <a href={`mailto:${d.email}`} className="inline-flex items-center gap-1.5 text-foreground/85 hover:text-gold transition-colors">
                    <Mail className="w-3.5 h-3.5 text-gold" /> {d.email}
                  </a>
                  <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="inline-flex items-center gap-1.5 text-foreground/85 hover:text-gold transition-colors">
                    <Phone className="w-3.5 h-3.5 text-gold" /> {d.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn-gold hidden lg:inline-flex">Speak To Us</a>
        </div>

        {/* Nav tier */}
        <nav className="border-t border-gold/15 py-3 overflow-x-auto">
          <ul className="flex items-center justify-center gap-8 min-w-max">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-xs uppercase tracking-[0.25em] text-foreground/70 hover:text-gold transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
