import {
  Home, RefreshCcw, Building2, Layers, Banknote, Hammer,
  Briefcase, Building, ShieldCheck, Umbrella,
} from "lucide-react";

const services = [
  { icon: Home, title: "First Time Buyers", desc: "Guidance from offer to keys — lender selection, deposit strategy, and schemes that fit your situation." },
  { icon: RefreshCcw, title: "Remortgaging", desc: "Rate reviews, equity release strategies and product switches to keep your repayments working harder." },
  { icon: Building2, title: "Buy To Let", desc: "Specialist BTL placements across personal and limited company structures, including HMOs." },
  { icon: Layers, title: "Portfolio Landlords", desc: "Whole-portfolio reviews, refinances and lender criteria mapping for landlords with four or more properties." },
  { icon: Banknote, title: "Second Charge Loans", desc: "Capital raising without disturbing your current mortgage — useful when ERCs or rates make a remortgage costly." },
  { icon: Hammer, title: "Bridging & Development Finance", desc: "Fast, flexible short-term funding for auctions, refurbs, conversions and ground-up development." },
  { icon: Briefcase, title: "Commercial Lending", desc: "Working capital, asset finance and acquisition funding for SMEs and established businesses." },
  { icon: Building, title: "Commercial Mortgages", desc: "Owner-occupier and investment commercial property finance across the UK." },
  { icon: ShieldCheck, title: "Protection", desc: "Life, critical illness and income protection arranged to safeguard your family and assets." },
  { icon: Umbrella, title: "General Insurance", desc: "Buildings, contents, landlord and let-property insurance from trusted UK insurers." },
];

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 bg-noir">
      <div className="container-edge">
        <div className="grid lg:grid-cols-[1fr_1.4fr] gap-16 items-start">
          <div>
            <div className="eyebrow mb-4">About Southstone</div>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-6">
              A modern firm with old-world standards.
            </h2>
            <p className="text-foreground/75 leading-relaxed mb-4">
              Southstone Financial Services was founded on a simple promise: every recommendation is researched, considered and — above all — genuinely right for the client in front of us.
            </p>
            <p className="text-foreground/75 leading-relaxed">
              From a first home to a multi-million pound commercial portfolio, we cover the full spectrum of regulated and specialist lending in the UK.
            </p>
          </div>

          <div id="services">
            <div className="eyebrow mb-4">What We Do</div>
            <h3 className="font-serif text-3xl md:text-4xl mb-8">Our Services</h3>
            <div className="grid sm:grid-cols-2 gap-px bg-gold/15">
              {services.map(({ icon: Icon, title, desc }) => (
                <div key={title} className="card-noir p-6 group hover:bg-noir-elevated transition-colors">
                  <Icon className="w-6 h-6 text-gold mb-4 group-hover:scale-110 transition-transform" />
                  <h4 className="font-serif text-xl mb-2">{title}</h4>
                  <p className="text-sm text-foreground/65 leading-relaxed">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
