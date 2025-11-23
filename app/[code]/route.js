import prisma from "@/lib/prisma";

const prisma = new PrismaClient();
export const dynamic = "force-dynamic"; // 👈 VERY IMPORTANT


export async function GET(request, { params }) {
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return new Response("Link not found", { status: 404 });
  }

  await prisma.link.update({
    where: { code },
    data: { clicks: link.clicks + 1, lastClicked: new Date() },
  });

  return Response.redirect(link.longUrl, 302);
}


export async function DELETE(request, { params }) {
  console.log("DELETE API CALLED:", params.code);

  const { code } = params;

  try {
    const deleted = await prisma.link.delete({
      where: { code },
    });

    console.log("DELETE OK:", deleted.code);
    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    return new Response(JSON.stringify({ error: err.message }), { status: 500 });
  }
}
