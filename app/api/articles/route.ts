import prisma from "@/lib/prisma";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEYS,
});
export const POST = async (request: Request) => {
  const body = await request.json();
  const { title, content, userId } = body;
  const user = await prisma.user.findFirst({
    where: {
      clerkId: userId,
    },
  });
  const res = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `this article is article please summarize to me this: ${body.content}`,
  });
  const { candidates } = res as any;
  const summary = candidates[0].content.parts[0].text;

  try {
    if (!userId) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }
    const article = await prisma.article.create({
      data: {
        title: title,
        content: content,
        userId: user?.id || "",
        summary: summary,
      },
    });
    return NextResponse.json({ result: article }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: "aldaa" }, { status: 201 });
  }
};
export const GET = async (request: Request) => {
  try {
    const articles = await prisma.article.findMany();
    return new Response(JSON.stringify({ articles }), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("failed to fetch all articles", { status: 500 });
  }
};
