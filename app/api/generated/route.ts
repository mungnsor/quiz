import prisma from "@/lib/prisma";
// export const POST = async (request: Request) => {
//   try {
//     const body = await request.json();
//     const get = await prisma.article.findMany();
//     const quiz = await prisma.quiz.create({
//       data: {
//         question: body.question,
//         options: body.options,
//         answer: body.answer,
//         articleId: body.articleId,
//       },
//     });
//     return new Response(JSON.stringify({ get, quiz }), {
//       status: 201,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(JSON.stringify({ message: "Failed to create quiz" }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// };
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { question, options, answer, articleId } = body;
    if (!question || !answer || !articleId || !Array.isArray(options)) {
      return new Response(JSON.stringify({ message: "Invalid request body" }), {
        status: 400,
      });
    }
    const quiz = await prisma.quiz.create({
      data: {
        question,
        options,
        answer,
        articleId,
      },
    });
    return new Response(JSON.stringify(quiz), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("CREATE QUIZ ERROR:", error);

    return new Response(
      JSON.stringify({
        message: "Failed to create quiz",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
