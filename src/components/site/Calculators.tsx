import { useState } from "react";
import { Download } from "lucide-react";
import { exportCalculatorPdf, type PdfRow } from "@/lib/exportCalcPdf";

const ExportButton = ({ onClick }: { onClick: () => void }) => (
  <button
    onClick={onClick}
    className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-3 text-[0.7rem] uppercase tracking-[0.2em] border border-gold/40 text-gold hover:bg-gradient-gold hover:text-noir hover:border-transparent transition-all w-full"
  >
    <Download className="w-3.5 h-3.5" /> Export PDF
  </button>
);

const Tabs = ({ tabs, active, onChange }: { tabs: string[]; active: string; onChange: (t: string) => void }) => (
  <div className="flex flex-wrap gap-2 mb-10 justify-center">
    {tabs.map((t) => (
      <button
        key={t}
        onClick={() => onChange(t)}
        className={`px-5 py-2.5 text-xs uppercase tracking-[0.2em] border transition-all ${
          active === t
            ? "bg-gradient-gold text-noir border-transparent"
            : "border-gold/30 text-foreground/70 hover:border-gold hover:text-gold"
        }`}
      >
        {t}
      </button>
    ))}
  </div>
);

const fmt = (n: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", maximumFractionDigits: 0 }).format(
    Number.isFinite(n) ? n : 0,
  );

const Field = ({ label, value, onChange, suffix, step = "1" }: { label: string; value: number; onChange: (n: number) => void; suffix?: string; step?: string }) => (
  <label className="block">
    <span className="eyebrow text-[0.65rem]">{label}</span>
    <div className="mt-2 flex items-center bg-input border border-gold/20 focus-within:border-gold transition-colors">
      <input
        type="number"
        value={Number.isFinite(value) ? value : 0}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        step={step}
        className="w-full bg-transparent px-4 py-3 text-foreground outline-none font-medium"
      />
      {suffix && <span className="px-3 text-gold text-sm">{suffix}</span>}
    </div>
  </label>
);

/* ---------------- Mortgage ---------------- */
function MortgageCalc() {
  const [price, setPrice] = useState(450000);
  const [deposit, setDeposit] = useState(90000);
  const [rate, setRate] = useState(4.75);
  const [years, setYears] = useState(25);

  const principal = Math.max(0, price - deposit);
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly = r === 0 ? principal / n : (principal * r) / (1 - Math.pow(1 + r, -n));
  const total = monthly * n;
  const interest = total - principal;
  const ltv = price > 0 ? (principal / price) * 100 : 0;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-5">
        <Field label="Property Price" value={price} onChange={setPrice} suffix="£" />
        <Field label="Deposit" value={deposit} onChange={setDeposit} suffix="£" />
        <Field label="Interest Rate" value={rate} onChange={setRate} suffix="%" step="0.05" />
        <Field label="Term (Years)" value={years} onChange={setYears} suffix="yrs" />
      </div>
      <div className="card-noir p-8 flex flex-col justify-center">
        <div className="eyebrow mb-2">Estimated Monthly Repayment</div>
        <div className="font-serif text-5xl text-gold mb-8">{fmt(monthly)}</div>
        <dl className="space-y-3 text-sm">
          <Row label="Loan Amount" value={fmt(principal)} />
          <Row label="LTV" value={`${ltv.toFixed(1)}%`} />
          <Row label="Total Interest" value={fmt(interest)} />
          <Row label="Total Repayable" value={fmt(total)} />
        </dl>
        <ExportButton
          onClick={() =>
            exportCalculatorPdf({
              title: "Mortgage Repayment Estimate",
              headline: { label: "Estimated Monthly Repayment", value: fmt(monthly) },
              inputs: [
                { label: "Property Price", value: fmt(price) },
                { label: "Deposit", value: fmt(deposit) },
                { label: "Interest Rate", value: `${rate.toFixed(2)}%` },
                { label: "Term", value: `${years} years` },
              ],
              results: [
                { label: "Loan Amount", value: fmt(principal) },
                { label: "Loan to Value", value: `${ltv.toFixed(1)}%` },
                { label: "Total Interest", value: fmt(interest) },
                { label: "Total Repayable", value: fmt(total) },
              ],
              filename: "southstone-mortgage-estimate.pdf",
            })
          }
        />
      </div>
    </div>
  );
}

const Row = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between border-b border-gold/10 pb-2">
    <dt className="text-foreground/60">{label}</dt>
    <dd className="font-medium">{value}</dd>
  </div>
);

/* ---------------- Overpayment ---------------- */
type RepayMode = "repayment" | "interest" | "part";
type SplitUnit = "percent" | "amount";

function OverpaymentCalc() {
  const [balance, setBalance] = useState(250000);
  const [rate, setRate] = useState(4.75);
  const [years, setYears] = useState(25);
  const [over, setOver] = useState(200);
  const [mode, setMode] = useState<RepayMode>("repayment");
  const [splitUnit, setSplitUnit] = useState<SplitUnit>("percent");
  const [partPct, setPartPct] = useState(50);
  const [partAmount, setPartAmount] = useState(125000);

  const r = rate / 100 / 12;
  const n = years * 12;

  // Resolve capital-repayment portion based on chosen split unit
  const repayPortion =
    mode === "repayment"
      ? balance
      : mode === "interest"
      ? 0
      : splitUnit === "percent"
      ? balance * (Math.min(100, Math.max(0, partPct)) / 100)
      : Math.min(balance, Math.max(0, partAmount));
  const interestPortion = balance - repayPortion;
  const effectivePct = balance > 0 ? (repayPortion / balance) * 100 : 0;

  const repayMonthly = repayPortion === 0 ? 0 : r === 0 ? repayPortion / n : (repayPortion * r) / (1 - Math.pow(1 + r, -n));
  const interestMonthly = interestPortion * r;
  const baseMonthly = repayMonthly + interestMonthly;

  const simulate = (extra: number) => {
    if (repayPortion === 0) {
      let bal = balance;
      let months = 0;
      let totalInt = 0;
      while (bal > 0 && months < 1200 && extra > 0) {
        const interest = bal * r;
        totalInt += interest;
        bal = bal - extra;
        months++;
      }
      if (extra === 0) return { months: n, totalInt: balance * r * n };
      return { months, totalInt };
    }
    let bal = repayPortion;
    let months = 0;
    let totalInt = interestPortion * r * n;
    const baseRepay = repayMonthly;
    while (bal > 0 && months < 1200) {
      const interest = bal * r;
      const pay = Math.min(bal + interest, baseRepay + extra);
      totalInt += interest;
      bal = bal + interest - pay;
      months++;
    }
    return { months, totalInt };
  };

  const base = simulate(0);
  const withOver = simulate(over);
  const monthsSaved = Math.max(0, base.months - withOver.months);
  const intSaved = Math.max(0, base.totalInt - withOver.totalInt);

  const modes: { k: RepayMode; label: string }[] = [
    { k: "repayment", label: "Capital & Interest" },
    { k: "interest", label: "Interest Only" },
    { k: "part", label: "Part & Part" },
  ];

  const modeLabel = modes.find((m) => m.k === mode)!.label;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-5">
        <div>
          <span className="eyebrow text-[0.65rem]">Repayment Type</span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {modes.map((o) => (
              <button
                key={o.k}
                onClick={() => setMode(o.k)}
                className={`px-3 py-3 text-[0.7rem] uppercase tracking-wider border transition-all ${
                  mode === o.k ? "bg-gradient-gold text-noir border-transparent" : "border-gold/30 text-foreground/70 hover:border-gold"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <Field label="Current Balance" value={balance} onChange={setBalance} suffix="£" />
        <Field label="Interest Rate" value={rate} onChange={setRate} suffix="%" step="0.05" />
        <Field label="Remaining Term (Years)" value={years} onChange={setYears} suffix="yrs" />
        {mode === "part" && (
          <div className="space-y-3">
            <div>
              <span className="eyebrow text-[0.65rem]">Split By</span>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[
                  { k: "percent" as SplitUnit, label: "% Split" },
                  { k: "amount" as SplitUnit, label: "£ Amount" },
                ].map((o) => (
                  <button
                    key={o.k}
                    onClick={() => setSplitUnit(o.k)}
                    className={`px-3 py-2.5 text-[0.7rem] uppercase tracking-wider border transition-all ${
                      splitUnit === o.k ? "bg-gradient-gold text-noir border-transparent" : "border-gold/30 text-foreground/70 hover:border-gold"
                    }`}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>
            {splitUnit === "percent" ? (
              <Field
                label="Capital Repayment Portion"
                value={partPct}
                onChange={(v) => setPartPct(Math.min(100, Math.max(0, v)))}
                suffix="%"
                step="1"
              />
            ) : (
              <Field
                label="Capital Repayment Amount"
                value={partAmount}
                onChange={(v) => setPartAmount(Math.min(balance, Math.max(0, v)))}
                suffix="£"
              />
            )}
          </div>
        )}
        <Field label="Monthly Overpayment" value={over} onChange={setOver} suffix="£" />
      </div>
      <div className="card-noir p-8 flex flex-col justify-center">
        <div className="eyebrow mb-2">You Could Save</div>
        <div className="font-serif text-5xl text-gold mb-8">{fmt(intSaved)}</div>
        <dl className="space-y-3 text-sm">
          <Row label="Standard Monthly Payment" value={fmt(baseMonthly)} />
          <Row label="New Monthly Payment" value={fmt(baseMonthly + over)} />
          {mode === "part" && (
            <>
              <Row label="Capital & Interest Portion" value={fmt(repayMonthly)} />
              <Row label="Interest-Only Portion" value={fmt(interestMonthly)} />
            </>
          )}
          <Row label="Time Saved" value={`${Math.floor(monthsSaved / 12)}y ${monthsSaved % 12}m`} />
          <Row label="Original Term Interest" value={fmt(base.totalInt)} />
        </dl>
        <ExportButton
          onClick={() => {
            const inputs: PdfRow[] = [
              { label: "Repayment Type", value: modeLabel },
              { label: "Current Balance", value: fmt(balance) },
              { label: "Interest Rate", value: `${rate.toFixed(2)}%` },
              { label: "Remaining Term", value: `${years} years` },
              { label: "Monthly Overpayment", value: fmt(over) },
            ];
            if (mode === "part") {
              inputs.push({
                label: "Capital / Interest Split",
                value:
                  splitUnit === "percent"
                    ? `${partPct}% / ${(100 - partPct).toFixed(0)}%`
                    : `${fmt(repayPortion)} / ${fmt(interestPortion)} (${effectivePct.toFixed(1)}%)`,
              });
            }
            const results: PdfRow[] = [
              { label: "Standard Monthly Payment", value: fmt(baseMonthly) },
              { label: "New Monthly Payment", value: fmt(baseMonthly + over) },
            ];
            if (mode === "part") {
              results.push(
                { label: "Capital & Interest Portion", value: fmt(repayMonthly) },
                { label: "Interest-Only Portion", value: fmt(interestMonthly) },
              );
            }
            results.push(
              { label: "Time Saved", value: `${Math.floor(monthsSaved / 12)}y ${monthsSaved % 12}m` },
              { label: "Interest Saved", value: fmt(intSaved) },
              { label: "Original Term Interest", value: fmt(base.totalInt) },
            );
            exportCalculatorPdf({
              title: "Mortgage Overpayment Analysis",
              headline: { label: "You Could Save", value: fmt(intSaved) },
              inputs,
              results,
              filename: "southstone-overpayment-analysis.pdf",
            });
          }}
        />
      </div>
    </div>
  );
}

/* ---------------- Stamp Duty 2026 ----------------
   2026 SDLT bands (England & NI) effective from 1 April 2025 onwards.
   Standard residential:
     0–125,000:        0%
     125,001–250,000:  2%
     250,001–925,000:  5%
     925,001–1,500,000: 10%
     1,500,001+:       12%
   First-time buyer (purchase ≤ £500,000):
     0–300,000:        0%
     300,001–500,000:  5%
     Above £500,000 → standard rates apply, no FTB relief.
   Additional property (BTL/second home): +5% surcharge across all bands.
*/
function StampDutyCalc() {
  const [price, setPrice] = useState(450000);
  const [type, setType] = useState<"main" | "ftb" | "additional">("main");

  const calc = () => {
    if (type === "ftb" && price <= 500000) {
      const bands = [
        { up: 300000, rate: 0 },
        { up: 500000, rate: 0.05 },
      ];
      return runBands(price, bands);
    }
    const bands = [
      { up: 125000, rate: 0 },
      { up: 250000, rate: 0.02 },
      { up: 925000, rate: 0.05 },
      { up: 1500000, rate: 0.10 },
      { up: Infinity, rate: 0.12 },
    ];
    let total = runBands(price, bands);
    if (type === "additional") total += price * 0.05;
    return total;
  };

  const tax = calc();
  const effective = price > 0 ? (tax / price) * 100 : 0;

  return (
    <div className="grid md:grid-cols-2 gap-10">
      <div className="space-y-5">
        <Field label="Property Price" value={price} onChange={setPrice} suffix="£" />
        <div>
          <span className="eyebrow text-[0.65rem]">Buyer Type</span>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { k: "main", label: "Main Home" },
              { k: "ftb", label: "First-Time Buyer" },
              { k: "additional", label: "Additional / BTL" },
            ].map((o) => (
              <button
                key={o.k}
                onClick={() => setType(o.k as typeof type)}
                className={`px-3 py-3 text-[0.7rem] uppercase tracking-wider border transition-all ${
                  type === o.k ? "bg-gradient-gold text-noir border-transparent" : "border-gold/30 text-foreground/70 hover:border-gold"
                }`}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
        <p className="text-xs text-foreground/55 leading-relaxed pt-2">
          Calculated using 2026 SDLT bands (England &amp; Northern Ireland). First-time buyer relief available on purchases up to £500,000. A 5% surcharge applies to additional dwellings.
        </p>
      </div>
      <div className="card-noir p-8 flex flex-col justify-center">
        <div className="eyebrow mb-2">Stamp Duty Payable</div>
        <div className="font-serif text-5xl text-gold mb-8">{fmt(tax)}</div>
        <dl className="space-y-3 text-sm">
          <Row label="Property Price" value={fmt(price)} />
          <Row label="Effective Rate" value={`${effective.toFixed(2)}%`} />
          <Row label="Net Cost" value={fmt(price + tax)} />
        </dl>
        <ExportButton
          onClick={() =>
            exportCalculatorPdf({
              title: "Stamp Duty Estimate (2026)",
              headline: { label: "Stamp Duty Payable", value: fmt(tax) },
              inputs: [
                { label: "Property Price", value: fmt(price) },
                {
                  label: "Buyer Type",
                  value: type === "main" ? "Main Home" : type === "ftb" ? "First-Time Buyer" : "Additional / BTL",
                },
              ],
              results: [
                { label: "Stamp Duty Payable", value: fmt(tax) },
                { label: "Effective Rate", value: `${effective.toFixed(2)}%` },
                { label: "Net Cost (Price + SDLT)", value: fmt(price + tax) },
              ],
              notes:
                "Calculated using 2026 SDLT bands for England & Northern Ireland. First-time buyer relief applies on purchases up to £500,000. Additional dwellings carry a 5% surcharge.",
              filename: "southstone-stamp-duty-estimate.pdf",
            })
          }
        />
      </div>
    </div>
  );
}

function runBands(price: number, bands: { up: number; rate: number }[]) {
  let total = 0;
  let prev = 0;
  for (const b of bands) {
    if (price > prev) {
      const slice = Math.min(price, b.up) - prev;
      total += slice * b.rate;
      prev = b.up;
    } else break;
  }
  return total;
}

/* ---------------- Wrapper ---------------- */
const Calculators = () => {
  const tabs = ["Mortgage", "Overpayment", "Stamp Duty 2026"];
  const [active, setActive] = useState(tabs[0]);

  return (
    <section id="calculators" className="py-24 md:py-32 bg-noir">
      <div className="container-edge">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="eyebrow mb-4">Tools</div>
          <h2 className="font-serif text-4xl md:text-5xl">Interactive Calculators</h2>
          <p className="mt-4 text-foreground/65">Indicative figures to inform your conversation with us.</p>
        </div>

        <Tabs tabs={tabs} active={active} onChange={setActive} />

        <div className="card-noir p-8 md:p-12">
          {active === "Mortgage" && <MortgageCalc />}
          {active === "Overpayment" && <OverpaymentCalc />}
          {active === "Stamp Duty 2026" && <StampDutyCalc />}
        </div>
      </div>
    </section>
  );
};

export default Calculators;
