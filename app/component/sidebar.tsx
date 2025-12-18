"use client";
import { SideBarIcon } from "../icons/sideIcon";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StarIcon } from "../icons/starIcon";
import { NoteIcon } from "../icons/noteIcon";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Textarea } from "@/components/ui/textarea";
import { LeftIcon } from "../icons/leftIcon";
import { Summary } from "./summary";
export const SideBar = () => {
  const { user } = useUser();
  const userId = user?.id;
  const [collap, setCollap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  useEffect(() => {
    if (!userId) return;

    const fetchHistory = async () => {
      try {
        const res = await fetch(`/api/articles?userId=${userId}`);
        if (!res.ok) throw new Error("Failed to fetch history");

        const data = await res.json();
        setHistory(data);
      } catch (err) {
        console.error("History fetch error:", err);
      }
    };

    fetchHistory();
  }, [userId]);
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

  //     // if (!response.ok) {
  //     //   const errorText = await response.text();
  //     // }
  //     // const data = await response.json();
  //     // if (data.error) {
  //     //   console.error(data.error);
  //     //   return;
  //     // }
  //     // console.log("Generated result:", data);
  //   } catch (err) {
  //     console.error("Generate failed:", err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };
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
      setSummary(data.summary);
    } catch (err) {
      console.error("Generate failed:", err);
    } finally {
      setLoading(false);
    }
    return setPage(2);
  };
  const handleHistory = async () => {
    if (!userId) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/articles?userId=${userId}`);

      if (!response.ok) {
        throw new Error("Failed to fetch history");
      }
      const data = await response.json();
      setHistory(Array.isArray(data) ? data : data.articles ?? []);
    } catch (err) {
      console.error("history error:", err);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };
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
                    <p className="text-[20px] font-semibold"> History</p>
                  )}
                  <button
                    className="p-2 rounded "
                    onClick={() => setCollap(!collap)}
                  >
                    <SideBarIcon />
                  </button>
                </div>
              </SidebarMenuItem>
              {/* {!collap &&
                history.map((item) => (
                  <SidebarMenuItem key={item.id}>
                    <button
                      className="w-full text-left px-2 py-2 rounded hover:bg-gray-100 text-sm"
                      onClick={() => {
                        console.log("Selected:", item.id);
                      }}
                    >
                      {item.title}
                    </button>
                  </SidebarMenuItem>
                ))} */}
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
              <Button className="w-40 h-10" onClick={handleGenerate}>
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
              className="h-10 w-12 bg-white border border-gray-200 flex justify-center items-center rounded-lg"
              onClick={() => setPage(1)}
            >
              <LeftIcon />
            </button>
            <Summary />
          </div>
        </div>
      )}
    </div>
  );
};
