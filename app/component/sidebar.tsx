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
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
export const SideBar = () => {
  const { user } = useUser();
  const userId = user?.id;
  const [collap, setCollap] = useState(false);
  const [loading, setLoading] = useState(false);
  const [generate, setGenerate] = useState("");
  const [content, setContent] = useState("");
  const [input, setInput] = useState("");
  const [title, setTitle] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
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
        const errorText = await response.text();
        throw new Error(errorText || "Request failed");
      }
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
        return;
      }
      console.log("Generated result:", data);
    } catch (err) {
      console.error("Generate failed:", err);
    } finally {
      setLoading(false);
    }
  };
  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");

    const newMessages = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.text || "No response",
        },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `Error: ${err.message}`,
        },
      ]);
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
                    <p className="text-[20px] font-semibold">History</p>
                  )}
                  <button
                    className="p-2 rounded "
                    onClick={() => setCollap(!collap)}
                  >
                    <SideBarIcon />
                  </button>
                </div>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
      </SidebarProvider>
      <div className="flex-1 bg-white flex justify-center items-start py-14 px-6 w-[1980px]">
        <Card className={`h-[442px] ${collap ? "w-[856px]" : "w-[628px]"}`}>
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
                <Input
                  placeholder="Paste your article content here..."
                  className="h-30"
                  required
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button className="w-40 h-10" onClick={handleSend}>
              Generate first
            </Button>
            <Button className="w-40 h-10" onClick={handleGenerate}>
              {loading ? "Loading" : "Generate summary second"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
