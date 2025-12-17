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
import { NextRequest } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const title = searchParams.get("title");

    const articles = await prisma.article.findMany({
      where: title
        ? {
            title: {
              contains: title,
              mode: "insensitive",
            },
          }
        : undefined,
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
