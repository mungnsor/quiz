import prisma from "@/lib/prisma";
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
