/*
  Warnings:

  - A unique constraint covering the columns `[userId,quizId]` on the table `UserScores` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "UserScores_userId_quizId_key" ON "UserScores"("userId", "quizId");
