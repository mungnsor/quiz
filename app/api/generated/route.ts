import prisma from "@/lib/prisma";
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const get = await prisma.article.findMany();
    const quiz = await prisma.quiz.create({
      data: body,
    });
    return new Response(JSON.stringify({ get, quiz }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ message: "Failed to create quiz" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
