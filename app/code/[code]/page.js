export const dynamic = "force-dynamic";

async function getStats(code) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/links/${code}`, {
    cache: "no-store"
  });

  if (!res.ok) return null;
  return res.json();
}

export default async function StatsPage({ params }) {
  const { code } = params;

  const link = await getStats(code);

  if (!link) {
    return <h1>Link not found</h1>;
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Stats for: {code}</h1>
      <p><strong>Original URL:</strong> {link.longUrl}</p>
      <p><strong>Total Clicks:</strong> {link.clicks}</p>
      <p><strong>Last Clicked:</strong> {link.lastClicked || "Never clicked"}</p>

      <a href="/" style={{ marginTop: "1rem", display: "inline-block" }}>
        ← Back to Dashboard
      </a>
    </main>
  );
}