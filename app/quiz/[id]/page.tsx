"use client";
import { useEffect, useState } from "react";
import { Header } from "@/app/component/header";
import { SideBar } from "@/app/component/sidebar";
import { useParams } from "next/navigation";
import { LeftIcon } from "@/app/icons/leftIcon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StarIcon } from "@/app/icons/starIcon";
import { BookIcon } from "@/app/icons/bookIcon";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Link from "next/link";
type Quiz = {
  id: String;
  question: string;
  options: string;
  answer: string;
};
type Article = {
  id: string;
  title: string;
  content: string;
  summary: string;
  userId: string;
};
export default function Home() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [page, setPage] = useState(1);
  const [summary, setSummary] = useState<Article | null>(null);
  // const handleTakeQuiz = async () => {
  //   setLoading(true);

  //   try {
  //     const response = await fetch("/api/generated", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         content: summary?.content,
  //         articleId: id,
  //       }),
  //     });
  //     if (!response.ok) {
  //       throw new Error("Request failed");
  //     }
  //     const data = await response.json();
  //     setQuiz(data);
  //     console.log(data, "quiz created");
  //   } catch (err) {
  //     console.error("Generate failed:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  //   return setPage(2);
  // };

  const fetchHistory = async () => {
    try {
      const res = await fetch(`/api/article?userId=${id}`);
      if (!res.ok) throw new Error("Failed to fetch history");

      const data = await res.json();
      console.log(data, "hahah");

      const filteredData = data.articles.filter((item: any) => item.id == id);
      setSummary(filteredData[0]);
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };
  useEffect(() => {
    if (!id) return;
    fetchHistory();
  }, [id]);
  return (
    <div className="w-full  ">
      <Header />
      <div className="flex ">
        <SideBar />
        {page === 1 && (
          <div className="flex-1 bg-white flex  items-start py-14 px-6  ">
            <div className="flex flex-col gap-3">
              <Link href={"/"}>
                <button className="h-10 w-12 bg-white border border-gray-200 flex justify-center items-center rounded-lg cursor-pointer">
                  <LeftIcon />
                </button>
              </Link>
              <Card className="w-[856px] min-h-[366px]">
                <CardHeader>
                  <CardTitle className="flex gap-3 items-center font-semibold text-[24px] ">
                    <StarIcon />
                    Article Quiz Generator
                  </CardTitle>
                  <CardDescription className="flex gap-3 items-center font-semibold text-[14px] ">
                    <BookIcon /> Summarized content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form className="flex flex-col gap-3 font-semibold text-[24px] ">
                    {summary?.title}
                    <div className="font-normal text-[14px] min-h-30 ">
                      {summary?.summary}
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Dialog>
                    <form>
                      <DialogTrigger asChild>
                        <Button className="w-[113px] h-10 border border-gray-200 bg-white rounded-lg flex justify-center items-center text-[14px] text-black hover:bg-white  ">
                          See content
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="w-[728px] min-h-48 ">
                        <DialogHeader>
                          <DialogTitle>{summary?.title}</DialogTitle>
                          <DialogDescription>
                            {summary?.content}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </form>
                  </Dialog>
                  <Button className="w-[113px] h-10 border border-gray-200 bg-black rounded-lg flex justify-center items-center text-white text-[14px] cursor-pointer ">
                    {loading ? "Loading" : "Take a quiz"}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
        {page === 2 && (
          <div className="flex-1 bg-white flex  items-start py-14 px-6  ">
            <div className="w-[558px] h-72 flex flex-col gap-4 ">
              <div className="flex justify-between ">
                <p className="flex items-center gap-3 text-[24px] font-semibold">
                  <StarIcon /> Quick test
                </p>
                <button className="h-10 w-12 flex justify-center items-center rounded-lg border border-gray-200">
                  x
                </button>
              </div>
              <p className="text-[#71717a] font-medium text-base">
                Take a quick test about your knowledge from your content{" "}
              </p>
              <div className="w-[558px] h-[200px] rounded-lg border border-gray-200 flex items-center">
                <div className="flex flex-col gap-4 p-5">
                  <div className="flex justify-between ">
                    <p className="font-medium text-lg"></p>
                    <p className="text-lg">
                      1 <span className=" text-gray-500">/ 5</span>
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-4">
                    <button className="w-[243px] h-10 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer ">
                      Yesugao
                    </button>
                    <button className="w-[243px] h-10 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer ">
                      Yesugao
                    </button>
                    <button className="w-[243px] h-10 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer">
                      Yesugao
                    </button>
                    <button className="w-[243px] h-10 rounded-lg border border-gray-200 flex items-center justify-center cursor-pointer">
                      Yesugao
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
