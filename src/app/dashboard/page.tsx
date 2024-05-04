import { auth } from "@/auth";
import React from "react";
import Home from "./Home";

const page = async () => {
  const session = await auth();
  const user = session?.user;
  return (
    <div>
      <Home session={session} />
    </div>
  );
};

export default page;
