"use client";
import {
  Sidebar,
  SidebarHeader,
  SidebarMenuItem,
  SidebarMenu,
  SidebarProvider,
} from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { SideBarIcon } from "../icons/sideIcon";
import Link from "next/link";
type History = {
  userId: string;
  title: string;
  id: string;
};
export const SideBar = () => {
  const { user } = useUser();
  const userId = user?.id;
  const [collap, setCollap] = useState(false);
  const [history, setHistory] = useState<History[]>([]);
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
  return (
    <div className="flex min-h-screen">
      <SidebarProvider>
        <Sidebar
          className={`border-r bg-white relative transition-all duration-300 ${
            collap
              ? "w-[72px] bg-transparent border-none "
              : "w-[300px] bg-gray-200 border-r"
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
                      <Link href={`/quiz/${cur.id}`} key={index}>
                        <span className="text-base font-medium cursor-pointer">
                          {cur.title}
                        </span>
                      </Link>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};
