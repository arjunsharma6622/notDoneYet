import { auth } from "@/auth";
import React from "react";
import Profile from "./Profile";

const page = async () => {
  const session = await auth();
  return (
    <div>
      <Profile session={session} />
    </div>
  );
};

export default page;
