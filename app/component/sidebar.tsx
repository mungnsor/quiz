"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarIcon } from "../icons/starIcon";
import { NoteIcon } from "../icons/noteIcon";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import { LeftIcon } from "../icons/leftIcon";
import { BookIcon } from "../icons/bookIcon";
import { SideBarIcon } from "../icons/sideIcon";
import { log } from "console";
type Article = {
  id: string;
  title: string;
  content: string;
  summary: string;
  userId: string;
};
type History = {
  userId: string;
  title: string;
};
type Quiz = {
  id: String;
  question: string;
  options: string;
  answer: string;
};
export const SideBar = () => {
  const { user } = useUser();
  const userId = user?.id;
  // const { article } = useUser();
  // const articleId = article?.id;
  const [collap, setCollap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState("");
  const [answer, setAnswer] = useState("");
  const [summary, setSummary] = useState<Article | null>(null);
  const [quiz, setQuiz] = useState<Quiz | null>(null);

  const [history, setHistory] = useState<History[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!userId) return;
    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/article?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();
        console.log(data, "darar");

        setHistory(data.articles);
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };
    fetchHistory();
  }, [userId]);
  // useEffect(() => {
  //   if (!articleId) return;
  //   const fetchHistory = async () => {
  //     try {
  //       const res = await fetch(`/api/article?articleId=${articleId}`);
  //       if (!res.ok) throw new Error("Failed to fetch history");
  //       const data = await res.json();
  //       console.log(data, "darar");

  //       setHistory(data.articles);
  //     } catch (err) {
  //       console.error("History fetch error:", err);
  //     }
  //   };
  //   fetchHistory();
  // }, [articleId]);
  const handleGenerate = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          userId: userId,
        }),
      });
      if (!response.ok) {
      }
      const data = await response.json();
      setSummary(data.result);
    } catch (err) {
      console.error("Generate failed:", err);
    } finally {
      setLoading(false);
    }
    return setPage(2);
  };
  const handleTakeQuiz = async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/generated", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: "what was pasta's ingredients?",
          options: ["goimon", "tomato", "garlic", "potato"],
          answer: "goimon",
          articleId: "cmjgsild20003kh5iymdtckha",
        }),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();
      setQuiz(data);
      console.log(data, "datat");

      console.log(data, "quiz created");
    } catch (err) {
      console.error("Generate failed:", err);
    } finally {
      setLoading(false);
    }

    setPage(3);
  };

  // const handleHistorySummary = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/article", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: title,
  //         content: content,
  //         userId: userId,
  //         summary: summary,
  //       }),
  //     });
  //     if (!response.ok) {
  //     }
  //     const data = await response.json();
  //     console.log(data, "summm");

  //     setSummary(data.result);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };
  return (
    <div className="flex w-full min-h-screen">
      <SidebarProvider className="w-1">
        <Sidebar
          className={`border-r bg-white relative transition-all duration-300 ${
            collap
              ? "w-[72px] bg-transparent border-none "
              : "w-[300px] bg-white border-r"
          }`}
        >
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <div className="flex justify-between">
                  {!collap && (
                    <div className="flex flex-col gap-3">
                      <p className="text-[20px] font-semibold flex flex-col ml-4 gap-2">
                        {" "}
                        History
                      </p>
                    </div>
                  )}
                  <button
                    className="p-2 rounded cursor-pointer"
                    onClick={() => setCollap(!collap)}
                  >
                    <SideBarIcon />
                  </button>
                </div>
                {!collap && (
                  <div className="flex flex-col gap-2 ml-4">
                    {history.map((cur, index) => (
                      <span
                        className="text-base font-medium cursor-pointer"
                        key={index}
                      >
                        {cur.title}
                      </span>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
      </SidebarProvider>
      {page === 1 && (
        <div className="flex-1 bg-white flex justify-center items-start py-14 px-6 w-[1980px]">
          <Card
            className={`min-h-[442px] ${collap ? "w-[856px]" : "w-[628px]"}`}
          >
            <CardHeader>
              <CardTitle className="flex gap-3 items-center">
                <StarIcon />
                Article Quiz Generator
              </CardTitle>
              <CardDescription>
                Paste your article below to generate a summarize and quiz
                question. Your articles will saved in the sidebar for future
                reference.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label>
                    <NoteIcon /> Article Title
                  </Label>
                  <Input
                    placeholder="Enter a title for your article..."
                    required
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>
                    <NoteIcon /> Article Content
                  </Label>
                  <Textarea
                    placeholder="Paste your article content here..."
                    className="h-30"
                    required
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                className="w-40 h-10 cursor-pointer"
                onClick={handleGenerate}
              >
                {loading ? "Loading" : "Generate summary"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
      {page === 2 && (
        <div className="flex-1 bg-white flex justify-center items-start py-14 px-6 w-[1980px] ">
          <div className="flex flex-col gap-3">
            <button
              className="h-10 w-12 bg-white border border-gray-200 flex justify-center items-center rounded-lg cursor-pointer"
              onClick={() => setPage(1)}
            >
              <LeftIcon />
            </button>
            <Card className="w-[856px] h-[366px]">
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
                  <div className="font-normal text-[14px] h-30 ">
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
                <Button
                  className="w-[113px] h-10 border border-gray-200 bg-black rounded-lg flex justify-center items-center text-white text-[14px] cursor-pointer "
                  onClick={handleTakeQuiz}
                >
                  Take a quiz
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
      {page === 3 && (
        <div className="flex-1 bg-white flex justify-center items-start py-14 px-6 w-[1980px] ">
          <div className="w-[558px] h-72 flex flex-col gap-4 ">
            <div className="flex justify-between ">
              <p className="flex items-center gap-3 text-[24px] font-semibold">
                <StarIcon /> Quick test
              </p>
              <button
                className="h-10 w-12 flex justify-center items-center rounded-lg border border-gray-200"
                onClick={() => setPage(2)}
              >
                x
              </button>
            </div>
            <p className="text-[#71717a] font-medium text-base">
              Take a quick test about your knowledge from your content{" "}
            </p>
            <div className="w-[558px] h-[200px] rounded-lg border border-gray-200 flex items-center">
              <div className="flex flex-col gap-4 p-5">
                <div className="flex justify-between ">
                  <p className="font-medium text-lg">
                    What was Chingis Khan`s birth name?
                  </p>
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
  );
};
