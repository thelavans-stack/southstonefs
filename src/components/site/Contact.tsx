import { Mail, Phone, MapPin } from "lucide-react";

const directors = [
  { name: "Mano Lavan", email: "lavan@southstonefs.com", phone: "07572 188580" },
  { name: "Ruban Arul", email: "ruban@southstonefs.com", phone: "07985 196181" },
];

const Contact = () => (
  <section id="contact" className="py-24 md:py-32 bg-noir-elevated relative overflow-hidden">
    <div className="absolute inset-0 opacity-30 pointer-events-none" style={{
      background: "radial-gradient(ellipse at top, hsl(var(--gold) / 0.15), transparent 60%)"
    }} />
    <div className="container-edge relative">
      <div className="text-center max-w-2xl mx-auto mb-14">
        <div className="eyebrow mb-4">Get In Touch</div>
        <h2 className="font-serif text-4xl md:text-5xl">Let's Have A Conversation</h2>
        <p className="mt-4 text-foreground/65">Call or email a director directly — no gatekeepers.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {directors.map((d) => (
          <div key={d.email} className="card-noir p-8 text-center">
            <div className="font-serif text-2xl mb-1">{d.name}</div>
            <div className="eyebrow text-[0.65rem] mb-6">Director</div>
            <div className="space-y-3">
              <a href={`tel:${d.phone.replace(/\s/g, "")}`} className="flex items-center justify-center gap-3 text-foreground/85 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold" /> {d.phone}
              </a>
              <a href={`mailto:${d.email}`} className="flex items-center justify-center gap-3 text-foreground/85 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold" /> {d.email}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-2 text-sm text-foreground/60">
        <MapPin className="w-4 h-4 text-gold" />
        Lime Tree Workshop, 11 Lime Tree Walk, Sevenoaks, England, TN13 1YH
      </div>
    </div>
  </section>
);

export default Contact;
