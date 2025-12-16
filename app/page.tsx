import prisma from "@/lib/prisma";
import { CheckScore } from "./component/checkScore";
import { Header } from "./component/header";
import { QuizTest } from "./component/quiz";
import { SideBar } from "./component/sidebar";
import { log } from "console";

export default async function Home() {
  const users = await prisma.user.findMany();
  const article = await prisma.article.findMany();
  console.log(users, "aa");
  console.log(article, "art");

  return (
    <div className="w-full">
      <Header />
      <SideBar />
      {/* <QuizTest />
      <CheckScore /> */}
    </div>
  );
}
