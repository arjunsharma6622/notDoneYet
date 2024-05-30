import { auth } from "@/auth";
import React from "react";
import Profile from "./Profile";
import { redirect } from "next/navigation";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  return (
    <div>
      <Profile session={session} />
    </div>
  );
};

export default page;
