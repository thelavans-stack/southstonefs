const Footer = () => (
  <footer className="bg-noir border-t border-gold/15">
    <div className="container-edge py-16">
      <div className="grid md:grid-cols-3 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-gold flex items-center justify-center text-noir font-serif text-xl">S</div>
            <div>
              <div className="font-serif text-lg">Southstone</div>
              <div className="eyebrow text-[0.6rem]">Financial Services</div>
            </div>
          </div>
          <p className="text-sm text-foreground/60 italic font-serif">
            "Built On Trust. Leaving No Stone Unturned."
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Registered Address</div>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Lime Tree Workshop<br />11 Lime Tree Walk<br />Sevenoaks, England<br />TN13 1YH
          </p>
        </div>
        <div>
          <div className="eyebrow mb-4">Regulatory</div>
          <p className="text-sm text-foreground/65 leading-relaxed">
            Southstone Financial Services (17159075) is a trading name of Momentum Financial Services Ltd.<br /><br />
            Momentum Financial Services Ltd (FCA 1011740) is authorised and regulated by the Financial Conduct Authority.
          </p>
        </div>
      </div>

      <div className="hairline pt-10 space-y-4 text-xs text-foreground/55 leading-relaxed max-w-5xl">
        <p className="text-foreground/85 font-medium uppercase tracking-wider text-[0.7rem]">
          Your home or property may be repossessed if you do not keep up repayments on your mortgage.
        </p>
        <p>
          Southstone Financial Services Ltd is registered in England &amp; Wales, company number 17159075.
        </p>
        <p>
          We will charge a fee up to a maximum of 1% of the loan. The amount we will charge is dependent on the amount of research and administration that is required. Please refer to our Terms of Business for further information.
        </p>
        <p>
          The guidance and/or advice contained within this website is subject to the UK regulatory regime and is therefore primarily targeted at consumers based in the UK.
        </p>
        <p>
          We are a credit broker, not a lender. We will receive commission from lenders. Different lenders pay different amounts depending on different commission models. For transparency we work with the following commission models: percentage of the amount you borrow. Further details of the commission model, calculation and amount will be disclosed to you throughout your customer journey.
        </p>
        <p>Most Buy-to-Let Mortgages are not regulated by the Financial Conduct Authority.</p>
      </div>

      <div className="hairline mt-10 pt-6 flex flex-wrap justify-between gap-4 text-xs text-foreground/45">
        <div>© {new Date().getFullYear()} Southstone Financial Services. All rights reserved.</div>
        <div>FCA Reg. 1011740 · Co. No. 17159075</div>
      </div>
    </div>
  </footer>
);

export default Footer;
