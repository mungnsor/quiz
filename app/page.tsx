"use client";

import { Header } from "./component/header";
import { SideBar } from "./component/sidebar";
import { useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { PageOne } from "./component/pageOne";

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
    <div className="w-full ">
      <Header />
      <div className="flex">
        <SideBar />
        <PageOne />
      </div>
    </div>
  );
}
