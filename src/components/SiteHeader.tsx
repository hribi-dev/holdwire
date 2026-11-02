import Link from "next/link";
import { nav, site } from "@/lib/site";
import { LogoMark } from "./Logo";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="wrap bar">
        <Link href="/" className="logo" aria-label={`${site.name} home`}>
          <LogoMark />
          <span>{site.name}</span>
        </Link>
        <nav aria-label="Main" className="main-nav">
          {nav.map((item) => (
            <Link key={item.label} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <Link href="/#newsletter" className="btn btn-primary">
            Subscribe
          </Link>
        </div>
      </div>
      <div className="wrap chips">
        <span className="muted" style={{ padding: "6px 0", marginRight: 4 }}>
          Trending:
        </span>
        <Link className="chip" href="/coins/bitcoin">Bitcoin</Link>
        <Link className="chip" href="/coins/solana">Solana</Link>
        <Link className="chip" href="/coins/ethereum">Ethereum</Link>
        <Link className="chip" href="/coins">All coins</Link>
      </div>
    </header>
  );
}
