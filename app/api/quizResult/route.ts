import prisma from "@/lib/prisma";

export const POST = async (req: Request) => {
  try {
    const { userId, quizId, totalScore } = await req.json();

    if (!userId || !quizId) {
      return new Response(
        JSON.stringify({ message: "Missing userId or quizId" }),
        { status: 400 }
      );
    }
    const existingAttempt = await prisma.quizAttempt.findFirst({
      where: {
        userId,
        quizId,
      },
    });
    if (existingAttempt) {
      return new Response(
        JSON.stringify({ message: "Quiz already attempted" }),
        { status: 409 }
      );
    }
    const result = await prisma.$transaction([
      prisma.quizAttempt.create({
        data: {
          userId,
          quizId,
        },
      }),
      prisma.userScores.create({
        data: {
          userId,
          quizId,
          totalScore,
        },
      }),
    ]);
    return new Response(
      JSON.stringify({
        message: "Quiz result saved",
        attempt: result[0],
        score: result[1],
      }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("QUIZ RESULT ERROR:", error);

    return new Response(
      JSON.stringify({
        message: "Failed to save quiz result",
        error: error.message,
      }),
      { status: 500 }
    );
  }
};
