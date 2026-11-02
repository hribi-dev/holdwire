import Link from "@/components/Link";

export default function NotFound() {
  return (
    <main className="wrap page" style={{ gap: 12 }}>
      <h1 style={{ margin: 0, fontSize: 36 }}>Page not found</h1>
      <p className="muted" style={{ margin: 0 }}>
        That page doesn&apos;t exist. Try <Link href="/coins" style={{ color: "var(--accent)" }}>coin prices</Link> or the{" "}
        <Link href="/" style={{ color: "var(--accent)" }}>homepage</Link>.
      </p>
    </main>
  );
}
