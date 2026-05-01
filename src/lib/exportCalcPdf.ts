import jsPDF from "jspdf";

export type PdfRow = { label: string; value: string };

export interface CalcPdfOptions {
  title: string;
  headline: { label: string; value: string };
  inputs: PdfRow[];
  results: PdfRow[];
  notes?: string;
  filename: string;
}

const COMPANY = {
  name: "Southstone Financial Services",
  website: "www.southstonefs.com",
  address: "Lime Tree Workshop, 11 Lime Tree Walk, Sevenoaks, England, TN13 1YH",
  directors: [
    { name: "Mano Lavan", credentials: "L.LB(Hons.) CeMAP", email: "lavan@southstonefs.com", phone: "07572 188580" },
    { name: "Ruban Arul", credentials: "BA(Hons.) CeMAP", email: "ruban@southstonefs.com", phone: "07985 196181" },
  ],
  disclaimer:
    "Figures are indicative only and do not constitute financial advice. Your home may be repossessed if you do not keep up repayments on your mortgage.",
};

// Noir & Gold palette
const NOIR: [number, number, number] = [13, 13, 13];
const GOLD: [number, number, number] = [201, 168, 76];
const CREAM: [number, number, number] = [240, 215, 140];
const PAPER: [number, number, number] = [250, 248, 243];
const INK: [number, number, number] = [30, 30, 30];
const MUTED: [number, number, number] = [110, 110, 110];

export function exportCalculatorPdf(opts: CalcPdfOptions) {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  const M = 18;

  // ---------- Header band ----------
  doc.setFillColor(...NOIR);
  doc.rect(0, 0, W, 38, "F");

  // Gold "S" monogram box
  doc.setFillColor(...GOLD);
  doc.rect(M, 11, 16, 16, "F");
  doc.setTextColor(...NOIR);
  doc.setFont("times", "bold");
  doc.setFontSize(20);
  doc.text("S", M + 8, 22.5, { align: "center", baseline: "middle" });

  // Wordmark
  doc.setTextColor(245, 240, 224);
  doc.setFont("times", "normal");
  doc.setFontSize(16);
  doc.text("SOUTHSTONE", M + 22, 19);
  doc.setFontSize(8);
  doc.setTextColor(...CREAM);
  doc.text("FINANCIAL SERVICES", M + 22, 24.5);

  // Right side — website
  doc.setFontSize(8);
  doc.setTextColor(...CREAM);
  doc.text(COMPANY.website.toUpperCase(), W - M, 19, { align: "right" });
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(7);
  doc.text(new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" }), W - M, 24.5, {
    align: "right",
  });

  // Gold hairline
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(M, 38, W - M, 38);

  // ---------- Title ----------
  let y = 52;
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text("CALCULATION SUMMARY", M, y);
  y += 7;
  doc.setTextColor(...INK);
  doc.setFont("times", "normal");
  doc.setFontSize(22);
  doc.text(opts.title, M, y);
  y += 10;

  // ---------- Headline result card ----------
  doc.setFillColor(...NOIR);
  doc.rect(M, y, W - 2 * M, 30, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.line(M, y, M + 40, y);

  doc.setTextColor(...CREAM);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.text(opts.headline.label.toUpperCase(), M + 6, y + 9);

  doc.setTextColor(...GOLD);
  doc.setFont("times", "normal");
  doc.setFontSize(26);
  doc.text(opts.headline.value, M + 6, y + 22);

  y += 42;

  // ---------- Two-column tables ----------
  const colW = (W - 2 * M - 8) / 2;
  const inputsX = M;
  const resultsX = M + colW + 8;
  const startY = y;

  drawTable(doc, "Your Inputs", opts.inputs, inputsX, startY, colW);
  const rightHeight = drawTable(doc, "Results", opts.results, resultsX, startY, colW);
  const leftHeight = (opts.inputs.length + 1) * 8 + 6;
  y = startY + Math.max(leftHeight, rightHeight) + 8;

  // ---------- Notes ----------
  if (opts.notes) {
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(8);
    const lines = doc.splitTextToSize(opts.notes, W - 2 * M);
    doc.text(lines, M, y);
    y += lines.length * 4 + 4;
  }

  // ---------- Contact block ----------
  const contactY = Math.max(y + 4, H - 78);
  doc.setFillColor(...PAPER);
  doc.rect(M, contactY, W - 2 * M, 48, "F");
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.4);
  doc.line(M, contactY, M + 30, contactY);

  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text("SPEAK TO A DIRECTOR", M + 5, contactY + 7);

  const dirColW = (W - 2 * M - 10) / 2;
  COMPANY.directors.forEach((d, i) => {
    const x = M + 5 + i * dirColW;
    let dy = contactY + 14;
    doc.setTextColor(...INK);
    doc.setFont("times", "normal");
    doc.setFontSize(13);
    doc.text(d.name, x, dy);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(7);
    doc.setTextColor(...MUTED);
    doc.text(d.credentials, x + doc.getTextWidth(d.name) + 2, dy - 0.5);
    dy += 6;
    doc.setTextColor(...INK);
    doc.setFontSize(9);
    doc.text(d.phone, x, dy);
    dy += 5;
    doc.setTextColor(80, 80, 80);
    doc.text(d.email, x, dy);
  });

  // Address line
  doc.setTextColor(...MUTED);
  doc.setFontSize(7.5);
  doc.text(COMPANY.address, M + 5, contactY + 44);

  // ---------- Footer ----------
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.2);
  doc.line(M, H - 18, W - M, H - 18);
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(6.5);
  const dlines = doc.splitTextToSize(COMPANY.disclaimer, W - 2 * M);
  doc.text(dlines, M, H - 13);

  doc.save(opts.filename);
}

function drawTable(doc: jsPDF, heading: string, rows: PdfRow[], x: number, y: number, width: number) {
  doc.setTextColor(...MUTED);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.text(heading.toUpperCase(), x, y);
  doc.setDrawColor(...GOLD);
  doc.setLineWidth(0.3);
  doc.line(x, y + 2, x + 16, y + 2);

  let cy = y + 8;
  doc.setFontSize(9.5);
  rows.forEach((r) => {
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");
    doc.text(r.label, x, cy);
    doc.setTextColor(...INK);
    doc.setFont("helvetica", "bold");
    doc.text(r.value, x + width, cy, { align: "right" });
    doc.setDrawColor(220, 215, 200);
    doc.setLineWidth(0.1);
    doc.line(x, cy + 1.5, x + width, cy + 1.5);
    cy += 7;
  });
  return cy - y;
}
