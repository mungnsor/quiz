import prisma from "@/lib/prisma";
import { CheckScore } from "./component/checkScore";
import { Header } from "./component/header";
import { QuizTest } from "./component/quiz";
import { SideBar } from "./component/sidebar";

export default async function Home() {
  const users = await prisma.user.findMany();
  console.log(users, "aasda");

  return (
    <div>
      <Header />
      <SideBar />
      {/* <QuizTest />
      <CheckScore /> */}
    </div>
  );
}
