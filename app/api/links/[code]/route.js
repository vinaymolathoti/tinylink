import prisma from "@/lib/prisma";



export const dynamic = "force-dynamic"; // ensure server execution on Vercel

export async function DELETE(request, { params }) {
  try {
    const { code } = params;

    const deleted = await prisma.link.delete({
      where: { code }
    });

    return new Response(
      JSON.stringify({ success: true, deleted }),
      { status: 200 }
    );
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
}

