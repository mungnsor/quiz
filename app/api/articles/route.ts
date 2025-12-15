import prisma from "@/lib/prisma";
export const POST = async (request: Request) => {
  try {
    const body = await request.json();

    const article = await prisma.article.create({
      data: body,
    });

    return new Response(JSON.stringify({ article }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to create article" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};

export const GET = async () => {
  try {
    const articles = await prisma.article.findMany();

    return new Response(JSON.stringify({ articles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch all articles" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
