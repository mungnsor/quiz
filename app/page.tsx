"use client";

import { Header } from "./component/header";
import { SideBar } from "./component/sidebar";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";

export default function Home() {
  const { user } = useUser();
  useEffect(() => {
    if (user) {
      fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          clerkId: user.id,
          email: user.primaryEmailAddress?.emailAddress,
          name: user.fullName,
        }),
      });
    }
  }, [user]);
  return (
    <div className="w-full">
      <Header />
      <SideBar />
      {/* <QuizTest />
      <CheckScore /> */}
    </div>
  );
}
