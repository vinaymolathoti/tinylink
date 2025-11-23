import prisma from "@/lib/prisma";

const prisma = new PrismaClient();

export default async function StatsPage(context) {
  const params = await context.params; 
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return <h1>Link not found</h1>;
  }

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Stats for: {code}</h1>
      <p><strong>Original URL:</strong> {link.longUrl}</p>
      <p><strong>Total Clicks:</strong> {link.clicks}</p>
      <p><strong>Last Clicked:</strong> {link.lastClicked ? link.lastClicked.toString() : "Never clicked"}</p>

      <a href="/" style={{ marginTop: "1rem", display: "inline-block" }}>
        ← Back to Dashboard
      </a>
    </main>
  );
}
