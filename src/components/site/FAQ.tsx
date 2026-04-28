import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  {
    q: "I'm self-employed — can I still get a mortgage?",
    a: "Yes. Lenders typically request 1–3 years of SA302s and tax year overviews, or full company accounts for limited company directors. Some specialist lenders accept just one year of trading. We match your trading structure to lenders that understand it — including those that consider retained profits in addition to salary and dividends.",
  },
  {
    q: "I work as a contractor on day rates. How is my income assessed?",
    a: "Many lenders will use your day rate × 5 days × 46–48 weeks as gross annualised income, even within the first year of contracting. We know which lenders accept day-rate contracts, IR35-inside engagements, and umbrella arrangements without forcing you down the self-employed route.",
  },
  {
    q: "I'm a UK ex-pat — can I get a mortgage on a UK property?",
    a: "Absolutely. We work with lenders who accept foreign currency income, ex-pat residential and ex-pat buy-to-let applications. Country of residence, employer profile and currency all matter — we'll narrow this down to lenders likely to accept your circumstances before applying.",
  },
  {
    q: "I'm a first-time buyer — what do I actually need?",
    a: "Typically a deposit of at least 5–10%, three months of bank statements, three months of payslips (or accounts if self-employed), proof of ID and address, and a healthy credit profile. We'll walk you through every document, schemes you may be eligible for, and the true cost of buying including SDLT, legal fees and surveys.",
  },
  {
    q: "I receive overseas income — can it be used?",
    a: "Yes, with the right lender. We focus on lenders comfortable with foreign currency income, multi-jurisdiction tax arrangements and HNW structures. Documentation usually includes overseas tax returns, employer confirmation and 6–12 months of bank statements.",
  },
  {
    q: "I have 4+ properties — am I a portfolio landlord?",
    a: "Yes. From your fourth mortgaged buy-to-let, lenders apply the PRA portfolio landlord rules: stress testing across the entire portfolio, a business plan, cash-flow forecast and asset & liability statement. We prepare the full portfolio submission with you so applications progress smoothly.",
  },
  {
    q: "Will I be charged a fee?",
    a: "We charge up to a maximum of 1% of the loan, depending on the research and administration required. The exact fee is disclosed and agreed before any application. Please refer to our Terms of Business for further information.",
  },
];

const FAQ = () => (
  <section id="faq" className="py-24 md:py-32 bg-noir-elevated">
    <div className="container-edge max-w-4xl">
      <div className="text-center mb-14">
        <div className="eyebrow mb-4">Common Questions</div>
        <h2 className="font-serif text-4xl md:text-5xl">Specialist Scenarios, Answered</h2>
      </div>

      <Accordion type="single" collapsible className="space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="card-noir px-6 border">
            <AccordionTrigger className="text-left font-serif text-xl hover:text-gold hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-foreground/70 leading-relaxed pb-6">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  </section>
);

export default FAQ;
