import { auth } from "@/auth";
import Message from "./MessagePage";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await auth();
  if(!session){
    redirect("/login")
  }
  return (
    <div>
      <Message session={session} />
    </div>
  );
};

export default Page;
