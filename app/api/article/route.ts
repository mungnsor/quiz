import prisma from "@/lib/prisma";
export const GET = async (request: Request) => {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(JSON.stringify({ message: "userId is required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const user = await prisma.user.findFirst({ where: { clerkId: userId } });

    const articles = await prisma.article.findMany({
      where: { userId: user?.id },
      orderBy: { createdAt: "desc" },
    });

    return new Response(JSON.stringify({ articles }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch articles" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
// export const GET = async (request: Request) => {
//   try {
//     const { searchParams } = new URL(request.url);
//     const articleId = searchParams.get("articleId");
//     const userId = searchParams.get("userId");
//     if (!articleId) {
//       return new Response(
//         JSON.stringify({ message: "articleId is required" }),
//         { status: 400, headers: { "Content-Type": "application/json" } }
//       );
//     }
//     if (!userId) {
//       return new Response(JSON.stringify({ message: "userId is required" }), {
//         status: 400,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//     const article = await prisma.article.findUnique({
//       where: { id: articleId, userId },
//       include: { quizzes: true },
//     });
//     console.log(article, "article");
//     if (!article) {
//       return new Response(JSON.stringify({ message: "Article not found" }), {
//         status: 404,
//         headers: { "Content-Type": "application/json" },
//       });
//     }
//     return new Response(JSON.stringify({ article }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ message: "Failed to fetch article" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// };
