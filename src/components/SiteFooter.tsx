import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap cols">
        <div style={{ flex: "2 1 280px", display: "flex", flexDirection: "column", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: 22, color: "#fff" }}>{site.name}</span>
          <span>{site.tagline}</span>
        </div>
        <nav aria-label="Data and tools">
          <strong>Data &amp; tools</strong>
          <Link href="/coins">Coin prices</Link>
          <Link href="/coins/bitcoin">Bitcoin price</Link>
          <Link href="/coins/ethereum">Ethereum price</Link>
          <Link href="/coins/solana">Solana price</Link>
        </nav>
        <nav aria-label="Company">
          <strong>Company</strong>
          <Link href="/about">About</Link>
          <Link href="/editorial-policy">Editorial policy</Link>
          <Link href="/how-we-make-money">How we make money</Link>
          <Link href="/advertising-policy">Advertising policy</Link>
          <Link href="/corrections">Corrections</Link>
          <Link href="/disclosures">Disclosures</Link>
        </nav>
      </div>
      <div className="wrap legal">
        Nothing on {site.name} is investment advice. <Link href="/disclaimer">Read the disclaimer</Link>. Sponsored content
        is always labelled. © {site.copyrightYear} {site.name}
      </div>
    </footer>
  );
}
