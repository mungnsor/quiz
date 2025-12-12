import prisma from "@/lib/prisma";
export const POST = async (request: Request) => {
  const article = await prisma.article.create({ data: await request.json() });
  return new Response(JSON.stringify({ article }), { status: 201 });
};
export const GET = async (request: Request) => {
  try {
    const articles = await prisma.article.findMany();
    return new Response(JSON.stringify({ articles }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch all articles", { status: 500 });
  }
};
