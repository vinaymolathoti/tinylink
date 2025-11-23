import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(request, context) {
  const params = await context.params; 
  const { code } = params;

  const link = await prisma.link.findUnique({
    where: { code },
  });

  if (!link) {
    return new Response("Link not found", { status: 404 });
  }

  await prisma.link.update({
    where: { code },
    data: {
      clicks: link.clicks + 1,
      lastClicked: new Date(),
    },
  });

  return Response.redirect(link.longUrl, 302);
}

