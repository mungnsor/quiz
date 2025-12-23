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
type History = {
  userId: string;
  title: string;
};
export const PageOne = () => {
  const { user } = useUser();
  const userId = user?.id;

  const [content, setContent] = useState("");
  const [collap, setCollap] = useState(false);
  const [history, setHistory] = useState<History[]>([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [summary, setSummary] = useState<Article | null>(null);
  const router = useRouter();

  const handleQuiz = (id: string) => {
    router.push(`/quiz/${id}`);
  };

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
      const id = data.result.id;
      handleQuiz(id);
    } catch (err) {
      console.error("Generate failed:", err);
    } finally {
      setLoading(false);
    }
    return setPage(2);
  };
  return (
    <div className="flex-1 bg-white flex  items-start py-14 px-6 w-[1980px]">
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
          <Button className="w-40 h-10 cursor-pointer" onClick={handleGenerate}>
            {loading ? "Loading" : "Generate summary"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};
