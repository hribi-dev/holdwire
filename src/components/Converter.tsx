"use client";

import { useId, useState } from "react";

const nf = new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 2 });

export function Converter({ symbol, priceEur }: { symbol: string; priceEur: number | null }) {
  const [amount, setAmount] = useState("1");
  const id = useId();
  const value = Number(amount.replace(",", "."));
  const result = priceEur != null && Number.isFinite(value) ? nf.format(value * priceEur) : "—";
  const sym = symbol.toUpperCase();

  return (
    <form className="card stack" style={{ gap: 12 }} onSubmit={(e) => e.preventDefault()} aria-labelledby={`${id}-h`}>
      <h2 id={`${id}-h`} style={{ margin: 0, fontSize: 20 }}>
        {sym} to EUR converter
      </h2>
      <label htmlFor={`${id}-amt`}>Amount in {sym}</label>
      <input
        id={`${id}-amt`}
        className="mono"
        inputMode="decimal"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        autoComplete="off"
      />
      <div aria-live="polite" className="mono" style={{ background: "var(--surface)", borderRadius: 10, padding: 14, fontSize: 22, fontWeight: 600 }}>
        ≈ {result}
      </div>
    </form>
  );
}
