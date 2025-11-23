import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

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
