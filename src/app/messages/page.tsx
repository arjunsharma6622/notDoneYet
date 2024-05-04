import { auth } from "@/auth";
import Message from "./MessagePage";

const Page = async () => {
  const session = await auth();
  return (
    <div>
      <Message session={session} />
    </div>
  );
};

export default Page;
