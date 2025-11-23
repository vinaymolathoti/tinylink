import prisma from "@/lib/prisma";



export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const { code } = params;

    const link = await prisma.link.findUnique({
      where: { code },
    });

    if (!link) {
      return new Response("Not Found", { status: 404 });
    }

    await prisma.link.update({
      where: { code },
      data: {
        clicks: link.clicks + 1,
        lastClicked: new Date(),
      },
    });

    return Response.redirect(link.longUrl);
  } catch (error) {
    console.error("Redirect Error:", error);
    return new Response("Server Error", { status: 500 });
  }
}
