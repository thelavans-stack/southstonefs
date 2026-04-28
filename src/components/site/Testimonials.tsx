import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "S Nair",
    tag: "First Time Buyer · Investment Property",
    body: "Not only was I a first-time buyer, but due to personal circumstances I wanted my first purchase to be an investment property — I had the opportunity to buy a house within my budget at almost 20% below market value. Due to the wrong advice, I almost lost out, but having had a thorough meeting with Lavan and Ruban, I was filled with renewed confidence. Needless to say, they knew what they were doing and which lenders to approach and avoid based on criteria. They kept me informed and involved at every stage and I would strongly recommend their services.",
  },
  {
    name: "John H",
    tag: "Mortgage Arrears · Restructure",
    body: "I was in arrears on my mortgage and subsequently my credit score suffered. I was going through a difficult period and buried my head in the sand. I was then referred to Lavan and Ruban and they managed to restructure my finance and, more importantly, allowed me to maintain my properties. I'm forever grateful for their help and always sing their praises to my friends and family.",
  },
  {
    name: "Mark T",
    tag: "Freehold HMO · Bridge Exit",
    body: "Having purchased a freehold HMO, I was put on a high bridging-loan rate and then was referred to Southstone FS. The guys understood my predicament and moved quickly to give me options — securing the term lend I needed and allowing me to exit my high-rate bridge.",
  },
  {
    name: "Theeban",
    tag: "Protection · Tailored Solution",
    body: "I recently got a mortgage but my advisor did not discuss protection, which left me feeling vulnerable. Having met with these gents, they understood my situation and met my needs with their tailored product solutions.",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24 md:py-32 bg-noir">
    <div className="container-edge">
      <div className="text-center mb-14">
        <div className="eyebrow mb-4">Client Stories</div>
        <h2 className="font-serif text-4xl md:text-5xl">Trust, Earned.</h2>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {testimonials.map((t) => (
          <figure key={t.name} className="card-noir p-8 md:p-10 relative">
            <Quote className="absolute top-6 right-6 w-10 h-10 text-gold/20" />
            <blockquote className="text-foreground/80 leading-relaxed text-[0.97rem] italic font-serif text-lg">
              "{t.body}"
            </blockquote>
            <figcaption className="mt-6 pt-6 hairline">
              <div className="font-serif text-xl text-gold">{t.name}</div>
              <div className="eyebrow text-[0.65rem] mt-1">{t.tag}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
