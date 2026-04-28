import { Mail, Phone } from "lucide-react";

const directors = [
  {
    name: "Mano Lavan",
    title: "Director",
    bio: "Mano has over two decades of experience across the property markets and brings extensive knowledge of property investment and lending — from single buy-to-lets to complex portfolio refinances.",
    email: "lavan@southstonefs.com",
    phone: "07572 188580",
  },
  {
    name: "Ruban Arul",
    title: "Director",
    bio: "Ruban brings twenty-five years of banking experience working predominantly with high-net-worth individuals and large corporates. His expertise gives clients the confidence to build long-term relationships and achieve their goals and aspirations.",
    email: "ruban@southstonefs.com",
    phone: "07985 196181",
  },
];

const Directors = () => {
  return (
    <section id="directors" className="py-24 md:py-32 bg-noir-elevated relative">
      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="eyebrow mb-4">Leadership</div>
          <h2 className="font-serif text-4xl md:text-5xl">Meet The Directors</h2>
          <p className="mt-4 text-foreground/65">Direct access to seasoned decision-makers — never a call centre.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {directors.map((d) => (
            <article key={d.name} className="card-noir p-10 relative">
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 shrink-0 rounded-full bg-gradient-gold flex items-center justify-center text-noir font-serif text-3xl">
                  {d.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <h3 className="font-serif text-3xl">{d.name}</h3>
                  <div className="eyebrow text-[0.65rem] mt-1">{d.title}</div>
                </div>
              </div>
              <p className="mt-6 text-foreground/75 leading-relaxed">{d.bio}</p>
              <div className="mt-8 pt-6 hairline space-y-2 text-sm">
                <a href={`mailto:${d.email}`} className="flex items-center gap-3 text-foreground/85 hover:text-gold transition-colors">
                  <Mail className="w-4 h-4 text-gold" /> {d.email}
                </a>
                <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="flex items-center gap-3 text-foreground/85 hover:text-gold transition-colors">
                  <Phone className="w-4 h-4 text-gold" /> {d.phone}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Directors;
