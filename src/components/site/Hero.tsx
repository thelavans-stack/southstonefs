import heroImg from "@/assets/hero-marble.jpg";

const Hero = () => {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Polished black marble with gold veining" width={1920} height={1080} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: "var(--gradient-hero-overlay)" }} />
      </div>

      <div className="relative container-edge py-28 md:py-44 lg:py-56">
        <div className="max-w-3xl animate-fade-up">
          <div className="eyebrow mb-6">FCA Regulated · UK Mortgage & Finance Specialists</div>
          <h1 className="font-serif text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.02] mb-6">
            Built On Trust.<br />
            <span className="text-gold italic">Leaving No Stone Unturned.</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground/75 max-w-2xl mb-10 leading-relaxed">
            Bespoke mortgage, protection and commercial finance advice — crafted by seasoned advisors with five decades of combined banking and property expertise.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-gold">Book A Consultation</a>
            <a href="#calculators" className="btn-ghost-gold">Use A Calculator</a>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="relative border-y border-gold/15 bg-noir/70 backdrop-blur">
        <div className="container-edge grid grid-cols-2 md:grid-cols-4 gap-6 py-8 text-center">
          {[
            { k: "45+", v: "Years Combined Experience" },
            { k: "FCA", v: "Authorised & Regulated" },
            { k: "10", v: "Specialist Lending Areas" },
            { k: "1:1", v: "Director-Led Service" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-serif text-3xl md:text-4xl text-gold">{s.k}</div>
              <div className="eyebrow mt-1 text-[0.65rem]">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
