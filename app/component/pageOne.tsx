"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarIcon } from "../icons/starIcon";
import { NoteIcon } from "../icons/noteIcon";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
type Article = {
  id: string;
  title: string;
  content: string;
  summary: string;
  userId: string;
};
type QuizQuestion = {
  id: string;
  question: string;
  options: string[];
  answer: string;
};
export const PageOne = () => {
  const { user } = useUser();
  const userId = user?.id;
  const [content, setContent] = useState("");
  const [collap, setCollap] = useState(false);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState<Article | null>(null);
  const [quiz, setQuiz] = useState<QuizQuestion | null>(null);
  const router = useRouter();
  const handleQuiz = (id: string) => {
    router.push(`/quiz/${id}`);
  };
  // const handleGenerate = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await fetch("/api/articles", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         title: title,
  //         content: content,
  //         userId: userId,
  //       }),
  //     });
  //     if (!response.ok) {
  //     }
  //     const data = await response.json();
  //     setSummary(data.result);
  //     const id = data.result.id;
  //     handleQuiz(id);
  //   } catch (err) {
  //     console.error("Generate failed:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  //   return setPage(2);
  // };
  const handleGenQuiz = async () => {
    setLoading(true);
    try {
      const articleRes = await fetch("/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          userId,
        }),
      });
      if (!articleRes.ok) {
        throw new Error("Article generation failed");
      }
      const articleData = await articleRes.json();
      setSummary(articleData.result);
      const articleId = articleData.result.id;
      const quizRes = await fetch(`/api/generated/articleId`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: articleData.result.content,
          articleId,
        }),
      });
      if (!quizRes.ok) {
        throw new Error("Quiz generation failed");
      }
      const quizData = await quizRes.json();
      setQuiz(quizData);
      console.log("Quiz created:", quizData);
      const id = articleData.result.id;
      handleQuiz(id);
    } catch (err) {
      console.error("Quiz flow failed:", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex-1 bg-gray-100 flex  items-start py-14 px-6 w-[1980px] justify-center">
      <Card className={`min-h-[442px] ${collap ? "w-[856px]" : "w-[628px]"}`}>
        <CardHeader>
          <CardTitle className="flex gap-3 items-center">
            <StarIcon />
            Article Quiz Generator
          </CardTitle>
          <CardDescription>
            Paste your article below to generate a summarize and quiz question.
            Your articles will saved in the sidebar for future reference.
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
          <Button className="w-40 h-10 cursor-pointer" onClick={handleGenQuiz}>
            {loading ? "Generating" : "Generate summary "}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
