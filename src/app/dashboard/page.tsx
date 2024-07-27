import { auth } from "@/auth";
import React from "react";
import Profile from "./Profile";
import { redirect } from "next/navigation";
import axios from "axios";
import { API_HEAD } from "@/lib/utils";

const page = async () => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const userData = await axios.get(`${API_HEAD}/user/getUser?userId=${session?.user?._id}`).then((res) => res.data).catch((err) => console.error("Error", err));
  return (
    <div>
      <Profile session={session} userData={userData}/>
    </div>
  );
};

export default page;
