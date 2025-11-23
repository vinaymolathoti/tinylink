import prisma from "@/lib/prisma";
const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const { longUrl, customCode } = await req.json();

    if (!longUrl) {
      return new Response(JSON.stringify({ error: "URL is required" }), { status: 400 });
    }

    const code = customCode || Math.random().toString(36).substring(2, 8);

    const existing = await prisma.link.findUnique({ where: { code } });
    if (existing) {
      return new Response(
        JSON.stringify({ error: "Code already exists" }),
        { status: 409 }
      );
    }


    const link = await prisma.link.create({
      data: {
        code,
        longUrl,
      },
    });

    return new Response(
      JSON.stringify({ message: "Created successfully", link }),
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}

export async function GET() {
  const links = await prisma.link.findMany({
    select: {
      id: true,
      code: true,   // 👈 Add this
      longUrl: true,
      clicks: true,
      lastClicked: true,
    },
  });

  return new Response(JSON.stringify(links), { status: 200 });
}


export async function DELETE(request, { params }) {
  const { code } = params;

  const deleted = await prisma.link.delete({
    where: { code },
  });

  return new Response(JSON.stringify({ success: true }), { status: 200 });
}