// import prisma from "@/lib/prisma";
// export const GET = async () => {
//   try {
//     const articles = await prisma.article.findMany();

//     return new Response(JSON.stringify({ articles }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (error) {
//     console.error(error);
//     return new Response(
//       JSON.stringify({ message: "Failed to fetch all articles" }),
//       { status: 500, headers: { "Content-Type": "application/json" } }
//     );
//   }
// };
import prisma from "@/lib/prisma";

export const GET = async (req: Request) => {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");
    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
      });
    }
    const articles = await prisma.article.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
      },
    });
    return new Response(JSON.stringify(articles), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to fetch articles" }),
      { status: 500 }
    );
  }
};
