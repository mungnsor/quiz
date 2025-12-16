import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";

const client = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEYS!,
});
export const POST = async (request: Request) => {
  try {
    const body = await request.json();
    const { title, content, userId } = body;
    const response = await client.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: content }] }],
    });

    const summary =
      (response as any).candidates?.[0]?.content?.parts?.[0]?.text ?? "";
    const article = await prisma.article.create({
      data: {
        title,
        content,
        userId,
        summary,
      },
    });
    return new Response(JSON.stringify({ article }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Failed to create article" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
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
