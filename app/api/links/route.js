export const dynamic = "force-dynamic";

import prisma from "../../lib/prisma";


export async function POST(req) {
  try {
    const { longUrl, customCode } = await req.json();

    if (!longUrl) {
      return new Response(
        JSON.stringify({ error: "URL is required" }),
        { status: 400 }
      );
    }

    const code = customCode || Math.random().toString(36).slice(2, 8);

    const existing = await prisma.link.findUnique({ where: { code } });
    if (existing) {
      return new Response(
        JSON.stringify({ error: "Code already exists" }),
        { status: 409 }
      );
    }

    const link = await prisma.link.create({
      data: { code, longUrl },
    });

    return new Response(
      JSON.stringify({ message: "Created successfully", link }),
      { status: 201 }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}

export async function GET() {
  const links = await prisma.link.findMany({
    select: {
      id: true,
      code: true,
      longUrl: true,
      clicks: true,
      lastClicked: true,
    },
    orderBy: { createdAt: "desc" }
  });

  return new Response(JSON.stringify(links), { status: 200 });
}
